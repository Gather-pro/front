import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "../translations/en";
import he from "../translations/he";
import ar from "../translations/ar";
import ru from "../translations/ru";


i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: false,
    fallbackLng: 'he',
    returnNull: false,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      he: { translation: he },
      en: { translation: en },
      ar: { translation: ar },
      ru: { translation: ru },

    },
  });

export default i18n;
