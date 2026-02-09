<script setup>
defineProps({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  image: { type: String, default: '' },
  imageAlt: { type: String, default: '' },
})
</script>

<template>
  <div class="feature-grid-card">
    <h2>{{ title }}</h2>
    <p v-if="description">{{ description }}</p>
    <slot />
    <div v-if="image" class="grid-card-image">
      <img :src="image" :alt="imageAlt || title" />
    </div>
  </div>
</template>
