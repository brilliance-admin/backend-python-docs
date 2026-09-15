# Count Providers

SQLAlchemy uses `SQLAlchemyCountProvider` by default. A count provider calculates the total record count and page count.

## SQLAlchemyCountProvider

`SQLAlchemyCountProvider` performs an exact count query.

```python
sqlalchemy.SQLAlchemyAdmin(
    model=Order,
    count_provider=sqlalchemy.SQLAlchemyCountProvider(),
)
```

## PostgresCounter

`PostgresCounter` avoids expensive full-table counts.

Without filters, it reads the estimated row count from PostgreSQL `pg_class.reltuples` and shows it as `~N`. Page count is unavailable.

Filtered queries use an exact count capped by `capped_count_limit` (default: `1000`). When the limit is exceeded, the table shows `1000+` and page count is unavailable.

```python
sqlalchemy.SQLAlchemyAdmin(
    model=Order,
    count_provider=sqlalchemy.PostgresCounter(capped_count_limit=1000),
)
```
