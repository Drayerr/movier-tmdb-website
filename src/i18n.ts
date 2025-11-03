import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translation_en from "./locales/en/translation.json";
import translation_pt from "./locales/pt/translation.json";

const resources = {
  en: {
    translation: translation_en,
  },
  pt: {
    translation: translation_pt,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    lng: "en",
  });

export default i18n;
