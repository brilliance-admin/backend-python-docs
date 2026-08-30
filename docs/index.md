---
layout: page
sidebar: false
---

<script setup>
import tableCode from './snippets/table.py?raw'
import dashboardCode from './snippets/dashboard.py?raw'
import actionsCode from './snippets/actions.py?raw'
import adminExampleCode from './snippets/adminExample.py?raw'
import subcategorisCode from './snippets/subcategorisCode.py?raw'

const actionSlides = [
  { image: '/change-password.png', title: 'Custom form dialog' },
  { image: '/action-persistent.png', title: 'Persistent response message' },
]
const tableFeatureSlides = [
  { image: '/inline-dispute.png', title: 'Inline records' },
  { image: '/subcategory-table.png', title: 'Table subcategories' },
  { image: '/subcategory-dashboard.png', title: 'Dashboard subcategories' },
]
const compHeaders = ['Criterion', 'Brilliance Admin', 'Django Admin', 'FastAPI Admin', 'Starlette Admin', 'SQLAdmin']
const compRows = [
  ['Base framework', 'FastAPI', 'Django', 'FastAPI', 'Starlette', 'FastAPI'],
  ['ASGI compatible', 'Yes', 'Partial', 'Yes', 'Yes', 'Yes'],
  ['Rendering model', 'Prebuilt Vue 3 + Vuetify SPA + Jinja2', 'Server-side Django templates', 'Server-side Jinja2 templates + Tabler UI', 'Server-side Jinja2 templates + Tabler UI', 'Server-side Jinja2 templates + Bootstrap'],
  ['Frontend architecture', 'Separate frontend (SPA)', 'Classic server-rendered UI', 'Server-rendered UI with JS interactivity', 'Server-rendered UI with JS interactivity', 'Server-rendered UI'],
  ['Data source', 'Any source + SQLAlchemy/Django ORM', 'Django ORM', 'Tortoise ORM', 'Any source + SQLAlchemy, MongoDB', 'SQLAlchemy'],
  ['Multiple databases per model', 'Yes', 'Database routers', 'No (global engine)', 'Yes (session per ModelView)', 'No (single engine per Admin)'],
  ['Schema generation', 'User-defined format', 'From Django models', 'From ORM models', 'User-defined format', 'From SQLAlchemy models'],
  ['Async support', 'Yes', 'No', 'Yes', 'Yes', 'Yes'],
  ['API-first approach', 'Yes', 'No', 'Partially', 'Partially', 'No'],
  ['Built-in Localization', 'Yes', 'Yes', 'No', 'No', 'No'],
]
</script>

<HeroSection
  name="Brilliance Admin"
  text="Data Management Framework"
  tagline="Simple and lightweight, powered by Python and Vue3 Vuetify all-in-one. Integrated with SQLAlchemy and Django ORM.
  <em>Some call it heavenly in its brilliance.</em>"
  image="/all-devices-black.png"
  image-alt="Brilliance Admin Preview"
>
  <a class="brand" href="/how-to-start/">How to Start</a>
  <a class="alt" href="https://brilliance-admin.com/" target="_blank">Live Demo</a>
  <a class="alt" href="https://github.com/brilliance-admin/backend-python" target="_blank">GitHub</a>
  <p class="hero-remark">Every ⭐ on GitHub - helps to make it even more brilliant!</p>
  
  <p class="hero-remark">Not production ready, work in progress.</p>

</HeroSection>

<FeatureSection
  title="Access all your data from any source"
  description="Filtering, sorting, and pagination out of the box. Auto-generated from your SQLAlchemy/Django models, or defined manually from any data source."
  image="/table-black.png"
>
  <CodeBlock lang="python" :code="tableCode" />
</FeatureSection>

<FeatureSection
  title="Subcategories and inlines"
  description="For convenience, sections and forms can be nested. Dashboards can be nested as well."
  :slides="tableFeatureSlides"
  reversed
>
  <CodeBlock lang="python" :code="subcategorisCode" />
</FeatureSection>

<FeatureGrid>
  <FeatureGridCard
    title="Easy Installation"
  ><br>
  Integrates with any ASGI-compatible server.
  <CodeBlock lang="shell" code="pip install brilliance-admin" />
  <CodeBlock lang="python" :code="adminExampleCode" />
  </FeatureGridCard>
  
  <FeatureGridCard
    title="Authentication Providers and i18n"
    image="/login-black.png"
  >
  Simple login and password interface.<br>
  Built-in Django and SQLAlchemy integrations, but you can use your own data source.<br>
  </FeatureGridCard>
</FeatureGrid>

<FeatureSection
  title="Admin Actions"
  description="Easily create data actions with custom forms. Display the result in the format that works best for you - as a notification, HTML form, or file downloading."
  :slides="actionSlides"
>
  <CodeBlock lang="python" :code="actionsCode" />
</FeatureSection>

<FeatureSection
  title="Dashboards"
  description="Create as many dashboard pages as you need, each with its own layout and data source."
  image="/dashboard-black.png"
  reversed
>
  <CodeBlock lang="python" :code="dashboardCode" />
</FeatureSection>

<ShowcaseSection
  title="Customizable color schemes"
  description="Fully customizable color schemes. Switch between them instantly in the interface."
  image-before="/dashboard-white.png"
  image-after="/dashboard-black.png"
></ShowcaseSection>

<comparison-table :headers="compHeaders" :rows="compRows" :highlight="1">
<template #header>

## Comparison of Similar Projects

<div class="subtitle">
<p>The project closest in concept is <a href="https://github.com/marmelab/react-admin" target="_blank">React Admin</a> - SPA frontend that stores the schema UI inside and works with separate API backend providers.</p>

The key difference of Brilliance Admin is that it's all-in-one. <br>
Brilliance Admin is more focused on rapid setup for data management, without the need to work with frontend configuration, while it's still available.

## Python Projects

</div>
</template>
</comparison-table>
