<template>
  <section class="page-section">
    <div class="page-heading simple">
      <div>
        <span class="eyebrow">YOUR ORDER</span>
        <h1>Shopping cart</h1>
      </div>
    </div>

    <div v-if="cart.items.length" class="cart-layout">
      <div class="cart-list">
        <CartItem
          v-for="item in cart.items"
          :key="item.productId"
          :item="item"
          @increase="cart.increaseQuantity(item)"
          @decrease="cart.decreaseQuantity(item)"
          @remove="cart.removeFromCart(item.productId)"
        />
      </div>

      <aside class="summary-card">
        <h2>Summary</h2>
        <div class="summary-row"><span>Items</span><span>{{ cart.totalItems }}</span></div>
        <div class="summary-row"><span>Subtotal</span><span>₱{{ cart.totalPrice }}</span></div>
        <div class="summary-row"><span>Pickup fee</span><span>₱0</span></div>
        <div class="summary-total"><span>Total</span><strong>₱{{ cart.totalPrice }}</strong></div>
        <RouterLink to="/checkout" class="btn btn-primary full-button">Proceed to checkout</RouterLink>
        <RouterLink to="/menu" class="center-link">Continue shopping</RouterLink>
      </aside>
    </div>

    <div v-else class="empty-state">
      <div class="empty-icon">🛒</div>
      <h2>Your cart is empty</h2>
      <p>Looks like you haven't added anything yet.</p>
      <RouterLink to="/menu" class="btn btn-primary">Browse menu</RouterLink>
    </div>
  </section>
</template>

<script setup>
import { useCartStore } from '../stores/cart'
import CartItem from '../components/CartItem.vue'

const cart = useCartStore()
</script>