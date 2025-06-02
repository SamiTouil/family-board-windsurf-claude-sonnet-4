import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import middleware from 'i18next-http-middleware';
import i18next from './config/i18n';
import { connectDatabase } from '@/utils/database';
import { errorHandler, notFoundHandler } from '@/middleware/errorHandler';
import userRoutes from '@/routes/userRoutes';

const app = express();
const PORT = process.env['BACKEND_PORT'] || 3001;

// Security middleware
app.use(helmet());
const isProduction = process.env['NODE_ENV'] === 'production';
app.use(cors({
  origin: isProduction 
    ? ['https://your-domain.com'] 
    : ['http://localhost:3000'],
  credentials: true,
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Internationalization middleware
app.use(middleware.handle(i18next));

// Health check endpoint
app.get('/api/health', (_req: express.Request, res: express.Response) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.use('/api/users', userRoutes);

// Error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
const startServer = async (): Promise<void> => {
  try {
    await connectDatabase();
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
      console.log(`🌍 Environment: ${process.env['NODE_ENV'] || 'development'}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Export app for testing
export { app };

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});

startServer();
