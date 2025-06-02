import React from 'react';
import { AuthProvider } from './hooks/useAuth';
import MainPage from './pages/MainPage';
import './styles/index.css';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <MainPage />
    </AuthProvider>
  );
};

export default App;
