import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { RootState } from '../../store';
import { logout } from '../../store/slices/authSlice';
import { toggleTheme } from '../../store/slices/themeSlice';
import { setLanguage } from '../../store/slices/languageSlice';
import { useTranslation } from '../../hooks/useTranslation';
import { 
  Heart, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Globe, 
  User, 
  LogOut, 
  Settings,
  Shield,
  Activity
} from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const { darkMode } = useSelector((state: RootState) => state.theme);
  const { currentLanguage } = useSelector((state: RootState) => state.language);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'ml', name: 'മലയാളം', flag: '🇮🇳' },
    { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
  ];

  const handleLanguageChange = (langCode: 'en' | 'hi' | 'ml' | 'bn') => {
    dispatch(setLanguage(langCode));
    setIsLangDropdownOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setIsUserDropdownOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 glass-card shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2"
            >
              <div className="relative">
                <img src="logo.Aro.svg" alt="logo" className='h-10' />
              </div>
              <div>
                <img src="logo.svg" alt="" className='h-7 mb-1 ml-0'/>
                <div className="text-xs text-gray-600 dark:text-gray-400 -mt-1">
                  Kerala Health System
                </div>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 smooth-transition"
            >
              {t('nav.home')}
            </Link>
            <Link 
              to="/features" 
              className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 smooth-transition"
            >
              {t('nav.features')}
            </Link>
            <Link 
              to="/hospitals" 
              className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 smooth-transition"
            >
              {t('nav.hospitals')}
            </Link>
            <Link 
              to="/outbreak-alerts" 
              className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 smooth-transition relative"
            >
              {t('nav.outbreak')}
              <Activity className="w-3 h-3 text-red-500 absolute -top-1 -right-1 pulse-animation" />
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 smooth-transition"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {languages.find(l => l.code === currentLanguage)?.flag}
                </span>
              </button>
              
              {isLangDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="lang-dropdown"
                >
                  {languages.map((lang) => (
                    <div
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code as 'en' | 'hi' | 'ml' | 'bn')}
                      className={`lang-option flex items-center space-x-2 ${
                        currentLanguage === lang.code ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600' : ''
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => dispatch(toggleTheme())}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 smooth-transition"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Auth Buttons / User Menu */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 smooth-transition"
                >
                  <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:block text-sm font-medium">{user.name}</span>
                </button>

                {isUserDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
                  >
                    <Link
                      to="/dashboard"
                      className="flex items-center space-x-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsUserDropdownOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      <span>{t('nav.dashboard')}</span>
                    </Link>
                    <Link
                      to="/profile"
                      className="flex items-center space-x-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsUserDropdownOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      <span>{t('nav.profile')}</span>
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center space-x-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsUserDropdownOpen(false)}
                    >
                      <Settings className="w-4 h-4" />
                      <span>{t('nav.settings')}</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>{t('nav.logout')}</span>
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-emerald-600 hover:text-emerald-700 font-medium smooth-transition"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 smooth-transition"
                >
                  {t('nav.signup')}
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700"
          >
            <div className="flex flex-col space-y-2">
              <Link to="/" className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                {t('nav.home')}
              </Link>
              <Link to="/features" className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                {t('nav.features')}
              </Link>
              <Link to="/hospitals" className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                {t('nav.hospitals')}
              </Link>
              <Link to="/outbreak-alerts" className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                {t('nav.outbreak')}
              </Link>
              
              {!isAuthenticated && (
                <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                  <Link to="/login" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                    {t('nav.login')}
                  </Link>
                  <Link to="/signup" className="block px-4 py-2 bg-emerald-600 text-white rounded-lg mt-2">
                    {t('nav.signup')}
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;