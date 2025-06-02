import { hashPassword, comparePassword, generateToken, verifyToken } from '../../utils/auth';
import { UserResponse } from '../../types';

describe('Auth Utils', () => {
  const testPassword = 'testPassword123';
  const testUser: UserResponse = {
    id: 'test-user-id',
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    avatarUrl: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  describe('hashPassword', () => {
    it('should hash password successfully', async () => {
      const hashedPassword = await hashPassword(testPassword);
      
      expect(hashedPassword).toBeDefined();
      expect(hashedPassword).not.toBe(testPassword);
      expect(hashedPassword.length).toBeGreaterThan(0);
    });

    it('should generate different hashes for same password', async () => {
      const hash1 = await hashPassword(testPassword);
      const hash2 = await hashPassword(testPassword);
      
      expect(hash1).not.toBe(hash2);
    });
  });

  describe('comparePassword', () => {
    it('should return true for correct password', async () => {
      const hashedPassword = await hashPassword(testPassword);
      const isMatch = await comparePassword(testPassword, hashedPassword);
      
      expect(isMatch).toBe(true);
    });

    it('should return false for incorrect password', async () => {
      const hashedPassword = await hashPassword(testPassword);
      const isMatch = await comparePassword('wrongPassword', hashedPassword);
      
      expect(isMatch).toBe(false);
    });
  });

  describe('generateToken', () => {
    it('should generate a valid JWT token', () => {
      const token = generateToken(testUser);
      
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token.split('.')).toHaveLength(3); // JWT has 3 parts
    });
  });

  describe('verifyToken', () => {
    it('should verify a valid token', () => {
      const token = generateToken(testUser);
      const decoded = verifyToken(token) as any;
      
      expect(decoded).toBeDefined();
      expect(decoded.id).toBe(testUser.id);
    });

    it('should throw error for invalid token', () => {
      const invalidToken = 'invalid.token.here';
      
      expect(() => verifyToken(invalidToken)).toThrow();
    });
  });
});
