// import { useSelector } from 'react-redux';
// import { RootState } from '../store';

// export const useTranslation = () => {
//   const { currentLanguage, translations } = useSelector((state: RootState) => state.language);

//   const t = (key: string): string => {
//     return translations[currentLanguage]?.[key] || key;
//   };

//   return { t, currentLanguage };
// };

import { useTranslation as useI18nTranslation } from 'react-i18next';

export const useTranslation = () => {
  const { t, i18n } = useI18nTranslation();

  return { 
    t, 
    language: i18n.language,
    changeLanguage: i18n.changeLanguage 
  };
};