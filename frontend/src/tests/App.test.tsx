import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import App from '../App';

// Mock i18next
vi.mock('../utils/i18n', () => ({
  default: {
    init: vi.fn(),
    use: vi.fn(() => ({ init: vi.fn() })),
    t: vi.fn((key: string) => key),
  },
}));

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: { [key: string]: string } = {
        'app.name': 'Family Board',
        'messages.welcome': 'Welcome to Family Board',
        'app.description': 'Family Task Planner',
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
  initReactI18next: {
    type: '3rdParty',
    init: vi.fn(),
  },
}));

describe('App', () => {
  test('renders app title', () => {
    render(<App />);
    const titleElement = screen.getByText('Family Board');
    expect(titleElement).toBeInTheDocument();
  });

  test('renders header component', () => {
    render(<App />);
    const headerElement = screen.getByRole('banner');
    expect(headerElement).toBeInTheDocument();
  });

  test('renders main page component', () => {
    render(<App />);
    const mainElement = screen.getByRole('main');
    expect(mainElement).toBeInTheDocument();
  });

  test('renders welcome message', () => {
    render(<App />);
    const welcomeElement = screen.getByText('Welcome to Family Board');
    expect(welcomeElement).toBeInTheDocument();
  });

  test('renders app description', () => {
    render(<App />);
    const descriptionElement = screen.getByText('Family Task Planner');
    expect(descriptionElement).toBeInTheDocument();
  });
});
