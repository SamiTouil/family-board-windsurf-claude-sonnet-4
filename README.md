# Family Board - Task Planner

A minimalistic family task planning application built with modern web technologies.

## 🚀 Tech Stack

- **Backend**: Node.js + TypeScript, Express, Prisma ORM, PostgreSQL
- **Frontend**: React + TypeScript, minimalistic UI design
- **Database**: PostgreSQL with Adminer for database management
- **Testing**: Jest (unit tests), Playwright (E2E tests)
- **Internationalization**: i18next (English & French)
- **DevOps**: Docker, GitHub Actions, ACT for local CI testing

## 🏗️ Architecture

```
family-board/
├── backend/           # Node.js + TypeScript API
├── frontend/          # React + TypeScript SPA
├── e2e/              # Playwright E2E tests
├── .github/          # GitHub Actions workflows
└── docker-compose.yml # Multi-container setup
```

## 🛠️ Prerequisites

- Node.js 18+
- Docker & Docker Compose
- npm 9+

## 🚀 Quick Start

### One-Command Setup

```bash
git clone <repository-url>
cd family-board
./setup.sh
```

That's it! The setup script will:
- ✅ Create `.env` file from template
- ✅ Install all dependencies
- ✅ Generate Prisma client
- ✅ Build and start Docker services
- ✅ Run database migrations
- ✅ Verify everything is working

### Manual Setup (Alternative)

```bash
# Copy environment variables
cp .env.example .env

# Install all dependencies
npm run setup

# Start all services
npm run dev
```

**Services will be available at:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Database Manager (Adminer): http://localhost:8081
- PostgreSQL: localhost:5432

## 🗄️ Database Management

```bash
# Generate Prisma client
npm run db:generate

# Run migrations
npm run db:migrate

# Reset database (development only)
npm run db:reset

# Open Prisma Studio
npm run db:studio
```

## 🧪 Testing

### Unit Tests

```bash
# Run all tests
npm test

# Backend tests only
npm run test:backend

# Frontend tests only
npm run test:frontend

# With coverage
cd backend && npm run test:coverage
cd frontend && npm run test:coverage
```

### E2E Tests

```bash
# Run E2E tests
npm run test:e2e

# Run with headed browser
cd e2e && npm run test:headed

# Debug mode
cd e2e && npm run test:debug
```

### Local CI Testing with ACT

```bash
# Install ACT (macOS)
brew install act

# Run GitHub Actions locally
act

# Run specific workflow
act -j backend-tests
```

## 🌐 Internationalization

The application supports English (default) and French:

- Backend: Uses i18next with JSON translation files
- Frontend: Uses react-i18next with automatic language detection
- Translation files: `locales/en/` and `locales/fr/`

## 🔧 Available Scripts

### Root Level
- `npm run setup` - Initial project setup
- `npm run dev` - Start all services with Docker
- `npm run dev:local` - Start backend and frontend locally
- `npm test` - Run all tests
- `npm run test:ci` - Run tests in CI mode
- `npm run build` - Build all projects
- `npm run lint` - Lint all projects

### Backend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm test` - Run unit tests
- `npm run lint` - Run ESLint

### Frontend
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run unit tests
- `npm run lint` - Run ESLint

### E2E
- `npm test` - Run E2E tests
- `npm run test:headed` - Run with browser UI
- `npm run test:debug` - Debug mode

## 🐳 Docker Commands

```bash
# Build all images
npm run docker:build

# Start all services
npm run docker:up

# Stop all services
npm run docker:down

# View logs
npm run docker:logs
```

## 🔒 Environment Variables

Copy `.env.example` to `.env` and configure:

```env
# Database
DATABASE_URL=postgresql://family_user:family_password@localhost:5432/family_board_db
POSTGRES_USER=family_user
POSTGRES_PASSWORD=family_password
POSTGRES_DB=family_board_db

# Backend
BACKEND_PORT=3001
JWT_SECRET=your-super-secret-jwt-key

# Frontend
REACT_APP_API_URL=http://localhost:3001
REACT_APP_DEFAULT_LANGUAGE=en
```

## 📁 Project Structure

```
family-board/
├── backend/
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   ├── middleware/     # Express middleware
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── types/          # TypeScript types
│   │   └── utils/          # Utility functions
│   ├── prisma/             # Database schema & migrations
│   └── locales/            # i18n translation files
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── styles/         # CSS styles
│   │   ├── types/          # TypeScript types
│   │   └── utils/          # Utility functions
│   └── public/             # Static assets
├── e2e/
│   └── tests/              # Playwright E2E tests
└── .github/
    └── workflows/          # GitHub Actions
```

## 🎨 UI Design

- **Design Philosophy**: Minimalistic, inspired by Deliveroo
- **Color Scheme**: White background with purple (#8B5CF6) accents
- **Typography**: System fonts for optimal performance
- **Responsive**: Mobile-first design approach
- **No Dark Mode**: Single, consistent theme

## 🚦 CI/CD Pipeline

GitHub Actions workflow includes:

1. **Backend Tests**: Linting, unit tests, build verification
2. **Frontend Tests**: Linting, unit tests, build verification  
3. **E2E Tests**: Full application testing with Playwright
4. **Docker Build**: Container build verification

## 🤝 Contributing

1. Create a feature branch from `develop`
2. Make your changes with proper tests
3. Ensure all tests pass locally
4. Submit a Pull Request to `develop`
5. All CI checks must pass before merging

## 📝 License

MIT License - see LICENSE file for details

---

## 🔧 Troubleshooting

### Common Issues

**Database Connection Issues:**
```bash
# Reset database
npm run db:reset

# Restart Docker services
docker-compose down && docker-compose up -d
```

**Port Conflicts:**
- Frontend: Change port in `frontend/package.json`
- Backend: Update `BACKEND_PORT` in `.env`
- Database: Update `docker-compose.yml` ports

**TypeScript Errors:**
```bash
# Regenerate Prisma client
cd backend && npx prisma generate

# Clear node_modules and reinstall
npm run clean && npm run install:all
```

For more help, check the GitHub Issues or create a new issue.
