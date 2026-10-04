import { computed } from 'vue'
import { defineStore } from 'pinia'
import { useLocalStorage } from '../composables/useLocalStorage'

export const useFavoritesStore = defineStore('favorites', () => {
  const ids = useLocalStorage('canteen_favorites', [])

  const count = computed(() => ids.value.length)
  const isFavorite = id => ids.value.includes(id)

  function toggle(id) {
    ids.value = isFavorite(id) ? ids.value.filter(x => x !== id) : [...ids.value, id]
  }

  return { ids, count, isFavorite, toggle }
})
