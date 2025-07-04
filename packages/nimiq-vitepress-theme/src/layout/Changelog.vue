<script setup lang="ts">
import type { Commit } from '../composables/useChangelog'
import { createReusableTemplate } from '@vueuse/core'
import { Collapsible } from 'reka-ui/namespaced'
import { useChangelog } from '../composables/useChangelog'

const { commits } = useChangelog()

// TODO? Do releases
// const [DefineCommitTagLine, CommitTagLine] = createReusableTemplate<Commit>()
const [DefineCommitRegularLine, CommitRegularLine] = createReusableTemplate<Commit>()
</script>

<template>
  <h2 id="changelog" sr-only>
    Changelog
  </h2>
  <Collapsible.Root
    v-if="commits.length > 0"
    class="nq-raw"
    px-32
    bg-neutral-200
    rounded-8
    f-mt-lg
    :style="{
      maxWidth: 'var(--nq-prose-max-width, 78ch)',
      marginLeft: 'auto',
      marginRight: 'auto',
    }"
  >
    <Collapsible.Trigger bg-transparent w-full f-mt-2xs z-10 f-px-xs f-py-2xs flex="~ items-center gap-8">
      <div i-nimiq:watch-1-50 />
      See changelog of this file
    </Collapsible.Trigger>
    <Collapsible.Content un-animate-collapsible="reka-open:down reka-closed:up" un-of-hidden f-p-xs>
      <div v-for="commit in commits" :key="commit.hash" grid="~ cols-[24px_auto] items-center" children:my-auto ml--6 f-text-xs>
        <CommitTagLine v-if="commit.tag && commit.tags && commit.release_tag_url && commit.release_tags_url" v-bind="commit" />
        <CommitRegularLine v-else v-bind="commit" />
      </div>
    </Collapsible.Content>
  </Collapsible.Root>

  <DefineCommitRegularLine v-slot="{ shortHash, href, authors, date, messageAsHTML, formattedDate }">
    <div aria-hidden relative h-full w-6>
      <div h-full w-1.5 bg-neutral-700 absolute inset-y-0 left-2.75 />
      <div size-6 bg-neutral-200 outline="~ 1.5 solid neutral-700" rounded-full absolute top-12 inset-auto />
    </div>
    <div flex="~ gap-4 items-baseline" nq-prose-compact py-2>
      <a :href target="_blank" class="no-icon">
        <code f-text-xs bg-neutral-400 rounded-4 px-6 py-3 hover:underline>
          {{ shortHash }}
        </code>
      </a>
      <span ml-4 f-text-sm v-html="messageAsHTML" />
      <div ml-6 text="f-xs neutral-700" flex="~ gap-4 items-center">
        <component :is="a.url ? 'a' : 'div'" v-for="a of authors" :key="a.name" :href="a.url || undefined">
          @{{ a.name }}
        </component>
        <ClientOnly>
          <span :title="date.toISOString()">
            {{ formattedDate }}
          </span>
        </ClientOnly>
      </div>
    </div>
  </DefineCommitRegularLine>
</template>
