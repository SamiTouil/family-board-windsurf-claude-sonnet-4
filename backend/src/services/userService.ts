import { User } from '@prisma/client';
import { prisma } from '@/utils/database';
import { hashPassword, comparePassword, generateToken } from '@/utils/auth';
import { CreateUserInput, LoginInput, UpdateUserInput, UserResponse, AuthResponse } from '@/types';

export class UserService {
  static async createUser(data: CreateUserInput): Promise<AuthResponse> {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const hashedPassword = await hashPassword(data.password);

    const user = await prisma.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: hashedPassword,
        avatarUrl: data.avatarUrl || null,
      },
    });

    const userResponse = this.toUserResponse(user);
    const token = generateToken(userResponse);

    return {
      user: userResponse,
      token,
    };
  }

  static async loginUser(data: LoginInput): Promise<AuthResponse> {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await comparePassword(data.password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    const userResponse = this.toUserResponse(user);
    const token = generateToken(userResponse);

    return {
      user: userResponse,
      token,
    };
  }

  static async getUserById(id: string): Promise<UserResponse | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    return user ? this.toUserResponse(user) : null;
  }

  static async updateUser(id: string, data: UpdateUserInput): Promise<UserResponse> {
    const user = await prisma.user.update({
      where: { id },
      data: {
        ...(data.firstName !== undefined && { firstName: data.firstName }),
        ...(data.lastName !== undefined && { lastName: data.lastName }),
        ...(data.avatarUrl !== undefined && { avatarUrl: data.avatarUrl || null }),
      },
    });

    return this.toUserResponse(user);
  }

  static async deleteUser(id: string): Promise<void> {
    await prisma.user.delete({
      where: { id },
    });
  }

  private static toUserResponse(user: User): UserResponse {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      avatarUrl: user.avatarUrl,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
