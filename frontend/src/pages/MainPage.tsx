import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';

const MainPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="app">
      <Header />
      <main className="main">
        <div className="container">
          <div className="text-center">
            <h2>{t('messages.welcome')}</h2>
            <p className="text-muted mt-md">
              {t('app.description')}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainPage;
