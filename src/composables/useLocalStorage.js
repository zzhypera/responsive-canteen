import { ref, watch } from 'vue'

// A ref that is loaded from localStorage and saved back automatically
// whenever it changes (deep). Safe if storage is blocked or the JSON is broken.
export function useLocalStorage(key, defaultValue) {
  let initial = defaultValue
  try {
    const raw = localStorage.getItem(key)
    if (raw !== null) initial = JSON.parse(raw)
  } catch {
    initial = defaultValue
  }

  const state = ref(initial)

  watch(
    state,
    value => {
      try {
        localStorage.setItem(key, JSON.stringify(value))
      } catch {
        /* storage full or disabled: keep working in memory */
      }
    },
    { deep: true }
  )

  return state
}
