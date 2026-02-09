<script setup>
import { VueCompareImage } from 'vue3-compare-image'

defineProps({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  image: { type: String, default: '' },
  imageAlt: { type: String, default: '' },
  imageBefore: { type: String, default: '' },
  imageAfter: { type: String, default: '' },
})
</script>

<template>
  <section class="showcase-section section-container">
    <div class="showcase-card">
      <div class="showcase-header">
        <h2>{{ title }}</h2>
        <p v-if="description">{{ description }}</p>
        <slot />
      </div>
      <div class="showcase-image">
        <ClientOnly>
          <VueCompareImage
            v-if="imageBefore && imageAfter"
            :left-image="imageBefore"
            :right-image="imageAfter"
            :slider-line-width="2"
            slider-line-color="#64748b"
          />
        </ClientOnly>
        <img v-if="!imageBefore && !imageAfter && image" :src="image" :alt="imageAlt || title" />
      </div>
    </div>
  </section>
</template>

<style>
.showcase-section {
  margin-top: 48px;
  margin-bottom: 48px;
}

.showcase-card {
  background: var(--vp-c-bg-soft);
  border-radius: 16px;
  padding: 48px;
}

.showcase-header {
  text-align: center;
  max-width: 640px;
  margin: 0 auto 32px;
}

.showcase-header h2 {
  font-size: 28px;
  font-weight: 700;
  line-height: 1.3;
  margin: 0 0 16px;
}

.showcase-header p {
  font-size: 16px;
  line-height: 1.7;
  color: var(--vp-c-text-2);
  margin: 0;
}

.showcase-image {
  border-radius: 12px;
  overflow: hidden;
}

.showcase-image img {
  width: 100%;
  display: block;
}

@media (max-width: 768px) {
  .showcase-card {
    padding: 24px;
  }
}
</style>
