<script setup>
defineProps({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  image: { type: String, required: true },
  imageAlt: { type: String, default: '' },
  reversed: { type: Boolean, default: false },
})
</script>

<template>
  <section class="feature-section section-container">
    <div class="feature-card" :class="{ reversed }">
      <div class="feature-text">
        <h2>{{ title }}</h2>
        <p v-if="description">{{ description }}</p>
        <slot />
      </div>
      <div class="feature-image">
        <img :src="image" :alt="imageAlt || title" />
      </div>
    </div>
  </section>
</template>

<style>
.feature-section {
  margin-top: 48px;
  margin-bottom: 48px;
}

.feature-card {
  display: flex;
  align-items: center;
  gap: 48px;
  background: var(--vp-c-bg-soft);
  border-radius: 16px;
  padding: 48px;
}

.feature-card.reversed {
  flex-direction: row-reverse;
}

.feature-text {
  flex: 1;
  min-width: 240px;
}

.feature-text h2 {
  font-size: 28px;
  font-weight: 700;
  line-height: 1.3;
  margin: 0 0 16px;
}

.feature-text p {
  font-size: 16px;
  line-height: 1.7;
  color: var(--vp-c-text-2);
  margin: 0;
}

.feature-image {
  flex: 2;
  min-width: 0;
}

.feature-image img {
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
}

@media (max-width: 768px) {
  .feature-card,
  .feature-card.reversed {
    flex-direction: column;
    gap: 24px;
    padding: 24px;
  }
}
</style>
