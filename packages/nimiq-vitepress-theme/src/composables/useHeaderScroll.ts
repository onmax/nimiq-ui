import { useEventListener } from '@vueuse/core'
import { onMounted, onUnmounted, readonly, ref } from 'vue'

/**
 * Composable for handling header scroll behavior.
 * Tracks scroll direction and provides reactive state for showing/hiding header.
 *
 * @param threshold - Minimum scroll distance before triggering hide/show (default: 10px)
 * @param hideDelay - Delay in ms before hiding header when scrolling down (default: 100ms)
 */
export function useHeaderScroll(threshold = 10, hideDelay = 100) {
  const isHeaderVisible = ref(true)
  const scrollY = ref(0)
  const lastScrollY = ref(0)
  const scrollDirection = ref<'up' | 'down' | null>(null)

  let hideTimeout: ReturnType<typeof setTimeout> | null = null

  const handleScroll = () => {
    const currentScrollY = typeof window !== 'undefined' ? window.scrollY : 0
    scrollY.value = currentScrollY

    // Don't hide header when at the very top
    if (currentScrollY <= 0) {
      isHeaderVisible.value = true
      scrollDirection.value = null
      return
    }

    const scrollDiff = currentScrollY - lastScrollY.value

    // Only trigger if scroll difference is above threshold
    if (Math.abs(scrollDiff) < threshold) {
      return
    }

    const newDirection = scrollDiff > 0 ? 'down' : 'up'

    // Clear any pending hide timeout
    if (hideTimeout) {
      clearTimeout(hideTimeout)
      hideTimeout = null
    }

    if (newDirection === 'up') {
      // Show header immediately when scrolling up
      isHeaderVisible.value = true
      scrollDirection.value = 'up'
    }
    else if (newDirection === 'down') {
      // Hide header with delay when scrolling down
      scrollDirection.value = 'down'
      hideTimeout = setTimeout(() => {
        isHeaderVisible.value = false
      }, hideDelay)
    }

    lastScrollY.value = currentScrollY
  }

  useEventListener('scroll', handleScroll, { passive: true })

  onMounted(() => {
    // Initialize scroll position
    scrollY.value = window.scrollY
    lastScrollY.value = window.scrollY
  })

  onUnmounted(() => {
    if (hideTimeout) {
      clearTimeout(hideTimeout)
    }
  })

  return {
    isHeaderVisible: readonly(isHeaderVisible),
    scrollY: readonly(scrollY),
    scrollDirection: readonly(scrollDirection),
  }
}
