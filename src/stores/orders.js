import { computed } from 'vue'
import { defineStore } from 'pinia'
import { useAuthStore } from './auth'
import { useLocalStorage } from '../composables/useLocalStorage'

export const useOrdersStore = defineStore('orders', () => {
  const auth = useAuthStore()
  const orders = useLocalStorage('canteen_orders', [])

  // Students only see their own orders; admins use `orders` to see everything.
  const myOrders = computed(() =>
    orders.value.filter(order => order.customerId === auth.user?.idNumber)
  )

  function createOrder({ items, total, pickupLocation, pickupTime, paymentMethod }) {
    const order = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customerId: auth.user?.idNumber || '',
      customerName: auth.user?.name || '',
      items: JSON.parse(JSON.stringify(items)),
      total,
      pickupLocation,
      pickupTime,
      paymentMethod,
      status: 'pending',
      createdAt: new Date().toISOString()
    }

    orders.value.unshift(order)
    return order
  }

  function getOrder(id) {
    return orders.value.find(order => order.id === id)
  }

  function updateStatus(id, status) {
    const order = getOrder(id)
    if (order) {
      order.status = status
    }
  }

  return { orders, myOrders, createOrder, getOrder, updateStatus }
})