<template>
  <article class="food-card">
    <RouterLink :to="`/menu/${product.id}`" class="food-image-wrap">
      <img :src="product.image" :alt="product.name" class="food-image" />
      <span v-if="!product.available" class="sold-out">Sold out</span>
    </RouterLink>

    <button
      type="button"
      class="fav-button"
      :class="{ active: favorite }"
      :aria-pressed="favorite"
      :aria-label="favorite ? 'Remove from favorites' : 'Add to favorites'"
      @click="$emit('toggle-favorite', product)"
    >{{ favorite ? '♥' : '♡' }}</button>

    <div class="food-card-body">
      <div class="food-category">{{ product.category }}</div>
      <RouterLink :to="`/menu/${product.id}`" class="food-name">{{ product.name }}</RouterLink>
      <p>{{ product.description }}</p>

      <div class="food-bottom">
        <span class="price">₱{{ product.price }}</span>
        <button class="add-button" :disabled="!product.available" @click="$emit('add', product)">
          {{ product.available ? '+ Add' : 'Unavailable' }}
        </button>
      </div>
    </div>
  </article>
</template>

<script setup>
// Parent -> child: data comes in through props.
// Child -> parent: the card never touches the cart itself, it only emits events.
defineProps({
  product: { type: Object, required: true },
  favorite: { type: Boolean, default: false }
})

defineEmits(['add', 'toggle-favorite'])
</script>
