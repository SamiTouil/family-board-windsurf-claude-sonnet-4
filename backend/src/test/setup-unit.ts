// Unit test setup - no database connection needed
// This setup is for tests that don't require database connectivity

// Set test environment variables
process.env['NODE_ENV'] = 'test';
process.env['JWT_SECRET'] = 'test-jwt-secret';

// Mock console methods to reduce noise in tests
const originalConsoleError = console.error;
const originalConsoleLog = console.log;

beforeAll(() => {
  // Suppress console output during tests unless needed
  console.error = jest.fn();
  console.log = jest.fn();
});

afterAll(() => {
  // Restore console methods
  console.error = originalConsoleError;
  console.log = originalConsoleLog;
});
