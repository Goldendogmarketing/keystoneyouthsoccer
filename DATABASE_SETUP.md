# PostgreSQL Database Setup Guide

## Option 1: Docker (Recommended - Easiest)

### Install Docker Desktop
1. Download Docker Desktop from https://www.docker.com/products/docker-desktop/
2. Install and start Docker Desktop
3. Run the following command to start PostgreSQL:

```bash
docker run --name keystonesoccer-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=keystonesoccer -p 5432:5432 -d postgres:16
```

### Stop/Start the database later:
```bash
# Stop
docker stop keystonesoccer-db

# Start
docker start keystonesoccer-db

# Remove (if you want to start fresh)
docker rm -f keystonesoccer-db
```

## Option 2: Native PostgreSQL Installation

### Install PostgreSQL
1. Download PostgreSQL from https://www.postgresql.org/download/windows/
2. Run the installer (choose PostgreSQL 16)
3. Set a password for the postgres user (remember this!)
4. Keep default port 5432
5. Complete installation

### Create Database
```bash
# Open Command Prompt or PowerShell as Administrator
cd "C:\Program Files\PostgreSQL\16\bin"

# Login to PostgreSQL
psql -U postgres

# In psql, create database:
CREATE DATABASE keystonesoccer;

# Exit
\q
```

## Configure Environment Variables

Create a `.env` file in the project root with:

```env
# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/keystonesoccer

# Better Auth (generate a 32+ character secret)
BETTER_AUTH_SECRET=your-32-character-secret-key-here-change-this-in-production
BETTER_AUTH_URL=http://localhost:3001

# Stripe (optional for now - can add later)
# STRIPE_SECRET_KEY=sk_test_...
# STRIPE_PUBLISHABLE_KEY=pk_test_...
# STRIPE_WEBHOOK_SECRET=whsec_...

# Resend (optional for now - can add later)
# RESEND_API_KEY=re_...
```

**Generate a BETTER_AUTH_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Run Database Migrations

After PostgreSQL is running and `.env` is configured:

```bash
# Install Drizzle Kit (migration tool)
npm install -D drizzle-kit

# Generate migrations
npm run db:generate

# Push schema to database
npm run db:push
```

## Seed Initial Data

```bash
# Run the seed script
npm run db:seed
```

## Verify Connection

Your dev server should now connect successfully. Restart it:

```bash
npm run dev
```

The database connection errors should be gone!

## Troubleshooting

### Connection Refused Error
- Make sure PostgreSQL is running (Docker: `docker ps` should show the container)
- Check that port 5432 is not blocked by firewall
- Verify DATABASE_URL in .env matches your setup

### Authentication Failed
- Check your password in the DATABASE_URL
- Default Docker password is `postgres`
- Make sure user `postgres` has access to the database

### Database Does Not Exist
- Create it with: `docker exec -it keystonesoccer-db psql -U postgres -c "CREATE DATABASE keystonesoccer;"`
- Or in psql: `CREATE DATABASE keystonesoccer;`
