import DefaultTheme from 'vitepress/theme'
import FeatureSection from './FeatureSection.vue'
import HeroSection from './HeroSection.vue'
import ShowcaseSection from './ShowcaseSection.vue'
import VueCompareImage from 'vue3-compare-image'
import CodeBlock from './CodeBlock.vue'
import ComparisonTable from './ComparisonTable.vue'
import FeatureGrid from './FeatureGrid.vue'
import FeatureGridCard from './FeatureGridCard.vue'

import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(VueCompareImage)
    app.component('FeatureSection', FeatureSection)
    app.component('HeroSection', HeroSection)
    app.component('ShowcaseSection', ShowcaseSection)
    app.component('CodeBlock', CodeBlock)
    app.component('comparison-table', ComparisonTable)
    app.component('FeatureGrid', FeatureGrid)
    app.component('FeatureGridCard', FeatureGridCard)
  },
}
