# Count Providers

Django provides two built-in `count_provider` implementations. See [Count provider](/admin-schema/tables#count-provider) for the common interface.

## DjangoCountProvider

`DjangoCountProvider` is used by default and performs an exact `COUNT(*)` query.

```python
django.DjangoAdmin(
    model=Order,
    count_provider=django.DjangoCountProvider(),
)
```

::: tip
Use `max_count` to limit exact count queries. When exceeded, the table displays `{max_count}+` and page count is unavailable.
:::

## PostgresCounter

Optimized provider for PostgreSQL:

- Without filters, it reads the count from `pg_class.reltuples` and displays `~19000000`.
- Filtered queries are capped by `BRILLIANCE_ADMIN_CAPPED_COUNT_LIMIT`, default `1000`.

```python
django.DjangoAdmin(
    ...
    count_provider=django.PostgresCounter(),
)
```
