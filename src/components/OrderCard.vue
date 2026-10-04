<template>
  <RouterLink :to="`/orders/${order.id}`" class="order-card">
    <div>
      <span class="order-number">{{ order.id }}</span>
      <h3>{{ itemsSummary(order.items) }}</h3>
      <p>{{ formatDate(order.createdAt) }}</p>
    </div>
    <div class="order-card-right">
      <span class="status-pill" :class="order.status">{{ order.status }}</span>
      <strong>{{ formatPrice(order.total) }}</strong>
    </div>
  </RouterLink>
</template>

<script>
// This component is written with the OPTIONS API on purpose, to compare with the
// <script setup> (Composition API) used everywhere else, e.g. views/OrderDetails.vue.
// Shared helpers come from a MIXIN here; the Composition version uses the
// useFormat() composable instead.
import formatMixin from '../mixins/formatMixin'

export default {
  name: 'OrderCard',
  mixins: [formatMixin],
  props: {
    order: { type: Object, required: true }
  }
}
</script>
