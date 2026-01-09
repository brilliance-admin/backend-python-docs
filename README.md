## Build

Install dependencies.
``` shell
uv sync
```

Start the live-reloading docs server.
``` shell
uv run mkdocs serve --open --livereload
```

Build the documentation site.
``` shell
uv run mkdocs build
```
