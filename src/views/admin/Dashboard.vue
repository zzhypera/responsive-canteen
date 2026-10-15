<template>
  <div>
    <!-- Welcome message and today's date. -->
    <div class="admin-heading">
      <div>
        <span class="eyebrow">OVERVIEW</span>
        <h1>Good day, {{ auth.user?.name }}.</h1>
      </div>
      <span class="date-chip">{{ new Date().toLocaleDateString() }}</span>
    </div>

    <!-- Summary cards show today's activity and account counts. -->
    <div class="stats-grid">
      <div class="stat-card"><span>Today's orders</span><strong>{{ todayOrders.length }}</strong><small>Across all pickup points</small></div>
      <div class="stat-card"><span>Today's sales</span><strong>₱{{ todaySales.toLocaleString() }}</strong><small>From today's orders</small></div>
      <div class="stat-card"><span>Pending orders</span><strong>{{ pendingCount }}</strong><small>Need staff attention</small></div>
      <div class="stat-card"><span>Students</span><strong>{{ auth.students.length }}</strong><small>Registered accounts</small></div>
    </div>

    <!-- Show recent orders with customer, total, and current status. -->
    <div class="admin-panel">
      <div class="panel-heading"><h2>Recent orders</h2><RouterLink to="/admin/orders" class="text-link">View all →</RouterLink></div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Order</th><th>Customer</th><th>Total</th><th>Status</th></tr></thead>
          <tbody>
            <tr v-for="order in recentOrders" :key="order.id">
              <td data-label="Order">#{{ order.id }}</td>
              <td data-label="Customer"><span>{{ order.customerName || 'Campus Student' }}<small v-if="order.customerId"> · ID {{ order.customerId }}</small></span></td>
              <td data-label="Total">₱{{ order.total }}</td>
              <td data-label="Status"><span class="status-pill" :class="order.status">{{ order.status }}</span></td>
            </tr>
            <tr v-if="!recentOrders.length"><td colspan="4" class="table-empty">No orders yet.</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Show the latest student registrations. -->
    <div class="admin-panel">
      <div class="panel-heading"><h2>Newest students</h2><RouterLink to="/admin/customers" class="text-link">View all →</RouterLink></div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Student</th><th>ID number</th></tr></thead>
          <tbody>
            <tr v-for="student in newestStudents" :key="student.idNumber">
              <td data-label="Student"><strong>{{ student.name }}</strong></td>
              <td data-label="ID number">{{ student.idNumber }}</td>
            </tr>
            <tr v-if="!newestStudents.length"><td colspan="2" class="table-empty">No students yet.</td></tr>
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

// Keep only orders created today for the dashboard's daily figures.
const todayOrders = computed(() => {
  const today = new Date().toDateString()
  return store.orders.filter(order => new Date(order.createdAt).toDateString() === today)
})

// Add today's order totals to calculate sales for the day.
const todaySales = computed(() => todayOrders.value.reduce((sum, order) => sum + order.total, 0))
// Count all orders that still need staff attention.
const pendingCount = computed(() => store.orders.filter(order => order.status === 'pending').length)
// Show the five latest orders and students in the overview tables.
const recentOrders = computed(() => store.orders.slice(0, 5))

// Newest first: students who just registered appear at the top, then the seeded ones.
const newestStudents = computed(() => [...auth.students].reverse().slice(0, 5))
</script>
