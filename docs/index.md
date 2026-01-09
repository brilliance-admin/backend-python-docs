<div align="center">
  <img src="assets/logo.png"
       style="min-height: 117px;"
       width="600">

  <p>
    <a href="https://pypi.org/project/brilliance-admin/">
      <img src="https://img.shields.io/pypi/v/brilliance-admin" alt="PyPI">
    </a>
    <a href="https://github.com/brilliance-admin/backend-python/actions">
      <img src="https://github.com/brilliance-admin/backend-python/actions/workflows/deploy.yml/badge.svg" alt="CI">
    </a>
  </p>

  <p>
    Simple and lightweight admin panel framework powered by <code>FastAPI</code> and <code>Vue3</code> <code>Vuetify</code> together.<br>
    Integrated with <code>SQLAlchemy</code>. Inspired by Django Admin and DRF.<br>
    <em>Some call it heavenly in its brilliance.</em>
  </p>

<h3>
  <a href="https://brilliance-admin.com/">Live Demo</a> |
  <a href="https://github.com/brilliance-admin/backend-python/tree/main/example">Demo Sources</a> |
  <a href="https://github.com/brilliance-admin/backend-python">Github Repo</a>
</h3>

  <img src="assets/websitemockupgenerator.png"
       style="min-height: 360px;"
       alt="Preview">

</div>

**Key ideas:**

- **API oriented** <br>
Works entirely on FastAPI and provides a prebuilt SPA [frontend](https://github.com/brilliance-admin/frontend) via static files (Vue3 + Vuetify). No separate startup is required. <br>
- **Rich visualization**  <br>
Providing rich and convenient ways to display and manage data (tables, charts, etc) from any data source.
- **ORM** <br>
Automatic schema generation and methods for CRUD operations.
- **Minimal boilerplate** <br>
Focused on simplified, but rich configuration.

> Data generation/updating API separated from rendering fontend with zero hardcode, this makes it possible to have a single frontend with multiple backend implementations in different languages and makes test coverage easier.

## Features

* Tables with full CRUD support, including filtering, sorting, and pagination.
* Ability to define custom table actions with forms, response messages, and file downloads.
* Graphs via ChartJS
* Localization support
* Adapted for different screen sizes and mobile devices
* Authorization via any account data source

**Integrations:**

* **SQLAlchemy** - schema autogeneration for tables + CRUD operations + authorization

**Planned:**

* Dashboard features
* Role-based access permissions system via interface
* Backend interface for storing and viewing action history in the admin interface
* Nested data support for creation and detail views (inline editing), nested CRUD workflows
* Django ORM integration
* Support for Oauth providers

## Comparison of Similar Projects

| Criterion | Brilliance Admin | Django Admin | FastAPI Admin | Starlette Admin | SQLAdmin |
|---------|------------------|---------------------|---------------|-----------------|----------|
| Base framework | FastAPI | Django | FastAPI | Starlette / FastAPI | FastAPI / Starlette |
| Rendering model | Prebuilt Vue 3 + Vuetify SPA + Jinja2 | Server-side Django templates | Server-side Jinja2 templates + Tabler UI | Server-side Jinja2 templates + Tabler UI | Server-side Jinja2 templates + Bootstrap |
| Frontend architecture | Separate frontend (SPA) | Classic server-rendered UI | Server-rendered UI with JS interactivity | Server-rendered UI with JS interactivity | Server-rendered UI |
| Data source | Any source + SQLAlchemy | Django ORM | Tortoise ORM | Any source + SQLAlchemy, MongoDB | SQLAlchemy |
| Multiple databases per model | Yes | Database routers | No (global engine) | Yes (session per ModelView) | No (single engine per Admin) |
| Schema generation | User-defined format | From Django models | From ORM models | User-defined format | From SQLAlchemy models |
| Async support | Yes | No | Yes | Yes | Yes |
| API-first approach | Yes | No | Partially | Partially | No |
| Built-in Localization | Yes | Yes | No | No | No |
