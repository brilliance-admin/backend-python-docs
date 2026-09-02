# SynchronousOnly Handling

The Django integration has built-in warning output for data that was not loaded in advance and requires separate queries. This is provided for three cases:

At project startup:

- Checking the common queryset for all required `select_related`

When receiving data:

- Checking `__str__` retrieval
- Checking autocomplete option contents for `DjangoRelatedField`

## Project Startup Check

Warning example:

```text
DjangoAdmin list_display related field is not selected: category=PeriodicFeeAdmin model=PeriodicFee field=currency. Add select_related('currency') to get_queryset().
```

In this case, add `select_related` to `get_queryset`:

```python
class PeriodicFeeAdmin(django.DjangoAdmin):
    model = PeriodicFee

    def get_queryset(self, *args, **kwargs):
        return super().get_queryset(*args, **kwargs).select_related('currency')
```

This check is run for FK/O2O related fields shown directly in `list_display`.

## DjangoRelatedField Autocomplete Option Contents Check

Warning example:

```text
Async unsafe title load: field="member" rel_name="member" parent_model="MemberToken"
  parent_pk=sdjfg6324g2hs8dasgdgu42374yuewgsufs77y23 model="Member" pk=121. Add required select_related() to get_queryset(), or define
  async admin_title().
  __str__ source:
      def __str__(self):
          return f"Member#{self.id} {self.user.username}"
```

This means the autocomplete option title needs data that was not loaded in advance.

Fix it by adding the required loading to `DjangoRelatedField`:

```python
member = django.DjangoRelatedField(
    rel_name='member',
    select_related=['user'],
)
```

If `get_queryset` is used for autocomplete options, add loading there:

```python
async def get_member_queryset(queryset, data, user):
    return queryset.select_related('user')


member = django.DjangoRelatedField(
    rel_name='member',
    get_queryset=get_member_queryset,
)
```

## `__str__` Retrieval Check

Warning example:

```text
Async unsafe lazy related load: field="currency" model="PeriodicFee" pk=3. Add select_related('currency') to get_queryset(), or
  avoid sync lazy relation access in async serialization; use async ORM in admin_title() when extra data is needed.
```

This means the related object itself was not loaded in advance.

Fix it by adding `select_related` to `get_queryset`:

```python
class PeriodicFeeAdmin(django.DjangoAdmin):
    model = PeriodicFee

    def get_queryset(self, *args, **kwargs):
        return super().get_queryset(*args, **kwargs).select_related('currency')
```

If the related object is loaded, but its `__str__` reads another relation, load the full path:

```python
class MemberTokenAdmin(django.DjangoAdmin):
    model = MemberToken

    def get_queryset(self, *args, **kwargs):
        return super().get_queryset(*args, **kwargs).select_related('member__user')
```

Or define async title logic:

```python
class Member(models.Model):
    async def admin_title(self):
        user = await User.objects.aget(pk=self.user_id)
        return f'Member#{self.id} {user.username}'
```

## Controlling Error Behavior With `raise_async_unsafe`

By default:

```python
raise_async_unsafe = False
```

With this setting, Brilliance Admin writes a warning and uses fallback behavior where possible.

Enable strict behavior:

```python
class PeriodicFeeAdmin(django.DjangoAdmin):
    model = PeriodicFee
    raise_async_unsafe = True
```

Or pass it to the constructor:

```python
PeriodicFeeAdmin(
    model=PeriodicFee,
    raise_async_unsafe=True,
)
```

With `raise_async_unsafe=True`, Brilliance Admin raises an API error instead of using warning fallback.

::: tip
With `raise_async_unsafe=False` and `debug=False`, notifications are not displayed.
:::
