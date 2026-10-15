import { computed } from 'vue'
import { defineStore } from 'pinia'
import { useLocalStorage } from '../composables/useLocalStorage'

export const useCartStore = defineStore('cart', () => {
  // Saved to localStorage automatically (see composables/useLocalStorage.js)
  const items = useLocalStorage('canteen_cart', [])

  const totalItems = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  )

  function addToCart(product, quantity = 1) {
    const existing = items.value.find(item => item.productId === product.id)

    if (existing) {
      existing.quantity += quantity
    } else {
      items.value.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity
      })
    }
  }

  function increaseQuantity(item) {
    item.quantity++
  }

  function decreaseQuantity(item) {
    if (item.quantity > 1) item.quantity--
    else removeFromCart(item.productId)
  }

  function removeFromCart(productId) {
    items.value = items.value.filter(item => item.productId !== productId)
  }

  function clearCart() {
    items.value = []
  }

  return { items, totalItems, totalPrice, addToCart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart }
})