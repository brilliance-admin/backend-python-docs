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
      <div class="comparison-header">
        <slot name="header" />
      </div>
      <div class="comparison-table-wrap">
        <div class="comparison-scroll">
          <table class="comparison-table">
            <thead>
              <tr>
                <th
                  v-for="(h, i) in headers"
                  :key="i"
                  :class="{ highlighted: i === highlight }"
                >{{ h }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, ri) in rows" :key="ri">
                <td
                  v-for="(cell, ci) in row"
                  :key="ci"
                  :class="{ highlighted: ci === highlight, criterion: ci === 0 }"
                >{{ cell }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="comparison-footer">
        <slot name="footer" />
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
  padding: 32px;
}

.comparison-header {
  margin: 0 0 24px;
}

.comparison-header:empty {
  display: none;
}

.comparison-header h2 {
  font-size: 28px;
  font-weight: 700;
  line-height: 1.3;
  margin: 0 0 16px;
  text-align: center;
}

.comparison-header p {
  font-size: 16px;
  line-height: 1.7;
  color: var(--vp-c-text-2);
  margin: 0 0 8px;
}

.comparison-header .subtitle {
  margin: 0 auto 24px;
  max-width: 800px;
}

.comparison-header .subtitle p {
  font-size: 15px;
  line-height: 1.4;
  color: var(--vp-c-text-2);
  margin: 0 0 8px;
}

.comparison-header .subtitle p:last-child {
  margin-bottom: 0;
}

.comparison-header .subtitle a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.comparison-header .subtitle a:hover {
  text-decoration: underline;
}

.comparison-table-wrap {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 4px;
}

.comparison-scroll {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.comparison-table {
  width: 100%;
  min-width: 800px;
  border-collapse: collapse;
  font-size: 14px;
  line-height: 1.6;
}

.comparison-table th,
.comparison-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid var(--vp-c-divider);
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.comparison-table th {
  font-weight: 700;
  font-size: 14px;
  white-space: nowrap;
}

.comparison-table td.criterion {
  font-weight: 600;
  white-space: nowrap;
}

.comparison-table .highlighted {
  background: color-mix(in srgb, var(--vp-c-brand-1) 10%, transparent);
  color: var(--vp-c-brand-1);
  font-weight: 700;
}

.comparison-table thead .highlighted {
  background: color-mix(in srgb, var(--vp-c-brand-1) 15%, transparent);
}

.comparison-table tbody tr:last-child td {
  border-bottom: none;
}

.comparison-footer:empty {
  display: none;
}

.comparison-footer {
  max-width: 720px;
  margin: 24px auto 0;
  text-align: center;
}

.comparison-footer p {
  font-size: 15px;
  line-height: 1.7;
  color: var(--vp-c-text-2);
  margin: 0 0 8px;
}

@media (max-width: 768px) {
  .comparison-card {
    padding: 16px;
  }

  .comparison-table {
    font-size: 13px;
  }

  .comparison-table th,
  .comparison-table td {
    padding: 10px 12px;
  }
}
</style>
