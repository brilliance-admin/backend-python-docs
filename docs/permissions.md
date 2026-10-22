# Permissions

Permissions control access to sections and actions. They are checked when generating the admin schema and when handling API requests. Unavailable sections and actions are hidden; requests without permission return `403`.

## Configuration

Pass a permissions manager to `AdminSchema`:

```python
admin_schema = AdminSchema(
    ...,
    permissions_manager=permissions_manager,
)
```

The default `AllowAllPermissionsManager` allows everything.

A custom manager implements:

```python
async def get_user_permissions(
    self, user: UserABC, for_schema_generation: bool,
) -> UserPermissions:
    ...
```

`for_schema_generation=True` means permissions are being loaded for the admin schema. The returned object is reused throughout schema generation.

`UserPermissions` provides:

```python
def has_action_permission(
    self,
    category: BaseCategory,
    action_type: TableAction,
    action_name: str | None = None,
) -> bool:
    ...
```

| Action type | Permission |
|---|---|
| `LIST` | View the section |
| `RETRIEVE` | View a record |
| `CREATE` | Create a record |
| `UPDATE` | Update a record |
| `ADMIN_ACTION` | Execute the action specified by `action_name` |

## Rules and inheritance

Each rule has one of three values:

- `INHERIT` — keep the result from the previous permission level.
- `ALLOW` — allow access.
- `DENY` — deny access.

The Django and SQLAlchemy managers apply groups in ascending `priority` order, then apply personal settings. Higher-priority groups override lower-priority groups; personal settings have the highest priority. Access is denied if no level grants it.

Rule names include the section path and action:

```text
users.user.list
users.user.update
users.user.admin_action.delete
users.user.usersession.retrieve
```

Category groups organise paths but do not have separate rules.

## Editing permissions

`PermissionsSettingsCategory` generates fields for the available rules at startup. `PermissionsSettingsInlineField` embeds this form in the owner's editing form.

The form contains `is_superuser` and a choice for each rule: inherit, allow or deny.

`PermissionsData` contains the flag and rule objects:

```python
for rule in data.iter_rules():
    rule.set_value(PermissionValue.ALLOW)

data.is_superuser = True
```

To populate the form, the category calls `get_user_permissions()` and reads `UserPermissions.get_permissions_data()`. This returns the owner's own settings, rather than the resolved cascade.

Submitted values are passed to:

```python
async def save_permissions(self, data: PermissionsData, extra: dict) -> None:
    ...
```

`extra['record']` is the object being edited. The Django and SQLAlchemy managers save `is_superuser` and explicit `ALLOW`/`DENY` rules. `INHERIT` rules are omitted from storage.
