import { computed } from 'vue'

export function useRandomEmoji() {
  const emojis = [
    '🤔',
    '😅',
    '🙃',
    '😔',
    '🤷‍♂️',
    '🤷‍♀️',
    '🧭',
    '🗺️',
    '🔍',
    '📍',
    '🚀',
    '🛸',
    '🌌',
    '⭐',
    '🌟',
    '💫',
    '🌠',
    '🔮',
    '💼',
    '📦',
    '🏠',
    '🏡',
    '🏢',
    '🏰',
    '🎯',
    '🎪',
    '🎨',
    '🎭',
    '🎪',
    '🎡',
  ]

  const randomEmoji = computed(() => {
    const randomIndex = Math.floor(Math.random() * emojis.length)
    return emojis[randomIndex]
  })

  return {
    randomEmoji,
    emojis,
  }
}
