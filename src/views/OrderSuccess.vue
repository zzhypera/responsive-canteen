<template>
  <section class="success-page">
    <div class="success-icon">✓</div>
    <span class="eyebrow">ORDER CONFIRMED</span>
    <h1>Your food is on the way.</h1>
    <p>Your order <strong>{{ orderId }}</strong> has been received by the canteen.</p>
    <div class="success-actions">
      <RouterLink :to="`/orders/${orderId}`" class="btn btn-primary">Track order</RouterLink>
      <RouterLink to="/menu" class="btn btn-light">Order more</RouterLink>
    </div>
  </section>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
const orderId = route.query.id || 'your order'
</script>