<template>
  <div class="cart-item">
    <img :src="item.image" :alt="item.name" />
    <div class="cart-item-info">
      <h3>{{ item.name }}</h3>
      <span>₱{{ item.price }} each</span>
    </div>
    <div class="quantity-control">
      <button @click="$emit('decrease')">−</button>
      <span>{{ item.quantity }}</span>
      <button @click="$emit('increase')">+</button>
    </div>
    <strong>₱{{ item.price * item.quantity }}</strong>
    <button class="remove-button" @click="$emit('remove')">×</button>
  </div>
</template>

<script setup>
defineProps({
  item: { type: Object, required: true }
})

defineEmits(['increase', 'decrease', 'remove'])
</script>
