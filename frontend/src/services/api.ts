import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { ApiResponse, AuthResponse, CreateUserInput, LoginInput, UserResponse, UpdateUserInput } from '../types';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: process.env['REACT_APP_API_URL'] || 'http://localhost:3001/api',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle auth errors
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth endpoints
  async register(data: CreateUserInput): Promise<AuthResponse> {
    const response: AxiosResponse<ApiResponse<AuthResponse>> = await this.api.post('/api/users/register', data);
    return response.data.data!;
  }

  async login(data: LoginInput): Promise<AuthResponse> {
    const response: AxiosResponse<ApiResponse<AuthResponse>> = await this.api.post('/api/users/login', data);
    return response.data.data!;
  }

  async getProfile(): Promise<UserResponse> {
    const response: AxiosResponse<ApiResponse<UserResponse>> = await this.api.get('/api/users/profile');
    return response.data.data!;
  }

  async updateProfile(data: UpdateUserInput): Promise<UserResponse> {
    const response: AxiosResponse<ApiResponse<UserResponse>> = await this.api.put('/api/users/profile', data);
    return response.data.data!;
  }

  async deleteAccount(): Promise<void> {
    await this.api.delete('/api/users/profile');
  }

  // Health check
  async healthCheck(): Promise<boolean> {
    try {
      await this.api.get('/health');
      return true;
    } catch {
      return false;
    }
  }
}

export const apiService = new ApiService();
