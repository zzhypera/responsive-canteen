<template>
  <section v-if="order" class="page-section narrow-page">
    <RouterLink to="/orders" class="back-link">← My orders</RouterLink>

    <div class="order-detail-header">
      <div>
        <span class="eyebrow">ORDER {{ order.id }}</span>
        <h1>Order details</h1>
      </div>
      <span class="status-pill large-status" :class="order.status">{{ order.status }}</span>
    </div>

    <OrderStatus :status="order.status" />

    <div class="detail-order-grid">
      <div class="form-card">
        <h2>Items</h2>
        <div v-for="item in order.items" :key="item.productId" class="summary-item">
          <span>{{ item.name }} × {{ item.quantity }}</span>
          <strong>{{ formatPrice(item.price * item.quantity) }}</strong>
        </div>
        <div class="summary-total"><span>Total</span><strong>{{ formatPrice(order.total) }}</strong></div>
      </div>

      <div class="form-card">
        <h2>Pickup</h2>
        <p><span class="muted">Location</span><br />{{ order.pickupLocation }}</p>
        <p><span class="muted">Time</span><br />{{ order.pickupTime }}</p>
        <p><span class="muted">Payment</span><br />{{ order.paymentMethod }}</p>
      </div>
    </div>
  </section>

  <div v-else class="empty-state">
    <h2>Order not found</h2>
    <RouterLink to="/orders" class="btn btn-primary">Back to orders</RouterLink>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useFormat } from '../composables/useFormat'
import { useOrdersStore } from '../stores/orders'
import { useAuthStore } from '../stores/auth'
import OrderStatus from '../components/OrderStatus.vue'

const props = defineProps({ id: { type: String, required: true } })
const { formatPrice } = useFormat()
const store = useOrdersStore()
const auth = useAuthStore()
const order = computed(() => {
  const found = store.getOrder(props.id)
  if (!found) return null
  return auth.isAdmin || found.customerId === auth.user?.idNumber ? found : null
})
</script>