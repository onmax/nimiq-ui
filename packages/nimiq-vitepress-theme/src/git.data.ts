// Inspired from https://github.com/vuejs/vitepress/discussions/3515

import { spawn } from "cross-spawn";
import fs from "fs";
import path from "path";
import pMap from "p-map";
import { createContentLoader, type ContentData } from 'vitepress'

// For logging
const DEBUG = process.env.DEBUG === 'true';
const log = (...args: any[]) => DEBUG && console.log('[git.data]', ...args);
const time = (label: string) => DEBUG && console.time(`[git.data] ${label}`);
const timeEnd = (label: string) => DEBUG && console.timeEnd(`[git.data] ${label}`);

// Cache file path
const CACHE_DIR = path.resolve('.vitepress/cache');
const CACHE_FILE = path.join(CACHE_DIR, 'git-data-cache.json');

// Concurrency setting - lower this if having performance issues
const CONCURRENCY = 32;

// Define the custom loader using createContentLoader
const loader = createContentLoader("/**/*.md", {
	async transform(rawData) {
		time('transform');
		log(`Processing ${rawData.length} markdown files`);

		// Load cache if available
		const cache = loadCache();
		
		// Get the GitHub repository URL
		const repoUrl = await getGitHubRepositoryUrl();
		log(`Repository URL: ${repoUrl}`);

		const data = await pMap(
			rawData,
			async (item) => {
				const filePath = getFilePathFromUrl(item.url);
				
				// Check if we have cached data that's still valid
				const mtime = fs.existsSync(filePath) ? fs.statSync(filePath).mtimeMs : 0;
				const cachedInfo = cache[filePath];
				
				// Use cached info if file hasn't changed since last run
				if (cachedInfo && cachedInfo.mtime === mtime) {
					return { 
						...item, 
						...cachedInfo,
						editUrl: repoUrl && cachedInfo.relativePath ? `${repoUrl}/blob/main/${cachedInfo.relativePath}` : '',
						commitUrl: repoUrl && cachedInfo.hash ? `${repoUrl}/commit/${cachedInfo.hash}` : ''
					};
				}
				
				// Otherwise fetch fresh git info
				const fileInfo = await getFileGitInfo(item.url);
				const editUrl = repoUrl && fileInfo.relativePath ? `${repoUrl}/blob/main/${fileInfo.relativePath}` : '';
				const commitUrl = repoUrl && fileInfo.hash ? `${repoUrl}/commit/${fileInfo.hash}` : '';
				
				// Store in cache
				cache[filePath] = {
					...fileInfo,
					mtime
				};
				
				return { 
					...item, 
					...fileInfo, 
					editUrl,
					commitUrl
				};
			},
			{ concurrency: CONCURRENCY }
		) as unknown as (ContentData & { 
			lastUpdated: number, 
			hash: string, 
			editUrl: string, 
			commitUrl: string,
			relativePath: string
		})[];
		
			// Save updated cache
		saveCache(cache);
		
		// Sort the data based on the lastUpdated field
		data.sort((a, b) => b.lastUpdated - a.lastUpdated);
		
		timeEnd('transform');
		log(`Processed ${data.length} files, cache hits: ${Object.keys(cache).length}`);
		return data;
	},
});

// Cache functions
type CacheEntry = {
	lastUpdated: number;
	hash: string;
	relativePath: string;
	mtime: number;
};

type CacheData = {
	[filePath: string]: CacheEntry;
};

function loadCache(): CacheData {
	try {
		if (!fs.existsSync(CACHE_FILE)) {
			return {};
		}
		
		log('Loading git info from cache');
		const cacheData = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));
		log(`Loaded cache with ${Object.keys(cacheData).length} entries`);
		return cacheData;
	} catch (e) {
		log('Error loading cache:', e);
		return {};
	}
}

function saveCache(cache: CacheData): void {
	try {
		if (!fs.existsSync(CACHE_DIR)) {
			fs.mkdirSync(CACHE_DIR, { recursive: true });
		}
		
		fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
		log(`Cache saved with ${Object.keys(cache).length} entries`);
	} catch (e) {
		log('Error saving cache:', e);
	}
}

// Convert URL to file path
function getFilePathFromUrl(url: string): string {
	// @ts-expect-error No typed
	const siteConfig = globalThis.VITEPRESS_CONFIG;
	
	let file = url.replace(/(^|\/)$/, "$1index");
	file = file.replace(/(\.html)?$/, ".md");
	file = siteConfig.rewrites.inv[file] || file;
	file = path.join(siteConfig.srcDir, file);
	
	return file;
}

// Get the GitHub repository URL from the git config
async function getGitHubRepositoryUrl(): Promise<string> {
	time('getGitHubRepositoryUrl');
	return new Promise((resolve) => {
		// Try to get the remote origin URL
		const child = spawn("git", ["config", "--get", "remote.origin.url"]);
		let output = "";
		
		child.stdout.on("data", (data) => (output += String(data)));
		
		child.on("close", () => {
			output = output.trim();
			
			// Convert SSH URLs to HTTPS
			if (output.startsWith("git@github.com:")) {
				output = output.replace("git@github.com:", "https://github.com/");
			}
			
			// Remove .git suffix if present
			if (output.endsWith(".git")) {
				output = output.slice(0, -4);
			}
			
			timeEnd('getGitHubRepositoryUrl');
			resolve(output || '');
		});
		
		child.on("error", () => {
			timeEnd('getGitHubRepositoryUrl');
			resolve('');
		});
	});
}

// getFileGitInfo function to fetch the last update time, commit hash, and relative path of a markdown file
async function getFileGitInfo(url: string): Promise<{ lastUpdated: number; hash: string; relativePath: string }> {
	const file = getFilePathFromUrl(url);

	return new Promise((resolve, reject) => {
		const cwd = path.dirname(file);
		if (!fs.existsSync(cwd)) return resolve({ lastUpdated: 0, hash: '', relativePath: '' });
		const fileName = path.basename(file);
		
		// Get both timestamp and hash in one command
		const child = spawn("git", ["log", "-1", '--pretty=format:"%ai|%H"', fileName], { cwd });
		let output = "";
		child.stdout.on("data", (data) => (output += String(data)));
		child.on("close", () => {
			// Split the output by the separator
			const parts = output.replace(/"/g, '').split('|');
			const date = parts[0] ? new Date(parts[0]).getTime() : 0;
			const hash = parts[1] || '';
			
			// Get the relative path from the git repository root
			getFileRelativePath(file).then(relativePath => {
				resolve({ lastUpdated: date, hash, relativePath });
			}).catch(() => {
				resolve({ lastUpdated: date, hash, relativePath: '' });
			});
		});
		child.on("error", reject);
	});
}

// Get the relative path of a file from the git repository root
async function getFileRelativePath(filePath: string): Promise<string> {
	return new Promise((resolve, reject) => {
		const cwd = path.dirname(filePath);
		const fileName = path.basename(filePath);
		
		// Use git to get the repository root
		const child = spawn("git", ["rev-parse", "--show-toplevel"], { cwd });
		let repoRoot = "";
		
		child.stdout.on("data", (data) => (repoRoot += String(data)));
		
		child.on("close", () => {
			repoRoot = repoRoot.trim();
			
			if (repoRoot) {
				// Calculate relative path from repo root to the file
				const fullPath = path.join(cwd, fileName);
				const relativePath = path.relative(repoRoot, fullPath);
				resolve(relativePath);
			} else {
				resolve('');
			}
		});
		
		child.on("error", reject);
	});
}

// Export the data and the loader
export const data = await loader.load();
export default loader;
