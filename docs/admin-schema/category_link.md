# Links

Links add external or internal URLs to the sidebar navigation. 

They open in a new tab for absolute URLs or navigate within the app for relative paths.

## CategoryLink
``` python
from brilliance_admin import schema


class Documentation(schema.CategoryLink):
    slug = 'docs'
    title = 'Documentation'
    icon = 'mdi-book-open-variant'
    link = 'https://docs.example.com'


class GitHubRepo(schema.CategoryLink):
    slug = 'github'
    title = 'GitHub'
    icon = 'mdi-github'
    link = 'https://github.com/example/repo'
```

| Parameter | Description |
|-----------|-------------|
| `slug` <Badge type="danger" text="required" /> | Unique identifier |
| `title` <Badge type="danger" text="required" /> | Display name in the sidebar |
| `link` <Badge type="danger" text="required" /> | URL — absolute (`https://...`) opens in new tab, relative (`/page`) navigates internally |
| `icon` | Material Design icon name (e.g. `'mdi-chart-bar-stacked'`) [Icons Database](https://pictogrammers.com/library/mdi/) |
| `description` | Subtitle text under the link title |
