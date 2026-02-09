<template>
  <section class="feature-grid section-container">
    <div class="feature-grid-row">
      <slot />
    </div>
  </section>
</template>

<style>
 .feature-grid {
     margin-top: 48px;
     margin-bottom: 48px;
 }

 .feature-grid-row {
     display: grid;
     grid-template-columns: repeat(2, 1fr);
     gap: 24px;
 }

 .feature-grid .feature-grid-card {
     background: var(--vp-c-bg-soft);
     border-radius: 16px;
     padding: 32px;
     display: flex;
     flex-direction: column;
 }

 .feature-grid .feature-grid-card h2 {
     font-size: 28px;
     font-weight: 700;
     line-height: 1.3;
     margin: 0 0 16px;
 }

 .feature-grid .feature-grid-card p {
     font-size: 15px;
     line-height: 1.7;
     color: var(--vp-c-text-2);
     margin: 0 0 20px;
 }

 .feature-grid .feature-grid-card .grid-card-image {
     margin-top: auto;
     border-radius: 12px;
     overflow: hidden;
     box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
 }

 .feature-grid .feature-grid-card .grid-card-image img {
     width: 100%;
     display: block;
 }

 @media (max-width: 768px) {
     .feature-grid-row {
         grid-template-columns: 1fr;
     }

     .feature-grid .feature-grid-card {
         padding: 24px;
     }
 }
 .feature-grid .feature-grid-card {
     background: var(--vp-c-bg-soft);
     border-radius: 16px;
     padding: 32px;
     display: flex;
     flex-direction: column;
     color: var(--vp-c-text-2);
 }

 .feature-grid .feature-grid-card h2 {
     font-size: 28px;
     font-weight: 700;
     line-height: 1.3;
     margin: 0 0 16px;
     color: var(--vp-c-text-1);
 }
</style>
