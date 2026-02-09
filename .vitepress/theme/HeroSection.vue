<script setup>
defineProps({
  name: { type: String, required: true },
  text: { type: String, required: true },
  tagline: { type: String, required: true },
  image: { type: String, required: true },
  imageAlt: { type: String, required: true },
})
</script>

<template>
  <div class="custom-hero section-container">
    <div class="hero-content">
      <h1 class="hero-name">{{ name }}</h1>
      <p class="hero-text">{{ text }}</p>
      <p class="hero-tagline" v-html="tagline" />
      <div class="hero-actions">
        <slot />
      </div>
    </div>
    <div class="hero-image">
      <img :src="image" :alt="imageAlt" />
    </div>
  </div>
</template>

<style>
 .custom-hero {
     display: flex;
     align-items: center;
     gap: 48px;
     padding-top: 32px;
     padding-bottom: 32px;
 }

 .hero-content {
     flex: 1;
     min-width: 250px;
 }

 .hero-name {
     font-size: 56px;
     font-weight: 800;
     line-height: 1.1;
     background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-2, var(--vp-c-brand-1)));
     -webkit-background-clip: text;
     -webkit-text-fill-color: transparent;
     margin: 0 0 4px;
 }

 .hero-text {
     font-size: 25px;
     font-weight: 700;
     line-height: 1.15;
     color: var(--vp-c-text-1);
     margin: 0 0 12px;
 }

 .hero-remark {
     font-size: 14px;
     color: var(--vp-c-text-3);
     margin-top: 12px;
 }
 
 .hero-tagline {
     font-size: 15px;
     line-height: 1.6;
     color: var(--vp-c-text-2);
     margin: 0 0 20px;
 }

 .hero-actions {
     display: flex;
     gap: 12px;
     flex-wrap: wrap;
 }

 .hero-actions a {
     display: inline-block;
     padding: 10px 24px;
     border-radius: 20px;
     font-size: 14px;
     font-weight: 600;
     text-decoration: none;
     transition: opacity 0.2s;
 }

 .hero-actions a:hover {
     opacity: 0.85;
 }

 .hero-actions a.brand {
     background: var(--vp-c-brand-1);
     color: var(--vp-c-white, #fff);
 }

 .hero-actions a.alt {
     border: 1px solid var(--vp-c-divider);
     color: var(--vp-c-text-1);
 }

 .hero-image {
     flex: 2;
     min-width: 0;
 }

 .hero-image img {
     width: 100%;
     height: auto;
     display: block;
 }

 @media (max-width: 768px) {
     .custom-hero {
         flex-direction: column;
         padding-top: 24px;
     }

     .hero-name {
         font-size: 36px;
     }

     .hero-text {
         font-size: 28px;
     }
 }
</style>
