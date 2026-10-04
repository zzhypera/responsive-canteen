import { onBeforeUnmount, ref, watch } from 'vue'

// Limiting events, option 1: DEBOUNCE.
// Runs `fn` only after the events stop for `delay` ms (good for typing in a search box).
export function debounce(fn, delay = 300) {
  let timer
  const debounced = (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
  debounced.cancel = () => clearTimeout(timer)
  return debounced
}

// Limiting events, option 2: THROTTLE.
// Runs `fn` at most once every `interval` ms (good for resize, scroll, double-clicks).
export function throttle(fn, interval = 500) {
  let last = 0
  return (...args) => {
    const now = Date.now()
    if (now - last >= interval) {
      last = now
      fn(...args)
    }
  }
}

// A ref whose value follows `source` after a delay.
export function useDebouncedRef(source, delay = 300) {
  const debounced = ref(source.value)
  const update = debounce(value => (debounced.value = value), delay)
  watch(source, update)
  onBeforeUnmount(() => update.cancel())
  return debounced
}
