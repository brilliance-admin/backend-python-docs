<script setup>
defineProps({
  headers: { type: Array, required: true },
  rows: { type: Array, required: true },
  highlight: { type: Number, default: 1 },
})
</script>

<template>
  <section class="comparison-section section-container">
    <div class="comparison-card">
      <slot />
      <div class="comparison-scroll">
        <table class="comparison-table">
          <thead>
            <tr>
              <th v-for="(h, i) in headers" :key="i" :class="{ highlighted: i === highlight }">{{ h }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, ri) in rows" :key="ri">
              <td v-for="(cell, ci) in row" :key="ci" :class="{ highlighted: ci === highlight, criterion: ci === 0 }">{{ cell }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<style>
.comparison-section {
  margin-top: 48px;
  margin-bottom: 48px;
}

.comparison-card {
  background: var(--vp-c-bg-soft);
  border-radius: 16px;
  padding: 48px;
}

.comparison-scroll {
  overflow-x: auto;
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  line-height: 1.5;
}

.comparison-table th,
.comparison-table td {
  padding: 10px 14px;
  text-align: left;
  border-bottom: 1px solid var(--vp-c-divider);
  white-space: nowrap;
}

.comparison-table th {
  font-weight: 700;
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.comparison-table td.criterion {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.comparison-table .highlighted {
  background: color-mix(in srgb, var(--vp-c-brand-1) 10%, transparent);
  color: var(--vp-c-brand-1);
  font-weight: 700;
}

.comparison-table thead .highlighted {
  color: var(--vp-c-brand-1);
}

@media (max-width: 768px) {
  .comparison-card {
    padding: 16px;
  }

  .comparison-table th,
  .comparison-table td {
    font-size: 12px;
    padding: 8px 10px;
  }
}
</style>
