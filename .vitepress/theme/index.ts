import DefaultTheme from 'vitepress/theme'
import FeatureSection from './FeatureSection.vue'
import HeroSection from './HeroSection.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('FeatureSection', FeatureSection)
    app.component('HeroSection', HeroSection)
  }
}
