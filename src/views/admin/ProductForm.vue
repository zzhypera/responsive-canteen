<template>
  <div>
    <div class="admin-heading">
      <div><span class="eyebrow">MENU MANAGEMENT</span><h1>{{ editing ? 'Edit product' : 'Add product' }}</h1></div>
      <RouterLink to="/admin/products" class="back-link">← Products</RouterLink>
    </div>

    <form class="admin-form" novalidate @submit.prevent="handleSubmit">
      <label>Product name<input v-model="values.name" @blur="validateField('name')" />
        <small v-if="errors.name" class="field-error">{{ errors.name }}</small>
      </label>
      <label>Description<textarea v-model="values.description" rows="4"></textarea></label>

      <div class="form-two">
        <label>Price<input v-model.number="values.price" type="number" min="0" @blur="validateField('price')" />
          <small v-if="errors.price" class="field-error">{{ errors.price }}</small>
        </label>
        <label>Category<select v-model="values.category"><option v-for="category in categories" :key="category">{{ category }}</option></select></label>
      </div>

      <label>Image URL<input v-model="values.image" type="url" placeholder="https://..." /></label>

      <label class="checkbox-option">
        <input v-model="values.available" type="checkbox" />
        Product is available
      </label>

      <p v-if="submitError" class="error-message">{{ submitError }}</p>

      <div class="form-actions">
        <RouterLink to="/admin/products" class="btn btn-light">Cancel</RouterLink>
        <button class="btn btn-primary" :disabled="submitting">Save product</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProductsStore } from '../../stores/products'
import { minValue, required, useForm } from '../../composables/useForm'
import { useToast } from '../../composables/useToast'

// `id` only exists on the edit route (props: true in router/index.js)
const props = defineProps({ id: { type: String, default: '' } })

const router = useRouter()
const store = useProductsStore()
const { show } = useToast()
const editing = computed(() => !!props.id)
const existing = editing.value ? store.getProduct(props.id) : null

const categories = ['Breakfast', 'Meals', 'Snacks', 'Drinks', 'Desserts']

const { values, errors, submitError, submitting, validateField, handleSubmit } = useForm({
  initial: existing ? { ...existing } : {
    name: '', description: '', price: 0, category: 'Meals',
    image: '', available: true
  },
  rules: {
    name: [required('Product name is required.')],
    price: [minValue(1, 'Price must be at least 1.')]
  },
  onSubmit: values => {
    if (editing.value) store.updateProduct(props.id, values)
    else store.addProduct(values)
    show(editing.value ? 'Product updated' : 'Product added')
    router.push('/admin/products')
  }
})
</script>