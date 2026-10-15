import { computed } from 'vue'
import { defineStore } from 'pinia'
import { products as initialProducts } from '../data/products'
import { useLocalStorage } from '../composables/useLocalStorage'

export const useProductsStore = defineStore('products', () => {
  // Admin changes to the menu now survive a page refresh
  const products = useLocalStorage('canteen_products', [...initialProducts])
  const categoryNames = useLocalStorage('canteen_categories', ['Breakfast', 'Meals', 'Snacks', 'Drinks', 'Desserts'])

  // Refresh seeded product images so older saved catalogs use the local assets too.
  products.value = products.value.map(product => {
    const seededProduct = initialProducts.find(item => item.id === product.id)
    return seededProduct ? { ...product, image: seededProduct.image } : product
  })

  const categories = computed(() => ['All', ...new Set([...categoryNames.value, ...products.value.map(p => p.category).filter(Boolean)])])

  function getProduct(id) {
    return products.value.find(product => product.id === Number(id))
  }

  function addProduct(product) {
    products.value.push({ ...product, id: Date.now() })
  }

  function updateProduct(id, product) {
    const index = products.value.findIndex(p => p.id === Number(id))
    if (index !== -1) products.value[index] = { ...products.value[index], ...product }
  }

  function deleteProduct(id) {
    products.value = products.value.filter(p => p.id !== Number(id))
  }

  return { products, categoryNames, categories, getProduct, addProduct, updateProduct, deleteProduct }
})
