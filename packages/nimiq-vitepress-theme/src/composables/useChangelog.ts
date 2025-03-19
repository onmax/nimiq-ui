import type { CommitWithAuthorInfo } from '@nolebase/vitepress-plugin-git-changelog/client/composables/changelog'
import { useChangelog as useChangelogNolebase } from '@nolebase/vitepress-plugin-git-changelog/client/composables/changelog'
import { renderCommitMessage } from '@nolebase/vitepress-plugin-git-changelog/client/utils'
import { createGlobalState, useTimeAgo } from '@vueuse/core'
import { computed, onMounted } from 'vue'

export interface Commit extends CommitWithAuthorInfo {
  formattedDate: string
  messageAsHTML: string
  date: Date
  href: string
  shortHash: string
}

export const useChangelog = createGlobalState(() => {
  const { commits: _commits, useHmr } = useChangelogNolebase()
  onMounted(useHmr)

  const commits = computed(() => {
    return _commits.value
      .sort((a, b) => b.date_timestamp - a.date_timestamp)
      .map(commit => ({
        ...commit,
        formattedDate: useTimeAgo(commit.date_timestamp).value,
        messageAsHTML: renderCommitMessage(commit.repo_url!, commit.message),
        date: new Date(commit.date_timestamp * 1000),
        href: commit.hash_url || `${commit.repo_url}/commit/${commit.hash}`,
        shortHash: commit.hash.slice(0, 7),
      } satisfies Commit))
  })
  const repoURL = computed(() => commits.value.find(commit => commit.repo_url)?.repo_url || '')

  return {
    commits,
    repoURL,
  }
})
