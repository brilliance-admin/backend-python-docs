import { defineConfig } from 'vitepress'

const nav = {
  en: [
    { text: 'Documentation', link: '/how-to-start' },
    { text: 'Live Demo', link: 'https://brilliance-admin.com/' },
  ],
  ru: [
    { text: 'Документация', link: '/ru/how-to-start' },
    { text: 'Live Demo', link: 'https://brilliance-admin.com/' },
  ],
}

const sidebar = {
  en: [
    {
      text: 'Getting Started',
      items: [
        { text: 'Overview', link: '/' },
        { text: 'How to Start', link: '/how-to-start' },
        { text: 'Authentication', link: '/authentication' },
        { text: 'Translations', link: '/translations' },
      ],
    },
    {
      text: 'Admin Schema',
      items: [
        { text: 'Main / Group / Category', link: '/admin-schema/main' },
        { text: 'Tables', link: '/admin-schema/tables' },
        { text: 'Graphs', link: '/admin-schema/graphs' },
      ],
    },
    {
      text: 'Integrations',
      items: [
        { text: 'SQLAlchemy', link: '/integration/sqlalchemy/' },
      ],
    },
  ],
}

export default defineConfig({
  srcDir: 'docs',

  title: 'Brilliance Admin',
  description: ' ',

  head: [
    [
      'script',
      { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX' }
    ],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-XXXXXXXXXX');`
    ],
  ],

  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag === 'img-comparison-slider',
      },
    },
  },

  locales: {
    root: {
      label: 'English',
      lang: 'en',
      themeConfig: {
        nav: nav.en,
        sidebar: sidebar.en,
      },
    },
  },

  themeConfig: {
    socialLinks: [
      { icon: 'github', link: 'https://github.com/brilliance-admin/backend-python' },
    ],
  },
})
