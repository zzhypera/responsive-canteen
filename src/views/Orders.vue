<template>
  <section class="page-section">
    <div class="page-heading simple">
      <div>
        <span class="eyebrow">ORDER HISTORY</span>
        <h1>My orders</h1>
      </div>
    </div>

    <div v-if="orders.myOrders.length" class="orders-list">
      <OrderCard v-for="order in orders.myOrders" :key="order.id" :order="order" />
    </div>

    <div v-else class="empty-state">
      <div class="empty-icon">☷</div>
      <h2>No orders yet</h2>
      <p>Your completed and active orders will appear here.</p>
      <RouterLink to="/menu" class="btn btn-primary">Start an order</RouterLink>
    </div>
  </section>
</template>

<script setup>
import { useOrdersStore } from '../stores/orders'
import OrderCard from '../components/OrderCard.vue'
const orders = useOrdersStore()
</script>