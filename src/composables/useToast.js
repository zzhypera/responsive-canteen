import { ref } from 'vue'

// Module-level state = shared by every component that calls useToast().
const toasts = ref([])
let nextId = 1

export function useToast() {
  function show(message, duration = 2200) {
    const id = nextId++
    toasts.value.push({ id, message })
    setTimeout(() => (toasts.value = toasts.value.filter(t => t.id !== id)), duration)
  }
  return { toasts, show }
}
