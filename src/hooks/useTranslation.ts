import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const useTranslation = () => {
  const { currentLanguage, translations } = useSelector((state: RootState) => state.language);

  const t = (key: string): string => {
    return translations[currentLanguage]?.[key] || key;
  };

  return { t, currentLanguage };
};