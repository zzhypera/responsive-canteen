<template>
  <div class="admin-shell">
    <aside class="admin-sidebar" :class="{ open }">
      <div class="admin-topbar">
        <RouterLink class="admin-brand" to="/admin">
          <span class="brand-mark">CC</span>
          <span>Campus Canteen</span>
        </RouterLink>
        <button
          type="button"
          class="menu-toggle admin-toggle"
          :class="{ open }"
          :aria-expanded="open"
          aria-label="Toggle admin menu"
          @click="open = !open"
        >
          <span></span><span></span><span></span>
        </button>
      </div>

      <nav aria-label="Admin navigation">
        <RouterLink to="/admin">Dashboard</RouterLink>
        <RouterLink to="/admin/orders">Orders</RouterLink>
        <RouterLink to="/admin/products">Products</RouterLink>
        <RouterLink to="/admin/categories">Categories</RouterLink>
        <RouterLink to="/admin/customers">Customers</RouterLink>
      </nav>

      <RouterLink class="back-link" to="/menu">← Back to store</RouterLink>
    </aside>

    <main class="admin-main">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const open = ref(false)

// Collapse the mobile menu whenever the page changes
watch(() => route.fullPath, () => (open.value = false))
</script>
