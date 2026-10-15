<template>
  <div class="category-list">
    <button
      v-for="category in categories"
      :key="category"
      :class="{ active: model === category }"
      @click="model = category"
    >
      {{ category }}
    </button>
  </div>
</template>

<script setup>
// defineModel (Vue 3.4+) is the short way to write the modelValue prop + update:modelValue emit.
const model = defineModel({ type: String, default: 'All' })

defineProps({
  categories: { type: Array, default: () => [] }
})
</script>
