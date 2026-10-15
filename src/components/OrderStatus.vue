<template>
  <div class="status-track">
    <div
      v-for="(step, index) in steps"
      :key="step.key"
      class="status-step"
      :class="{ active: currentIndex >= index }"
    >
      <div class="status-circle">{{ currentIndex > index ? '✓' : index + 1 }}</div>
      <span>{{ step.label }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  status: { type: String, default: 'pending' }
})

const steps = [
  { key: 'pending', label: 'Order received' },
  { key: 'preparing', label: 'Preparing' },
  { key: 'ready', label: 'Ready for pickup' },
  { key: 'completed', label: 'Completed' }
]

const currentIndex = computed(() => {
  const index = steps.findIndex(step => step.key === props.status)
  return index === -1 ? 0 : index
})
</script>