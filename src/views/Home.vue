<template>
  <div>
    <section class="hero">
      <div class="hero-copy">
        <span class="eyebrow">CAMPUS FOOD, MADE SIMPLE</span>
        <h1>Good food.<br /><em>Less waiting.</em></h1>
        <p>Order your favorite canteen meals before you reach the counter. Pick up, eat, and get back to campus life.</p>
        <div class="hero-actions">
          <RouterLink to="/menu" class="btn btn-primary">Browse menu →</RouterLink>
          <RouterLink to="/orders" class="text-link">Track my order</RouterLink>
        </div>
      </div>
      <div class="hero-visual">
        <div class="hero-card hero-card-main">
          <img src="https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=1000&q=85" alt="Campus meal" />
        </div>
        <div class="floating-note">
          <span>Today’s pick</span>
          <strong>Chicken Rice Meal</strong>
          <small>₱85 · Ready in 10–15 min</small>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="section-heading">
        <div>
          <span class="eyebrow">POPULAR TODAY</span>
          <h2>What are you craving?</h2>
        </div>
        <RouterLink to="/menu" class="text-link">View all →</RouterLink>
      </div>

      <div class="food-grid">
        <FoodCard
          v-for="product in featured"
          :key="product.id"
          :product="product"
          :favorite="favorites.isFavorite(product.id)"
          @add="addToCart"
          @toggle-favorite="toggleFavorite"
        />
      </div>
    </section>

    <section class="steps-section">
      <div>
        <span class="eyebrow">HOW IT WORKS</span>
        <h2>From hungry to happy in three steps.</h2>
      </div>
      <div class="steps-grid">
        <div class="step-card"><span>01</span><h3>Choose</h3><p>Browse the menu and add your favorites to your cart.</p></div>
        <div class="step-card"><span>02</span><h3>Order</h3><p>Choose your pickup spot and preferred payment method.</p></div>
        <div class="step-card"><span>03</span><h3>Pick up</h3><p>Track your order and collect it when it is ready.</p></div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useProductsStore } from '../stores/products'
import { useCatalogActions } from '../composables/useCatalogActions'
import FoodCard from '../components/FoodCard.vue'

const store = useProductsStore()
const { favorites, addToCart, toggleFavorite } = useCatalogActions()
const featured = computed(() => store.products.slice(0, 4))
</script>