# 🚀 Quick Start Guide

## One-Command Setup

```bash
git clone <repository-url>
cd family-board
./setup.sh
```

**That's it!** The setup script will automatically:
- ✅ Create `.env` file from template
- ✅ Install all dependencies
- ✅ Generate Prisma client
- ✅ Build and start Docker services
- ✅ Run database migrations
- ✅ Verify everything is working

## What You Get

After running the setup script, you'll have:

- **Frontend**: http://localhost:3000 - React app with modern UI
- **Backend API**: http://localhost:3001 - Node.js + TypeScript API
- **Database Manager**: http://localhost:8081 - Adminer with dark theme
- **PostgreSQL**: localhost:5432 - Database ready with schema

## Alternative: Manual Setup

If you prefer to set up manually:

```bash
# 1. Environment setup
cp .env.example .env

# 2. Install dependencies
npm run setup

# 3. Start services
npm run dev
```

## Useful Commands

```bash
# Start all services
npm run dev

# Stop all services
docker compose down

# View logs
docker compose logs

# Database management
npm run db:studio          # Open Prisma Studio
npm run db:migrate         # Run migrations
npm run db:reset           # Reset database

# Development
npm run test               # Run tests
npm run lint               # Check code quality
npm run build              # Build for production
```

## Troubleshooting

**Docker not running?**
```bash
# Start Docker Desktop or Docker daemon
```

**Port conflicts?**
```bash
# Stop conflicting services
docker compose down
# Check what's using the ports
lsof -i :3000 -i :3001 -i :5432 -i :8081
```

**Database issues?**
```bash
# Reset database
npm run db:reset
# Or restart just the database
docker compose restart postgres
```

## Next Steps

1. **Explore the API**: Visit http://localhost:3001/api/health
2. **Check the Database**: Visit http://localhost:8081 (login with credentials from .env)
3. **Start Coding**: The project is ready for development!

---

**Need help?** Check the main README.md for detailed documentation.
