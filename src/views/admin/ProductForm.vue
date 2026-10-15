<template>
  <div>
    <!-- Heading changes to show whether the form is adding or editing a product. -->
    <div class="admin-heading">
      <div><span class="eyebrow">MENU MANAGEMENT</span><h1>{{ editing ? 'Edit product' : 'Add product' }}</h1></div>
      <RouterLink to="/admin/products" class="back-link">← Products</RouterLink>
    </div>

    <!-- Product details are bound to form state and validated before saving. -->
    <form class="admin-form" novalidate @submit.prevent="handleSubmit">
      <label>Product name<input v-model="values.name" @blur="validateField('name')" />
        <small v-if="errors.name" class="field-error">{{ errors.name }}</small>
      </label>
      <label>Description<textarea v-model="values.description" rows="4"></textarea></label>

      <!-- Keep price and category together as related menu details. -->
      <div class="form-two">
        <label>Price<input v-model.number="values.price" type="number" min="0" @blur="validateField('price')" />
          <small v-if="errors.price" class="field-error">{{ errors.price }}</small>
        </label>
        <label>Category<select v-model="values.category"><option v-for="category in categories" :key="category" :value="category">{{ category }}</option></select></label>
      </div>

      <label>Image URL<input v-model="values.image" type="url" placeholder="https://..." /></label>

      <!-- Toggle whether customers can currently order this product. -->
      <label class="checkbox-option">
        <input v-model="values.available" type="checkbox" />
        Product is available
      </label>

      <p v-if="submitError" class="error-message">{{ submitError }}</p>

      <!-- Cancel returns to the list; save submits the validated form. -->
      <div class="form-actions">
        <RouterLink to="/admin/products" class="btn btn-light">Cancel</RouterLink>
        <button class="btn btn-primary" :disabled="submitting">Save product</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useProductsStore } from '../../stores/products'
import { minValue, required, useForm } from '../../composables/useForm'
import { useToast } from '../../composables/useToast'
import { useLocalStorage } from '../../composables/useLocalStorage'

// `id` only exists on the edit route (props: true in router/index.js)
const props = defineProps({ id: { type: String, default: '' } })

const router = useRouter()
const store = useProductsStore()
const { show } = useToast()

// Use the route ID to decide whether this form edits an existing product.
const editing = computed(() => !!props.id)
const existing = editing.value ? store.getProduct(props.id) : null
const draftKey = `canteen_product_draft_${props.id || 'new'}`
let restoredDraft = null
try { restoredDraft = JSON.parse(localStorage.getItem(draftKey) || 'null') } catch { restoredDraft = null }

// These options populate the category selector in the form.
const categories = computed(() => store.categoryNames)

// Set up form values, validation, and the save action for add/edit flows.
const { values, errors, submitError, submitting, validateField, handleSubmit } = useForm({
  initial: restoredDraft || (existing ? { ...existing } : {
    name: '', description: '', price: 0, category: 'Meals',
    image: '', available: true
  }),
  rules: {
    name: [required('Product name is required.')],
    price: [minValue(1, 'Price must be at least 1.')]
  },
  // Store the changes, show a confirmation, then return to the product list.
  onSubmit: values => {
    if (editing.value) store.updateProduct(props.id, values)
    else store.addProduct(values)
    try { localStorage.removeItem(draftKey) } catch {}
    show(editing.value ? 'Product updated' : 'Product added')
    router.push('/admin/products')
  }
})

// Persist every keystroke synchronously so an immediate refresh cannot lose the draft.
watch(values, value => {
  try { localStorage.setItem(draftKey, JSON.stringify(value)) } catch {}
}, { deep: true, flush: 'sync' })
</script>
