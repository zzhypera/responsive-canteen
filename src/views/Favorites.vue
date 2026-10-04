<template>
  <section class="page-section">
    <div class="page-heading simple">
      <div>
        <span class="eyebrow">SAVED FOR LATER</span>
        <h1>My favorites</h1>
      </div>
    </div>

    <div v-if="items.length" class="food-grid menu-grid">
      <FoodCard
        v-for="product in items"
        :key="product.id"
        :product="product"
        favorite
        @add="addToCart"
        @toggle-favorite="toggleFavorite"
      />
    </div>

    <div v-else class="empty-state">
      <div class="empty-icon">♡</div>
      <h2>No favorites yet</h2>
      <p>Tap the heart on any dish and it will show up here.</p>
      <RouterLink to="/menu" class="btn btn-primary">Browse menu</RouterLink>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useProductsStore } from '../stores/products'
import { useCatalogActions } from '../composables/useCatalogActions'
import FoodCard from '../components/FoodCard.vue'

const store = useProductsStore()
const { favorites, addToCart, toggleFavorite } = useCatalogActions()

const items = computed(() => store.products.filter(p => favorites.isFavorite(p.id)))
</script>
