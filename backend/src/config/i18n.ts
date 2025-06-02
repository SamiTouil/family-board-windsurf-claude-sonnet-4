import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import middleware from 'i18next-http-middleware';
import path from 'path';

i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: 'en',
    debug: process.env['NODE_ENV'] === 'development',
    
    backend: {
      loadPath: path.join(__dirname, '../../locales/{{lng}}/{{ns}}.json'),
    },
    
    detection: {
      order: ['header', 'querystring'],
      caches: false,
    },
    
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;
