import { PrismaClient } from '@prisma/client';

// Create a test database client
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env['TEST_DATABASE_URL'] || process.env['DATABASE_URL'] || '',
    },
  },
});

// Setup function to run before all tests
export const setupTestDatabase = async (): Promise<void> => {
  // Connect to the database
  await prisma.$connect();
  
  // Clean up any existing data
  await prisma.user.deleteMany();
};

// Cleanup function to run after all tests
export const teardownTestDatabase = async (): Promise<void> => {
  // Clean up test data
  await prisma.user.deleteMany();
  
  // Disconnect from the database
  await prisma.$disconnect();
};

// Global setup for Jest
beforeAll(async () => {
  await setupTestDatabase();
});

afterAll(async () => {
  await teardownTestDatabase();
});

// Export the test prisma client
export { prisma };
