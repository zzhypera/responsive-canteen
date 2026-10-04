<template>
  <section class="page-section">
    <div class="page-heading">
      <div>
        <span class="eyebrow">THE CANTEEN MENU</span>
        <h1>Find something delicious.</h1>
      </div>
      <SearchBar v-model="search" />
    </div>

    <CategoryFilter v-model="category" :categories="store.categories" />

    <div v-if="filteredProducts.length" class="food-grid menu-grid">
      <FoodCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
        :favorite="favorites.isFavorite(product.id)"
        @add="addToCart"
        @toggle-favorite="toggleFavorite"
      />
    </div>

    <div v-else class="empty-state">
      <div class="empty-icon">⌕</div>
      <h2>No food found</h2>
      <p>Try a different search or category.</p>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useProductsStore } from '../stores/products'
import { useCatalogActions } from '../composables/useCatalogActions'
import FoodCard from '../components/FoodCard.vue'
import SearchBar from '../components/SearchBar.vue'
import CategoryFilter from '../components/CategoryFilter.vue'

// These arrive from the route config (`props: route => ...` in router/index.js),
// so /menu?q=rice&category=Meals opens already filtered and can be shared.
const props = defineProps({
  initialSearch: { type: String, default: '' },
  initialCategory: { type: String, default: 'All' }
})

const router = useRouter()
const store = useProductsStore()
const { favorites, addToCart, toggleFavorite } = useCatalogActions()

const search = ref(props.initialSearch)
const category = ref(props.initialCategory)

// Re-sync when the URL changes from outside (e.g. clicking "Menu" in the navbar)
watch(() => [props.initialSearch, props.initialCategory], ([q, c]) => {
  search.value = q
  category.value = c
})

// Keep the URL in step with the filters
watch([search, category], ([q, c]) => {
  router.replace({
    query: { ...(q ? { q } : {}), ...(c !== 'All' ? { category: c } : {}) }
  })
})

const filteredProducts = computed(() => {
  return store.products.filter(product => {
    const matchesCategory = category.value === 'All' || product.category === category.value
    const query = search.value.toLowerCase()
    const matchesSearch = !query || `${product.name} ${product.description}`.toLowerCase().includes(query)
    return matchesCategory && matchesSearch
  })
})
</script>
