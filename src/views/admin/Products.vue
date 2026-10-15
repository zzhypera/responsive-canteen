<template>
  <div>
    <!-- Page title and shortcut for creating a new menu item. -->
    <div class="admin-heading">
      <div><span class="eyebrow">MENU MANAGEMENT</span><h1>Products</h1></div>
      <RouterLink to="/admin/products/create" class="btn btn-primary">+ Add product</RouterLink>
    </div>

    <!-- List products with their category, price, availability, and actions. -->
    <div class="admin-panel">
      <div class="table-wrap">
        <table>
          <thead><tr><th>Product</th><th>Category</th><th>Price</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            <!-- Render one table row for each product in the store. -->
            <tr v-for="product in products.products" :key="product.id">
              <td data-label="Product"><div class="table-product"><img :src="product.image" /><span>{{ product.name }}</span></div></td>
              <td data-label="Category">{{ product.category }}</td>
              <td data-label="Price">₱{{ product.price }}</td>
              <td data-label="Status"><span class="status-pill completed">{{ product.available ? 'Available' : 'Sold out' }}</span></td>
              <td data-label="Actions"><div class="table-actions">
                <RouterLink :to="`/admin/products/${product.id}/edit`">Edit</RouterLink>
                <button @click="remove(product.id)">Delete</button>
              </div></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useProductsStore } from '../../stores/products'
const products = useProductsStore()

// Ask for confirmation before removing a product from the menu.
function remove(id) {
  if (confirm('Delete this product?')) products.deleteProduct(id)
}
</script>
