<template>
  <div class="toast-host" aria-live="polite">
    <div v-for="toast in toasts" :key="toast.id" class="toast">{{ toast.message }}</div>
  </div>
</template>

<script setup>
import { useToast } from '../composables/useToast'

const { toasts } = useToast()
</script>
