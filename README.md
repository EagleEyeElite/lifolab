# "Living the Forest Lab" Website

## Getting Started

Follow these steps to set up the project environment.

```bash
    cp .env.example .env
    docker compose up -d --build && docker compose logs -f wp-setup
```
Wait until the setup is done.

The wordPress CMS can be accessed via `http://localhost:8080/wp-admin` with 
the default credentials username:`admin` and password:`pw`.

### WP CLI
You can interact with the wordPress instance via wpcli.
```bash
    # change admin display name:
    docker compose run --rm wpcli wp user update admin --display_name="newDisplayName"
    # development/ debugging examples, also enables public introspection
    docker compose run --rm --user 33:33 wpcli wp config set GRAPHQL_DEBUG true --raw
```

### Clean up
Use with caution - reset everything with:
```bash
  docker compose down --volumes --remove-orphans
```

## Backups

The state of wordPress cms site is stored in docker volumes (defined in docker-services/docker-compose.yml).

Backups are managed by the UpdraftPlus plugin.
You can upload the backup files automatically to your cloud storage or download them locally.

