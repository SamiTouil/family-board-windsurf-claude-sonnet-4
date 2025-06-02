#!/bin/bash

# Family Board Setup Script
# This script sets up the entire project from a fresh clone

set -e  # Exit on any error

echo "🚀 Setting up Family Board project..."
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Check if Docker Compose is available
if ! command -v docker compose > /dev/null 2>&1; then
    echo "❌ Docker Compose is not available. Please install Docker Compose and try again."
    exit 1
fi

# Create .env file from .env.example if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file from .env.example..."
    cp .env.example .env
    echo "✅ .env file created"
else
    echo "✅ .env file already exists"
fi

# Install all dependencies
echo "📦 Installing dependencies..."
npm run install:all

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npm run db:generate

# Build and start all services
echo "🐳 Building and starting Docker services..."
docker compose up --build -d

# Wait for database to be ready
echo "⏳ Waiting for database to be ready..."
sleep 15

# Run database migrations with proper environment
echo "🗄️ Running database migrations..."
cd backend && npm run prisma:migrate && cd ..

echo ""
echo "🎉 Setup complete! Your Family Board application is ready!"
echo ""
echo "📱 Access your application:"
echo "   • Frontend: http://localhost:3000"
echo "   • Backend API: http://localhost:3001"
echo "   • Database Manager: http://localhost:8081"
echo ""
echo "🛠️ Useful commands:"
echo "   • npm run dev          - Start all services"
echo "   • npm run db:studio    - Open Prisma Studio"
echo "   • docker compose logs  - View logs"
echo "   • docker compose down  - Stop all services"
echo ""
