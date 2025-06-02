import React from 'react';
import { useTranslation } from 'react-i18next';

const Header: React.FC = () => {
  const { t } = useTranslation();

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <h1 className="logo">{t('app.name')}</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
