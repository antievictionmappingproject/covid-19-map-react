import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import store from '../reducers';

import { languages } from './constants';

export const I18N_ATTRIBUTE = 'data-i18n';

export const translateContent = element => {
  const selectedDomTree = element || document;
  const elements = selectedDomTree.querySelectorAll(`[${I18N_ATTRIBUTE}]`);
  elements.forEach(el => {
    const key = el.dataset.i18n;
    const t = i18next.t(key);
    // If translation found set element content as translation.
    if (t !== key) el.innerHTML = t;
    // Otherwise use english as fallback
    else el.innerHTML = i18next.t(key, { lng: 'en' });
  });
};

// Default values for i18next config
const i18nOptions = {
  whitelist: languages,
  fallbackLng: 'en',
  debug: process.env.NODE_ENV !== 'production',
  detection: {
    order: ['querystring', 'navigator'],
    lookupQuerystring: 'lang',
    checkForSimilarInWhitelist: true,
  },
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
};

// Initialize i18n next
export const i18nInit = async () => {
  // this code splits the locales JSON imports so that they're not included with the index bundle
  await import(/* webpackChunkName: "locales" */ '../locale').then(
    ({ default: translations }) => {
      i18nOptions.resources = translations;
      i18next
        .use(LanguageDetector)
        .use(initReactI18next)
        .init(i18nOptions)
        .then(() => {
          store.dispatch({ type: 'content:i18n' });
        });
    }
  );
};

export default i18n;
