import {
  type Preset,
  type PresetFactory,
  definePreset,
  presetIcons,
  type Preflight,
} from "unocss";
import { readFileSync, existsSync, copyFileSync, readdirSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { toJSON, toCSS } from "ts-cssjson";
import { getNimiqColors } from "./colors";
import { fileURLToPath } from "node:url";
import { cwd} from "node:process";
import { name } from '../../package.json'

export type NimiqPresetOptions = {
  /**
   * Whether to reset the styles of the page
   *
   * @default tailwind-compat
   */
  reset?: boolean | "tailwind-compat" | "tailwind" | "eric-meyer" | "normalize";

  /**
   * Whether to include the default Nimiq font locally
   */
  fonts?: {
    /**
     * The path to the fonts folder
     *
     * @default "public/assets/fonts"
     */
    path?: string;

    /**
     * The url to the fonts folder. The URL that the client will use to fetch the fonts
     *
     * @default "/assets/fonts"
     */
    url?: string
  } | boolean;

  /**
   * Whether to include the preflight styles of Nimiq.
   * It sets the default styles for the entire page.
   *
   * @default true
   */
  preflight?: boolean;

  /**
   * Add support for `prose` class which adds Nimiq styles for articles
   *
   * @default false
   */
  typography?: boolean;

  /**
   * Add support for utilities
   * @default false
   */
  utilities?: boolean;

  /**
   * Add Nimiq Icons
   * @default true
   */
  icons?: boolean;
};

function createPreset() {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const _cssDir = resolve(__dirname, "../css");
  const unminifiedFolder = resolve(_cssDir, "unminified");
  const unminifiedExists = existsSync(unminifiedFolder);
  const cssDir = unminifiedExists ? unminifiedFolder : _cssDir;
  const p = (name: string) => `${cssDir}/${name}.css`;
  const readContent = (path: string) => readFileSync(path, "utf-8");
  const wrapContentToLayer = (name: string) =>
    `@layer nq-${name} { ${readContent(p(name))} }`;

  type CssToRulesOptions = { convertToAttributes?: boolean };

  function cssToRules(
    name: string,
    { convertToAttributes = true }: CssToRulesOptions = {},
  ) {
    type Setup = { css: string; re: RegExp };
    const rulesSetup: Record<string, Setup> = {};

    const layer = `nq-${name}`;

    const content = readContent(p(name)).replaceAll(
      "data:image/svg+xml;",
      "SEMICOLON_BUG_HACK",
    );
    const json = toJSON(content, {
      stripComments: true,
      comments: false,
      ordered: false,
      split: false,
    });
    const allRulesNames: string[] = []
    for (const key of Object.keys(json.children)) {
      const rulesNames = key.split(",").map((s) => s.trim());
      allRulesNames.push(...rulesNames.filter(r => r.startsWith(".")).map(r => r.replace(/^\./, "").trim()))
      const css = toCSS(json.children[key]).replaceAll(
        "SEMICOLON_BUG_HACK",
        "data:image/svg+xml;",
      );
      for (const rule of rulesNames) {
        if (!rule.startsWith(".")) continue;
        const ruleName = rule.replace(/^\./, "").trim();
        const re = new RegExp(`^${ruleName}$`);
        const selector = convertToAttributes
          ? `${rule}, [${ruleName}=""], [${ruleName}="true"]`
          : rule;
        const setup: Setup = { css, re };
        if (rulesSetup[selector]) rulesSetup[selector].css += css;
        else rulesSetup[selector] = setup;
      }
    }
    const rules: Preset["rules"] = Object.entries(rulesSetup).map(
      ([selector, { css, re }]) => [
        re,
        () => `@layer nq-${name} { ${selector} { ${css} } }`,
        { layer },
      ],
    );
    return { rules, rulesNames: allRulesNames };
  }

  function extractKeyframes(name: string) {
    const content = readContent(p(name)).replaceAll(
      "data:image/svg+xml;",
      "SEMICOLON_BUG_HACK",
    );
    const json = toJSON(content, {
      stripComments: true,
      comments: false,
      ordered: false,
      split: false,
    });
    let keyframesStr = "";
    for (const key of Object.keys(json.children)) {
      const keyframes = key
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.startsWith("@keyframes"));
      const css = toCSS(json.children[key]).replaceAll(
        "SEMICOLON_BUG_HACK",
        "data:image/svg+xml;",
      );
      keyframesStr += `${keyframes.join(", ")} { ${css} }\n`;
    }
    return keyframesStr;
  }

  return (options: NimiqPresetOptions = {}): Preset => {
    const { gradients, colors } = getNimiqColors();

    // This is the css to define the order of the CSS layers
    const layerDefinition: Preflight = {
      getCSS: () =>
        "@layer nq-reset, nq-colors, nq-preflight, nq-typography, nq-utilities;",
    };

    const { reset = "tailwind-compat" } = options;
    const resetLayer: Preflight = {
      getCSS() {
        if (reset === false) return "";
        const fileName = reset === true ? "tailwind-compat" : reset;
        const url = resolve(`node_modules/@unocss/reset/${fileName}.css`);
        const content = readFileSync(url, "utf-8");
        return `@layer nq-reset { /* CSS Reset ${fileName}*/ ${content} }`;
      },
      layer: "nq-reset",
    };

    const { preflight = true } = options;
    const preflights: Preset["preflights"] = [
      layerDefinition,
      resetLayer,
      {
        layer: "nq-colors",
        getCSS: () => wrapContentToLayer("colors"),
      },
    ];

    if (preflight)
      preflights.push({
        layer: "nq-preflight",
        getCSS: () => wrapContentToLayer("preflight"),
      });

    const { utilities = false, typography = false } = options;
    const rules: Preset["rules"] = [
      [
        /^scrollbar-hide$/,
        (_, { constructCSS }) => {
          let res = constructCSS({ "scrollbar-width": "none" });
          res += `\n${res.replace("{scrollbar-width:none;}", "::-webkit-scrollbar{display: none;}")}`;
          return res;
        },
      ],
    ];

    // The only way to add gradients is via rules
    for (const [key, gradient, color] of gradients) {
      const backgroundImage = { "background-image": gradient };
      const background = { "background-color": colors[color].DEFAULT }; // This is the fallback color
      rules.push([
        key,
        { ...background, ...backgroundImage },
        { layer: "nq-colors" },
      ]);
    }

    const autocompleteRules: string[] = []

    if (utilities) {
      const { rulesNames, rules } = cssToRules("utilities")
      rules.push(...rules)
      autocompleteRules.push(...rulesNames)
      // keyframes
      const getCSS = () => extractKeyframes("utilities");
      preflights.push({ layer: "nq-utilities", getCSS });
    }

    if (typography) {
      const { rules, rulesNames } = cssToRules("typography", { convertToAttributes: false })
      rulesNames.forEach((r) => autocompleteRules.push(r))
      rules.push(...rules)
    }

    const defaultFontOptions = { path: "public/assets/fonts", url: "/assets/fonts" }
    let { fonts = defaultFontOptions } = options;
    const presets: Preset["presets"] = [];
    if (fonts) {
      if (fonts === true) fonts = defaultFontOptions;
      const projectRoot = cwd();
      const destPath = resolve(projectRoot, fonts.path as string);
      if (!existsSync(destPath)) mkdirSync(destPath, { recursive: true });
      
      const fontPath = resolve(projectRoot, `node_modules/${name}/dist/assets/fonts`);
      const fontFiles = readdirSync(fontPath).filter((f) => f.endsWith(".ttf"));
      const missingFonts = fontFiles.some((f) => !existsSync(resolve(destPath, f)));
      if (missingFonts) {
        for (const file of fontFiles) {
          copyFileSync(resolve(fontPath, file), resolve(destPath, file));
          console.log(`Copied font ${file} to ${destPath}`);
        }
      }

      const url = fonts.url!;

      preflights.push({
        layer: "nq-fonts",
        getCSS: () => wrapContentToLayer("fonts").replaceAll(/src: url\(\'\/assets\/fonts\/(.*?)'/g, `src: url('${url}/$1'`),
      });
    }

    const { icons = true } = options;
    if (icons) {
      presets.push(
        presetIcons({
          collections: {
            nimiq: async () => {
              return await fetch(
                "https://raw.githubusercontent.com/onmax/nimiq-ui/main/packages/nimiq-icons/dist/icons.json",
              ).then((res) => res.json() as any);
            },
          },
        }),
      );
    }

    const variants: Preset["variants"] = [
      (matcher) => {
        if (!matcher.startsWith("inverted:")) return matcher;
        return {
          matcher: matcher.slice(9),
          selector: (s) =>
            `:is(.inverted,[data-inverted])${s}, :is(.inverted,[data-inverted]) ${s}`,
        };
      },
      (matcher) => {
        if (!matcher.startsWith("hocus:")) return matcher;
        return {
          matcher: matcher.replace(/^hocus:/, ""),
          selector: (s) => `${s}:hover, ${s}:focus-visible`,
        };
      },
    ];

    console.log(autocompleteRules)

    const preset: Preset = {
      name: "nimiq-preset",
      preflights,
      variants,
      theme: {
        colors,
      },
      presets,
      autocomplete: {
        templates: [...new Set(autocompleteRules)],
      },
      rules,
      layers: {
        "nq-reset": -1,
      },
    };
    return preset;
  };
}

export const presetNimiq: PresetFactory<object, NimiqPresetOptions> =
  definePreset(createPreset());
