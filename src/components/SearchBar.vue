<template>
  <div class="search-box">
    <span>⌕</span>
    <input
      v-model="text"
      placeholder="Search food..."
      @input="emitSearch(text)"
    />
  </div>
</template>

<script setup>
import { onBeforeUnmount, ref, watch } from 'vue'
import { debounce } from '../composables/useDebounce'

const props = defineProps({
  modelValue: { type: String, default: '' },
  delay: { type: Number, default: 300 }
})
const emit = defineEmits(['update:modelValue'])

const text = ref(props.modelValue)

// Limiting events: the parent is told only after the user pauses typing.
const emitSearch = debounce(value => emit('update:modelValue', value), props.delay)
onBeforeUnmount(() => emitSearch.cancel())

// Keep the box in sync if the parent changes the value (e.g. from the URL)
watch(() => props.modelValue, value => {
  if (value !== text.value) text.value = value
})
</script>
