---
layout: page
sidebar: false
---

<script setup>
import tableCode from './snippets/table.py?raw'
import dashboardCode from './snippets/dashboard.py?raw'
import actionsCode from './snippets/actions.py?raw'

const actionSlides = [
  { image: '/change-password.png', title: 'Custom form dialog' },
  { image: '/action-persistent.png', title: 'Persistent response message' },
]
</script>

<HeroSection
name="Brilliance Admin"
text="Data Management Framework"
tagline="Simple and lightweight, powered by FastAPI and Vue3 Vuetify all-in-one. Integrated with SQLAlchemy. Inspired by Django Admin and DRF. <em>Some call it heavenly in its brilliance.</em>"
image="/all-devices-black.png"
image-alt="Brilliance Admin Preview"
>
<a class="brand" href="/how-to-start/">How to Start</a>
<a class="alt" href="https://brilliance-admin.com/" target="_blank">Live Demo</a>
<a class="alt" href="https://github.com/brilliance-admin/backend-python" target="_blank">GitHub</a>
</HeroSection>


<FeatureSection
  title="Tables with full CRUD support"
  description="Filtering, sorting, and pagination out of the box. Automatically generated from your SQLAlchemy models."
  image="/table-black.png"
>
<CodeBlock lang="python" :code="tableCode" />
</FeatureSection>

<FeatureSection
  title="Admin Actions"
  description="Easily create data actions with custom request forms. Responses can trigger toast notifications, persistent messages, or file downloads."
  :slides="actionSlides"
>
<CodeBlock lang="python" :code="actionsCode" />
</FeatureSection>

<FeatureSection
  title="Dashboards"
  description="Create unlimited data pages from any source with your layout."
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
/>

<FeatureSection
  title="Secure Authentication"
  description="Built-in login page with customizable authentication. Works with any account data source through a simple interface."
  image="/login-black.png"
/>

| Criterion | Brilliance Admin | Django Admin | FastAPI Admin | Starlette Admin | SQLAdmin |
|---------|------------------|--------------|---------------|-----------------|----------|
| Base framework | FastAPI | Django | FastAPI | Starlette | FastAPI |
| ASGI compatible | Yes | Partial | Yes | Yes | Yes |
| Rendering model | Prebuilt Vue 3 + Vuetify SPA + Jinja2 | Server-side Django templates | Server-side Jinja2 templates + Tabler UI | Server-side Jinja2 templates + Tabler UI | Server-side Jinja2 templates + Bootstrap |
| Frontend architecture | Separate frontend (SPA) | Classic server-rendered UI | Server-rendered UI with JS interactivity | Server-rendered UI with JS interactivity | Server-rendered UI |
| Data source | Any source + SQLAlchemy | Django ORM | Tortoise ORM | Any source + SQLAlchemy, MongoDB | SQLAlchemy |
| Multiple databases per model | Yes | Database routers | No (global engine) | Yes (session per ModelView) | No (single engine per Admin) |
| Schema generation | User-defined format | From Django models | From ORM models | User-defined format | From SQLAlchemy models |
| Async support | Yes | No | Yes | Yes | Yes |
| API-first approach | Yes | No | Partially | Partially | No |
| Built-in Localization | Yes | Yes | No | No | No |
