<template>
  <header class="navbar">
    <RouterLink to="/" class="brand">
      <span class="brand-mark">CC</span>
      <span>Campus<span>Canteen</span></span>
    </RouterLink>

    <nav id="main-nav" class="nav-links" :class="{ open }" aria-label="Main navigation">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/menu">Menu</RouterLink>
      <RouterLink to="/favorites">Favorites<span v-if="favorites.count" class="nav-count">{{ favorites.count }}</span></RouterLink>
      <RouterLink to="/orders">Orders</RouterLink>
      <RouterLink v-if="auth.isAdmin" to="/admin">Admin</RouterLink>
      <RouterLink v-if="auth.isAuthenticated" to="/profile" class="nav-mobile-only">Profile</RouterLink>
      <RouterLink v-else to="/login" class="nav-mobile-only">Login</RouterLink>
    </nav>

    <div class="nav-actions">
      <RouterLink to="/cart" class="cart-button">
        Cart <span>{{ cart.totalItems }}</span>
      </RouterLink>
      <RouterLink v-if="!auth.isAuthenticated" to="/login" class="btn btn-dark nav-login">Login</RouterLink>
      <RouterLink v-else to="/profile" class="profile-dot" aria-label="Profile">{{ auth.user?.name?.charAt(0) }}</RouterLink>
      <button
        type="button"
        class="menu-toggle"
        :class="{ open }"
        :aria-expanded="open"
        aria-controls="main-nav"
        aria-label="Toggle menu"
        @click="open = !open"
      >
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>
  <div v-if="open" class="nav-backdrop" @click="open = false"></div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { useAuthStore } from '../stores/auth'
import { useFavoritesStore } from '../stores/favorites'
import { throttle } from '../composables/useDebounce'

const cart = useCartStore()
const auth = useAuthStore()
const favorites = useFavoritesStore()
const route = useRoute()
const open = ref(false)

// Close the mobile menu after navigating, on Escape, or when the screen grows to desktop size
watch(() => route.fullPath, () => (open.value = false))

function onKey(e) { if (e.key === 'Escape') open.value = false }
// Limiting events: resize fires dozens of times per second, so run it at most every 150 ms
const onResize = throttle(() => { if (window.innerWidth > 720) open.value = false }, 150)

onMounted(() => {
  window.addEventListener('keydown', onKey)
  window.addEventListener('resize', onResize)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
  window.removeEventListener('resize', onResize)
})
</script>
