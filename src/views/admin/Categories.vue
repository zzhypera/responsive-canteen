<template>
  <section class="categories-page">
    <div class="admin-heading">
      <div><span class="eyebrow">MENU ORGANIZATION</span><h1>Categories</h1><p class="muted">Organize the food and drinks shown on your menu.</p></div>
      <button class="btn btn-primary" @click="openAdd">+ Add category</button>
    </div>

    <form v-if="formOpen" class="admin-form category-editor" @submit.prevent="saveCategory">
      <h2>{{ editingName ? 'Edit category' : 'Add category' }}</h2>
      <label>Category name<input ref="nameInput" v-model.trim="draftName" maxlength="40" required placeholder="e.g. Breakfast" /></label>
      <p v-if="error" class="field-error">{{ error }}</p>
      <div class="form-actions"><button type="button" class="btn btn-light" @click="closeForm">Cancel</button><button class="btn btn-primary" type="submit">{{ editingName ? 'Save changes' : 'Create category' }}</button></div>
    </form>

    <div class="category-admin-grid">
      <article v-for="category in categories" :key="category" class="category-admin-card">
        <span class="category-icon">◇</span><h3>{{ category }}</h3>
        <p>{{ products.products.filter(p => p.category === category).length }} products</p>
        <div class="form-actions category-actions"><button class="btn btn-light" @click="openEdit(category)">Edit</button><button class="btn btn-light" @click="deleteCategory(category)">Delete</button></div>
      </article>
      <p v-if="!categories.length" class="muted">No categories yet. Add one to organize your menu.</p>
    </div>
  </section>
</template>

<script setup>
import { ref, watch, nextTick, computed } from 'vue'
import { useProductsStore } from '../../stores/products'
import { useToast } from '../../composables/useToast'
const products = useProductsStore()
const { show } = useToast()
const categories = computed(() => products.categoryNames)
const draftKey = 'canteen_category_form_draft'
let savedDraft = null
try { savedDraft = JSON.parse(localStorage.getItem(draftKey) || 'null') } catch {}
const formOpen = ref(!!savedDraft?.formOpen), draftName = ref(savedDraft?.draftName || ''), editingName = ref(savedDraft?.editingName || ''), error = ref(''), nameInput = ref(null)
// Save the category editor state immediately, including an unfinished name and edit mode.
watch([formOpen, draftName, editingName], () => {
  try { localStorage.setItem(draftKey, JSON.stringify({ formOpen: formOpen.value, draftName: draftName.value, editingName: editingName.value })) } catch {}
}, { flush: 'sync' })
function openAdd() { editingName.value = ''; draftName.value = ''; error.value = ''; formOpen.value = true; nextTick(() => nameInput.value?.focus()) }
function openEdit(name) { editingName.value = name; draftName.value = name; error.value = ''; formOpen.value = true; nextTick(() => nameInput.value?.focus()) }
function closeForm() { formOpen.value = false; draftName.value = ''; editingName.value = ''; error.value = ''; try { localStorage.removeItem(draftKey) } catch {} }
function saveCategory() {
 const name = draftName.value.trim(); if (!name) { error.value = 'Enter a category name.'; return }
 if (categories.value.some(c => c.toLowerCase() === name.toLowerCase() && c !== editingName.value)) { error.value = 'That category already exists.'; return }
 if (editingName.value) { const old = editingName.value; const index = categories.value.indexOf(old); if (index >= 0) categories.value[index] = name; products.products.forEach(p => { if (p.category === old) p.category = name }) ; show('Category updated') }
 else { categories.value.push(name); show('Category added') }
 closeForm()
}
function deleteCategory(name) {
 if (!window.confirm(`Delete “${name}”? Products in this category will be moved to “Meals”.`)) return
 const index = categories.value.indexOf(name); if (index >= 0) categories.value.splice(index, 1)
 products.products.forEach(p => { if (p.category === name) p.category = categories.value.includes('Meals') && name !== 'Meals' ? 'Meals' : (categories.value[0] || 'Uncategorized') })
 if (!categories.value.length) categories.value.push('Meals')
 show('Category deleted')
}
</script>
