<template>
  <div>
    <div class="admin-heading">
      <div><span class="eyebrow">CUSTOMER MANAGEMENT</span><h1>Customers</h1></div>
    </div>

    <div class="admin-panel">
      <div class="table-wrap">
        <table>
          <thead><tr><th>Customer</th><th>ID number</th><th>Orders</th><th>Total spent</th><th>Status</th></tr></thead>
          <tbody>
            <tr v-for="customer in customers" :key="customer.idNumber">
              <td data-label="Customer"><strong>{{ customer.name }}</strong></td>
              <td data-label="ID number">{{ customer.idNumber }}</td>
              <td data-label="Orders">{{ customer.orders }}</td>
              <td data-label="Total spent">₱{{ customer.spent }}</td>
              <td data-label="Status"><span class="status-pill completed">Active</span></td>
            </tr>
            <tr v-if="!customers.length"><td colspan="5" class="table-empty">No student accounts yet.</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { useOrdersStore } from '../../stores/orders'

const auth = useAuthStore()
const store = useOrdersStore()

const customers = computed(() =>
  auth.students.map(student => {
    const mine = store.orders.filter(order => order.customerId === student.idNumber)
    return {
      idNumber: student.idNumber,
      name: student.name,
      orders: mine.length,
      spent: mine.reduce((sum, order) => sum + order.total, 0)
    }
  })
)
</script>
