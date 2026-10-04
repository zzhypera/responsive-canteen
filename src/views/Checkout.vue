<template>
  <section class="page-section">
    <div class="page-heading simple">
      <div>
        <span class="eyebrow">FINAL STEP</span>
        <h1>Checkout</h1>
      </div>
    </div>

    <form class="checkout-layout" @submit.prevent="placeOrder">
      <div class="checkout-form">
        <div class="form-card">
          <h2>1. Pickup location</h2>
          <label v-for="location in locations" :key="location" class="radio-option">
            <input v-model="form.pickupLocation" type="radio" :value="location" />
            <span>{{ location }}</span>
          </label>
        </div>

        <div class="form-card">
          <h2>2. Pickup time</h2>
          <select v-model="form.pickupTime" required>
            <option>ASAP · 10–15 minutes</option>
            <option>10:30 AM</option>
            <option>11:00 AM</option>
            <option>11:30 AM</option>
            <option>12:00 PM</option>
          </select>
        </div>

        <div class="form-card">
          <h2>3. Payment method</h2>
          <label v-for="method in methods" :key="method" class="radio-option">
            <input v-model="form.paymentMethod" type="radio" :value="method" />
            <span>{{ method }}</span>
          </label>
        </div>
      </div>

      <aside class="summary-card">
        <h2>Order summary</h2>
        <div v-for="item in cart.items" :key="item.productId" class="summary-item">
          <span>{{ item.name }} × {{ item.quantity }}</span>
          <strong>₱{{ item.price * item.quantity }}</strong>
        </div>
        <div class="summary-total"><span>Total</span><strong>₱{{ cart.totalPrice }}</strong></div>
        <button class="btn btn-primary full-button" :disabled="!cart.items.length">Place order</button>
        <p class="small-note">By placing this order, you confirm your selected pickup and payment details.</p>
      </aside>
    </form>
  </section>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { useOrdersStore } from '../stores/orders'

const router = useRouter()
const cart = useCartStore()
const orders = useOrdersStore()

const locations = ['SB Cafeteria', 'College Canteen', 'Higshchool Canteen', 'Near Gate']
const methods = ['Cash', 'GCash', 'Card']

const form = reactive({
  pickupLocation: locations[0],
  pickupTime: 'ASAP · 10–15 minutes',
  paymentMethod: 'Cash'
})

function placeOrder() {
  const order = orders.createOrder({
    items: cart.items,
    total: cart.totalPrice,
    ...form
  })
  cart.clearCart()
  router.push({ name: 'order-success', query: { id: order.id } })
}
</script>