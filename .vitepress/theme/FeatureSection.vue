<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  image: { type: String, default: '' },
  slides: { type: Array, default: () => [] },
  imageAlt: { type: String, default: '' },
  reversed: { type: Boolean, default: false },
  interval: { type: Number, default: 3000 },
  textFlex: { type: Number, default: 3 },
  imageFlex: { type: Number, default: 5 },
})

const current = ref(0)
let timer = null

function resetTimer() {
  clearInterval(timer)
  if (props.slides.length <= 1) return
  timer = setInterval(() => {
    current.value = (current.value + 1) % props.slides.length
  }, props.interval)
}

function goTo(i) {
  current.value = i
  resetTimer()
}

onMounted(resetTimer)
onUnmounted(() => clearInterval(timer))
</script>

<template>
  <section class="feature-section section-container">
    <div class="feature-card" :class="{ reversed }">
      <div class="feature-text" :style="{ flex: textFlex }">
        <h2>{{ title }}</h2>
        <p v-if="description">{{ description }}</p>
        <slot />
      </div>
      <div class="feature-image" :style="{ flex: imageFlex }">
        <div v-if="slides.length" class="slider">
          <div class="slider-frame">
            <img
              v-for="(slide, i) in slides"
              :key="i"
              :src="slide.image"
              :alt="slide.title || title"
              :class="{ visible: i === current }"
            />
            <span v-if="slides[current]?.title" class="caption">{{ slides[current].title }}</span>
          </div>
          <div v-if="slides.length > 1" class="dots">
            <i
              v-for="(_, i) in slides"
              :key="i"
              :class="{ active: i === current }"
              @click="goTo(i)"
            />
          </div>
        </div>
        <img v-else-if="image" :src="image" :alt="imageAlt || title" />
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
     min-width: 240px;
     overflow: hidden;
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
     min-width: 0;
 }

 .feature-image > img {
     width: 100%;
     border-radius: 12px;
     box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
 }

 .slider-frame {
     position: relative;
     border-radius: 12px;
     overflow: hidden;
     box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
 }

 .slider-frame img {
     position: absolute;
     inset: 0;
     width: 100%;
     display: block;
     opacity: 0;
     transition: opacity 0.5s;
     pointer-events: none;
 }

 .slider-frame img:first-child {
     position: relative;
 }

 .slider-frame img.visible {
     opacity: 1;
 }

 .slider-frame .caption {
     position: absolute;
     bottom: 0;
     left: 0;
     right: 0;
     padding: 28px 0 10px;
     text-align: center;
     color: #fff;
     font-size: 13px;
     font-weight: 500;
     background: linear-gradient(transparent, rgba(0, 0, 0, 0.55));
     pointer-events: none;
     z-index: 1;
 }

 .dots {
     display: flex;
     justify-content: center;
     gap: 6px;
     margin-top: 10px;
 }

 .dots i {
     width: 8px;
     height: 8px;
     border-radius: 50%;
     background: var(--vp-c-divider);
     cursor: pointer;
     transition: background 0.2s;
 }

 .dots i.active {
     background: var(--vp-c-brand-1);
 }

 @media (max-width: 768px) {
  .feature-card,
  .feature-card.reversed {
    flex-direction: column;
    gap: 24px;
    padding: 24px;
  }
 }
 .vp-code-block {
     width: 100%;
     max-width: 100%;
     overflow-x: auto;
 }

 .vp-code-block pre {
     background: var(--vp-c-bg-alt);
     border-radius: 8px;
     padding: 16px;
     overflow-x: auto;
     font-size: 13px;
     line-height: 1;
     margin-top: 16px;
     max-width: 0;
     min-width: 100%;
 }

 .vp-code-block pre code .line {
     display: block;
 }

 .dark .vp-code-block pre span {
     color: var(--shiki-dark) !important;
 }

 html:not(.dark) .vp-code-block pre span {
     color: var(--shiki-light) !important;
 }
</style>
