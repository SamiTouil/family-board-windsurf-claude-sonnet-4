import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Header from '../components/Header';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: { [key: string]: string } = {
        'app.name': 'Family Board',
        'auth.login': 'Login',
        'auth.logout': 'Logout',
      };
      return translations[key] || key;
    },
    i18n: {
      changeLanguage: vi.fn(),
      language: 'en',
    },
  }),
}));

describe('Header', () => {
  test('renders header title', () => {
    render(<Header />);
    const titleElement = screen.getByText('Family Board');
    expect(titleElement).toBeInTheDocument();
  });

  test('renders header as banner role', () => {
    render(<Header />);
    const headerElement = screen.getByRole('banner');
    expect(headerElement).toBeInTheDocument();
  });

  test('has correct CSS classes', () => {
    render(<Header />);
    const headerElement = screen.getByRole('banner');
    expect(headerElement).toHaveClass('header');
    
    const titleElement = screen.getByText('Family Board');
    expect(titleElement).toHaveClass('logo');
  });
});
