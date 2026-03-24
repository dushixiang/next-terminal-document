# Backup Guide

## What Gets Backed Up

Current supported items:

- Session recordings (`data/recordings`)
- Windows mapped drive files (`data/drive`)
- PostgreSQL logical backup (runs `pg_dump` inside container, archived as `data/postgresql_dump.sql`)
- CA certificate/key files (`data/root_ca_*.pem`)

## Prerequisites

1. Run commands in the deployment directory (same level as `docker-compose.yaml`).
2. Python 3.6+ is required (no external dependency).
3. Docker Compose is required (`docker compose` or `docker-compose`).
4. For PostgreSQL backup/restore, the DB service container must provide `pg_dump` / `psql`.

## Download Script

```shell
# Download to current directory (overwrite old version)
wget -O backup_restore.py https://raw.githubusercontent.com/dushixiang/next-terminal/master/scripts/backup_restore.py
```

```shell
# Optional: make it executable
chmod +x backup_restore.py
```

## Backup

Use `backup_restore.py`:

```shell
# Interactive selection (recommended)
python3 backup_restore.py backup --interactive --workdir .
```

```shell
# Explicit item selection (example)
python3 backup_restore.py backup \
  --workdir . \
  --items drive,recordings,postgresql,ca \
  --pg-service postgresql
```

Notes:

- PostgreSQL backup is executed via `docker compose exec -T <service> sh -lc "<pg_dump command>"`.
- Default PostgreSQL service name is `postgresql`; override with `--pg-service` if needed.
- You can force compose binary by `--compose-cmd 'docker compose'` or `--compose-cmd docker-compose`.

## Restore

```shell
# Interactive restore (auto-picks latest next-terminal-backup-*.tar.gz)
python3 backup_restore.py restore --interactive --workdir .
```

```shell
# Explicit archive + items (example)
python3 backup_restore.py restore \
  --workdir . \
  --archive next-terminal-backup-20260324.tar.gz \
  --items postgresql,ca \
  --pg-service postgresql
```

Notes:

- PostgreSQL restore is executed via `docker compose exec -T <service> sh -lc "<psql command>"`.
- After restore, verify service status if needed:

```shell
docker compose ps
docker compose logs -f
```
