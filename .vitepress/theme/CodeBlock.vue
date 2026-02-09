<script setup>
import { ref, onMounted, useSlots } from 'vue'

const props = defineProps({
  code: { type: String, default: '' },
  lang: { type: String, required: true },
})

const slots = useSlots()
const html = ref('')

onMounted(async () => {
  const { codeToHtml } = await import('shiki')
  let source = props.code
  if (!source && slots.default) {
    source = slots.default()[0]?.children || ''
  }
  html.value = await codeToHtml(source.trim(), {
    lang: props.lang,
    themes: {
      light: 'github-light',
      dark: 'github-dark',
    },
    defaultColor: false,
  })
})
</script>

<template>
  <div class="vp-code-block" v-html="html" />
</template>

<style>
 .vp-code-block pre {
     background: var(--vp-c-bg-alt);
     border-radius: 8px;
     padding: 16px;
     overflow-x: auto;
     font-size: 13px;
     line-height: 1;
     margin-top: 16px;
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
