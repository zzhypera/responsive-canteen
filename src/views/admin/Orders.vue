<template>
  <div>
    <div class="admin-heading">
      <div><span class="eyebrow">ORDER MANAGEMENT</span><h1>Orders</h1></div>
    </div>

    <div class="filter-tabs">
      <button v-for="status in statuses" :key="status" :class="{ active: selected === status }" @click="selected = status">{{ status }}</button>
    </div>

    <div class="admin-panel">
      <div class="table-wrap">
        <table>
          <thead><tr><th>Order</th><th>Customer</th><th>Items</th><th>Total</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            <tr v-for="order in filtered" :key="order.id">
              <td data-label="Order"><strong>{{ order.id }}</strong></td>
              <td data-label="Customer"><span>{{ order.customerName || 'Campus Student' }}<br /><small>{{ order.customerId ? `ID ${order.customerId}` : '' }}</small></span></td>
              <td data-label="Items">{{ order.items.map(i => `${i.name} × ${i.quantity}`).join(', ') }}</td>
              <td data-label="Total">₱{{ order.total }}</td>
              <td data-label="Status"><span class="status-pill" :class="order.status">{{ order.status }}</span></td>
              <td data-label="Action">
                <select :value="order.status" @change="changeStatus(order.id, $event.target.value)">
                  <option v-for="s in orderStatuses" :key="s" :value="s">{{ s }}</option>
                </select>
              </td>
            </tr>
            <tr v-if="!filtered.length"><td colspan="6" class="table-empty">No orders in this category.</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useOrdersStore } from '../../stores/orders'

const store = useOrdersStore()
const selected = ref('all')
const statuses = ['all', 'pending', 'preparing', 'ready', 'completed']
const orderStatuses = statuses.slice(1)

const filtered = computed(() => {
  if (selected.value === 'all') return store.orders
  return store.orders.filter(order => order.status === selected.value)
})

function changeStatus(id, status) {
  store.updateStatus(id, status)
}
</script>