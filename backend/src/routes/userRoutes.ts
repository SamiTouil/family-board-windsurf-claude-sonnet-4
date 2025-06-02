import { Router, Response } from 'express';
import { UserService } from '@/services/userService';
import { validateBody } from '@/utils/validation';
import { authenticateToken, AuthenticatedRequest } from '@/middleware/auth';
import { CreateUserSchema, LoginSchema, UpdateUserSchema, ApiResponse } from '@/types';

const router = Router();

// Register user
router.post('/register', validateBody(CreateUserSchema), async (req, res: Response): Promise<void> => {
  try {
    const authResponse = await UserService.createUser(req.body);
    const response: ApiResponse = {
      success: true,
      data: authResponse,
      message: 'User registered successfully',
    };
    res.status(201).json(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      message: error instanceof Error ? error.message : 'Registration failed',
    };
    // Return 409 for duplicate email, 400 for other validation errors
    const statusCode = error instanceof Error && error.message.includes('already exists') ? 409 : 400;
    res.status(statusCode).json(response);
  }
});

// Login user
router.post('/login', validateBody(LoginSchema), async (req, res: Response): Promise<void> => {
  try {
    const authResponse = await UserService.loginUser(req.body);
    const response: ApiResponse = {
      success: true,
      data: authResponse,
      message: 'Login successful',
    };
    res.status(200).json(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      message: error instanceof Error ? error.message : 'Login failed',
    };
    // Return 404 for user not found, 401 for invalid password
    let statusCode = 400;
    if (error instanceof Error) {
      if (error.message.includes('User not found')) {
        statusCode = 404;
      } else if (error.message.includes('Invalid password')) {
        statusCode = 401;
      }
    }
    res.status(statusCode).json(response);
  }
});

// Get current user profile
router.get('/profile', authenticateToken, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const user = await UserService.getUserById(req.user!.id);
    if (!user) {
      const response: ApiResponse = {
        success: false,
        message: 'User not found',
      };
      res.status(404).json(response);
      return;
    }

    const response: ApiResponse = {
      success: true,
      data: user,
    };
    res.status(200).json(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to get user profile',
    };
    res.status(500).json(response);
  }
});

// Update user profile
router.put('/profile', authenticateToken, validateBody(UpdateUserSchema), async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const user = await UserService.updateUser(req.user!.id, req.body);
    const response: ApiResponse = {
      success: true,
      data: user,
      message: 'Profile updated successfully',
    };
    res.status(200).json(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to update profile',
    };
    // Return 409 for duplicate email, 400 for other validation errors
    const statusCode = error instanceof Error && error.message.includes('already exists') ? 409 : 400;
    res.status(statusCode).json(response);
  }
});

// Delete user account
router.delete('/profile', authenticateToken, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    await UserService.deleteUser(req.user!.id);
    const response: ApiResponse = {
      success: true,
      message: 'Account deleted successfully',
    };
    res.status(200).json(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to delete account',
    };
    res.status(500).json(response);
  }
});

export default router;
