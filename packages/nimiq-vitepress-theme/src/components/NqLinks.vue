<script setup lang="ts">
import { computed } from 'vue'

interface NqLinksItem {
  label: string
  href: string
  icon?: string | false
  variant?: `nq-pill-${'blue' | 'gold' | 'green' | 'secondary' | 'tertiary' | 'orange'}`
  title?: string
}

const props = defineProps<{ item?: NqLinksItem, items?: NqLinksItem[] }>()

const domainIconMap: Record<string, string> = {
  'nimiq.com': 'i-nimiq:logos-nimiq-mono',
  'github.com': 'i-nimiq:logos-github-mono',
  'discord.gg': 'i-nimiq:logos-discord-mono',
  'discord.com': 'i-nimiq:logos-discord-mono',
  'twitter.com': 'i-nimiq:logos-twitter-mono',
  'x.com': 'i-nimiq:logos-twitter-mono',
  'telegram.org': 'i-nimiq:logos-telegram-mono',
  't.me': 'i-nimiq:logos-telegram-mono',
}

const items = computed(() => {
  const itemsList = props.items?.length ? props.items : props.item ? [props.item] : []

  return itemsList.map((item) => {
    let detectedIcon: string | undefined

    if (item.icon !== false && !item.icon) {
      // Auto-detect icon based on domain
      for (const [domain, icon] of Object.entries(domainIconMap)) {
        if (item.href.includes(domain)) {
          detectedIcon = icon
          break
        }
      }
    }

    return {
      ...item,
      icon: item.icon === false ? false : item.icon || detectedIcon,
    }
  })
})
</script>

<template>
  <div flex="~ gap-8" class="nq-raw">
    <a v-for="({ label, href, icon, title = label, variant }, index) in items" :key="href" :href :title target="_blank" rel="noopener noreferrer" nq-arrow f-text-xs mx-0 font-semibold z-100 :class="variant || (index === 0 ? 'nq-pill-blue' : 'nq-pill-secondary')">
      <div v-if="!!icon && icon !== false" :class="icon" mr-4 />
      {{ label }}
    </a>
  </div>
</template>
