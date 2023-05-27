# Author: Andrey Burtsev

## Reflectiz Domain Scanner Project

System is built with the nestjs framework and with the use of a scheduler,
The system has 3 main services:

1. prisma - ORM service to access the db
2. domain - Domain service to create/get the domains
3. domain-job - Cron job service that scans the domains every set interval

## How to run?

1. create .env file:

```
# General Config
PORT=5000
HOST=localhost:5000
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/db?schema=public

# Domain Scanning Interval
# Every 10s scan new domains
NEW_DOMAINS_CRON_TIMESTRING=*/10 * * * * *
# Every month scan all domains
EXISTSING_DOMAINS_CRON_TIMESTRING=0 0 1 * *

# External API
WHOIS_URL="https://www.whoisxmlapi.com/whoisserver/WhoisService"
WHOIS_API_KEY=at_mCfU1iVATS5QcPLlzI7gYtWpRmVVl
VIRUSTOTAL_URL="https://www.virustotal.com/api/v3/domains"
VIRUSTOTAL_API_KEY=1d94077f31cb8336846251c416e8c929ba9c5a8d6b1a76a1687f00f82ad27e2b
```

2. Run docker-compose:

```bash
docker compose up --build
```

## Endpoints

Swagger documentation is available at <b>localhost:5000/docs</b>
