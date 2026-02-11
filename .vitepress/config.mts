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
      text: 'Admin Configs',
      items: [
        { text: 'Main AdminSchema', link: '/admin-schema/main' },
        { text: 'Tables', link: '/admin-schema/tables' },
        { text: 'Table Actions', link: '/admin-schema/table_actions' },
        { text: 'Dashboard', link: '/admin-schema/dashboard' },
        { text: 'Category Link', link: '/admin-schema/category_link' },
      ],
    },
    {
      text: 'Fields Schema',
      items: [
        { text: 'FieldsSchema', link: '/fields_schema/fields_schema' },
        { text: 'Fields', link: '/fields_schema/table_fields' },
        { text: 'Autocomplete', link: '/autocomplete' },
      ],
    },
    {
      text: 'SQLAlchemy Integration',
      items: [
        { text: 'Authentication', link: '/integrations/sqlalchemy/authentication' },
        { text: 'Tables', link: '/integrations/sqlalchemy/tables' },
        { text: 'Fields', link: '/integrations/sqlalchemy/fields' },
      ],
    },
    {
      text: 'Customization',
      items: [
        { text: 'Main', link: '/customization/main' },
        { text: 'Colors', link: '/customization/colors' },
      ],
    },
  ],
}
export default defineConfig({
  srcDir: 'docs',
  title: 'Brilliance Admin',
  description: ' ',
  head: [
    ['link', { rel: 'icon', href: '/favicon.jpg' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap' }],
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
gtag('config', 'G-C2HD1DF49V');`
    ],
  ],
  markdown: {
    theme: {
      light: 'github-light',
      dark: {
        name: 'brilliant-dark',
        settings: [
          {
            scope: ['keyword', 'keyword.control', 'storage.type', 'storage.modifier'],
            settings: { foreground: '#FF79C6' }
          },
          {
            scope: ['string', 'string.quoted.single', 'string.quoted.double', 'string.quoted.docstring'],
            settings: { foreground: '#50FA7B' }
          },
          {
            scope: ['entity.name.function', 'support.function', 'meta.function-call.generic'],
            settings: { foreground: '#61AFEF' }
          },
          {
            scope: ['entity.name.type', 'entity.name.class', 'support.class', 'entity.other.inherited-class'],
            settings: { foreground: '#E5C07B' }
          },
          {
            scope: ['variable', 'variable.parameter', 'variable.other'],
            settings: { foreground: '#F8F8F2' }
          },
          {
            scope: ['comment', 'comment.line', 'comment.block'],
            settings: { foreground: '#6272A4', fontStyle: 'italic' }
          },
          {
            scope: ['constant', 'constant.numeric', 'constant.language'],
            settings: { foreground: '#BD93F9' }
          },
          {
            scope: ['punctuation', 'meta.brace', 'punctuation.definition.parameters'],
            settings: { foreground: '#F8F8F2' }
          },
          {
            scope: ['keyword.operator', 'keyword.operator.assignment'],
            settings: { foreground: '#FF79C6' }
          },
          {
            scope: ['source.python'],
            settings: { foreground: '#F8F8F2' }
          },
          {
            scope: ['meta.function-call.arguments'],
            settings: { foreground: '#F8F8F2' }
          },
          {
            scope: ['variable.parameter.function.keyword'],
            settings: { foreground: '#FFB86C' }
          },
        ],
        fg: '#F8F8F2',
        bg: '#1A1B26',
        type: 'dark',
      }
    }
  },
  vite: {
    ssr: {
      noExternal: ['vue3-compare-image'],
    },
  },
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
    outline: {
      level: [1, 2, 3],
    },
  },
})
