// import React, { useState, useEffect, useRef } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { motion } from 'framer-motion';
// import { RootState } from '../../store';
// import { logout } from '../../store/slices/authSlice';
// import { toggleTheme } from '../../store/slices/themeSlice';
// import { setLanguage } from '../../store/slices/languageSlice';
// import { useTranslation } from '../../hooks/useTranslation';
// import { 
//   Heart, 
//   Menu, 
//   X, 
//   Sun, 
//   Moon, 
//   Globe, 
//   User, 
//   LogOut, 
//   Settings,
//   Shield,
//   Activity
// } from 'lucide-react';

// const Navbar: React.FC = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
//   const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { t } = useTranslation();
  
//   const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
//   const { darkMode } = useSelector((state: RootState) => state.theme);
//   const { currentLanguage } = useSelector((state: RootState) => state.language);

//   // Refs for dropdown management
//   const langDropdownRef = useRef<HTMLDivElement>(null);
//   const userDropdownRef = useRef<HTMLDivElement>(null);
//   const mobileMenuRef = useRef<HTMLDivElement>(null);

//   const languages = [
//     { code: 'en', name: 'English', flag: '🇺🇸' },
//     { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
//     { code: 'ml', name: 'മലയാളം', flag: '🇮🇳' },
//     { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
//   ];

//   // Close dropdowns when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
//         setIsLangDropdownOpen(false);
//       }
//       if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
//         setIsUserDropdownOpen(false);
//       }
//       if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
//         const target = event.target as Element;
//         if (!target.closest('[data-mobile-menu-trigger]')) {
//           setIsMenuOpen(false);
//         }
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   // Close mobile menu on window resize
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 768) {
//         setIsMenuOpen(false);
//       }
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const handleLanguageChange = (langCode: 'en' | 'hi' | 'ml' | 'bn') => {
//     dispatch(setLanguage(langCode));
//     setIsLangDropdownOpen(false);
//   };

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate('/');
//     setIsUserDropdownOpen(false);
//     setIsMenuOpen(false);
//   };

//   const closeMobileMenu = () => {
//     setIsMenuOpen(false);
//   };

//   return (
//     <nav className="sticky top-0 z-50 glass-card shadow-lg">
//       <div className="container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
//         <div className="flex items-center justify-between h-14 sm:h-16">
//           {/* Logo - Responsive sizing */}
//           <Link to="/" className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="flex items-center space-x-1 sm:space-x-2"
//             >
//               <div className="relative">
//                 <img 
//                   src="logo.Aro.svg" 
//                   alt="logo" 
//                   className='h-8 sm:h-10 w-auto' 
//                 />
//               </div>
//               <div className="hidden xs:block sm:block">
//                 <img 
//                   src="logo.svg" 
//                   alt="" 
//                   className='h-5 sm:h-7 w-auto mb-1 ml-0'
//                 />
//                 <div className="text-xs sm:text-xs text-gray-600 dark:text-gray-400 -mt-1 whitespace-nowrap">
//                   Kerala Health System
//                 </div>
//               </div>
//             </motion.div>
//           </Link>

//           {/* Desktop Navigation - Hidden on mobile/tablet */}
//           <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
//             <Link 
//               to="/" 
//               className="text-sm xl:text-base text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 smooth-transition font-medium"
//             >
//               {t('nav.home')}
//             </Link>
//             <Link 
//               to="/features" 
//               className="text-sm xl:text-base text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 smooth-transition font-medium"
//             >
//               {t('nav.features')}
//             </Link>
//             <Link 
//               to="/hospitals" 
//               className="text-sm xl:text-base text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 smooth-transition font-medium"
//             >
//               {t('nav.hospitals')}
//             </Link>
//             <Link 
//               to="/outbreak-alerts" 
//               className="text-sm xl:text-base text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 smooth-transition relative font-medium"
//             >
//               {t('nav.outbreak')}
//               <Activity className="w-3 h-3 text-red-500 absolute -top-1 -right-1 pulse-animation" />
//             </Link>
//           </div>

//           {/* Right Side Actions - Responsive spacing */}
//           <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4">
//             {/* Language Switcher - Responsive */}
//             <div className="relative" ref={langDropdownRef}>
//               <button
//                 onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
//                 className="flex items-center space-x-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 smooth-transition"
//                 aria-label="Language selector"
//               >
//                 <Globe className="w-4 h-4" />
//                 <span className="text-sm font-medium hidden xs:inline">
//                   {languages.find(l => l.code === currentLanguage)?.flag}
//                 </span>
//               </button>
              
//               {isLangDropdownOpen && (
//                 <motion.div
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   className="absolute right-0 mt-2 w-40 sm:w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
//                 >
//                   {languages.map((lang) => (
//                     <div
//                       key={lang.code}
//                       onClick={() => handleLanguageChange(lang.code as 'en' | 'hi' | 'ml' | 'bn')}
//                       className={`flex items-center space-x-2 px-3 sm:px-4 py-2 sm:py-3 text-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 smooth-transition ${
//                         currentLanguage === lang.code ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600' : 'text-gray-700 dark:text-gray-300'
//                       }`}
//                     >
//                       <span className="text-base">{lang.flag}</span>
//                       <span className="font-medium">{lang.name}</span>
//                     </div>
//                   ))}
//                 </motion.div>
//               )}
//             </div>

//             {/* Theme Toggle - Responsive */}
//             <button
//               onClick={() => dispatch(toggleTheme())}
//               className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 smooth-transition"
//               aria-label="Toggle theme"
//             >
//               {darkMode ? <Sun className="w-4 h-4 sm:w-5 sm:h-5" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
//             </button>

//             {/* Auth Buttons / User Menu - Responsive */}
//             {isAuthenticated && user ? (
//               <div className="relative" ref={userDropdownRef}>
//                 <button
//                   onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
//                   className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 smooth-transition"
//                   aria-label="User menu"
//                 >
//                   <div className="w-7 h-7 sm:w-8 sm:h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
//                     {user.name.charAt(0).toUpperCase()}
//                   </div>
//                   <span className="hidden md:block text-sm font-medium max-w-24 lg:max-w-32 truncate">
//                     {user.name}
//                   </span>
//                 </button>

//                 {isUserDropdownOpen && (
//                   <motion.div
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className="absolute right-0 mt-2 w-44 sm:w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
//                   >
//                     <Link
//                       to="/dashboard"
//                       className="flex items-center space-x-2 px-3 sm:px-4 py-2 sm:py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 smooth-transition"
//                       onClick={() => setIsUserDropdownOpen(false)}
//                     >
//                       <User className="w-4 h-4" />
//                       <span>{t('nav.dashboard')}</span>
//                     </Link>
//                     <Link
//                       to="/profile"
//                       className="flex items-center space-x-2 px-3 sm:px-4 py-2 sm:py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 smooth-transition"
//                       onClick={() => setIsUserDropdownOpen(false)}
//                     >
//                       <User className="w-4 h-4" />
//                       <span>{t('nav.profile')}</span>
//                     </Link>
//                     <Link
//                       to="/settings"
//                       className="flex items-center space-x-2 px-3 sm:px-4 py-2 sm:py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 smooth-transition"
//                       onClick={() => setIsUserDropdownOpen(false)}
//                     >
//                       <Settings className="w-4 h-4" />
//                       <span>{t('nav.settings')}</span>
//                     </Link>
//                     <div className="border-t border-gray-100 dark:border-gray-700">
//                       <button
//                         onClick={handleLogout}
//                         className="flex items-center space-x-2 w-full px-3 sm:px-4 py-2 sm:py-3 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 smooth-transition"
//                       >
//                         <LogOut className="w-4 h-4" />
//                         <span>{t('nav.logout')}</span>
//                       </button>
//                     </div>
//                   </motion.div>
//                 )}
//               </div>
//             ) : (
//               <div className="hidden lg:flex items-center space-x-2 xl:space-x-3">
//                 <Link
//                   to="/login"
//                   className="px-3 xl:px-4 py-1.5 xl:py-2 text-sm xl:text-base text-emerald-600 hover:text-emerald-700 font-medium smooth-transition"
//                 >
//                   {t('nav.login')}
//                 </Link>
//                 <Link
//                   to="/signup"
//                   className="px-3 xl:px-4 py-1.5 xl:py-2 text-sm xl:text-base bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 smooth-transition font-medium"
//                 >
//                   {t('nav.signup')}
//                 </Link>
//               </div>
//             )}

//             {/* Mobile Menu Button - Only visible on mobile/tablet */}
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="lg:hidden p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 smooth-transition"
//               data-mobile-menu-trigger
//               aria-label="Toggle mobile menu"
//             >
//               {isMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu - Enhanced responsiveness */}
//         {isMenuOpen && (
//           <motion.div
//             ref={mobileMenuRef}
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: 'auto' }}
//             exit={{ opacity: 0, height: 0 }}
//             className="lg:hidden py-3 sm:py-4 border-t border-gray-200 dark:border-gray-700"
//           >
//             <div className="flex flex-col space-y-1">
//               {/* Navigation Links */}
//               <Link 
//                 to="/" 
//                 className="px-3 sm:px-4 py-2.5 sm:py-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg smooth-transition text-sm sm:text-base font-medium"
//                 onClick={closeMobileMenu}
//               >
//                 {t('nav.home')}
//               </Link>
//               <Link 
//                 to="/features" 
//                 className="px-3 sm:px-4 py-2.5 sm:py-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg smooth-transition text-sm sm:text-base font-medium"
//                 onClick={closeMobileMenu}
//               >
//                 {t('nav.features')}
//               </Link>
//               <Link 
//                 to="/hospitals" 
//                 className="px-3 sm:px-4 py-2.5 sm:py-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg smooth-transition text-sm sm:text-base font-medium"
//                 onClick={closeMobileMenu}
//               >
//                 {t('nav.hospitals')}
//               </Link>
//               <Link 
//                 to="/outbreak-alerts" 
//                 className="px-3 sm:px-4 py-2.5 sm:py-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg smooth-transition text-sm sm:text-base font-medium flex items-center space-x-2"
//                 onClick={closeMobileMenu}
//               >
//                 <span>{t('nav.outbreak')}</span>
//                 <Activity className="w-3 h-3 text-red-500 pulse-animation" />
//               </Link>
              
//               {/* User Menu Items for Mobile (when authenticated) */}
//               {isAuthenticated && user && (
//                 <>
//                   <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
//                   <div className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">
//                     Account
//                   </div>
//                   <Link
//                     to="/dashboard"
//                     className="px-3 sm:px-4 py-2.5 sm:py-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg smooth-transition text-sm sm:text-base font-medium flex items-center space-x-2"
//                     onClick={closeMobileMenu}
//                   >
//                     <User className="w-4 h-4" />
//                     <span>{t('nav.dashboard')}</span>
//                   </Link>
//                   <Link
//                     to="/profile"
//                     className="px-3 sm:px-4 py-2.5 sm:py-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg smooth-transition text-sm sm:text-base font-medium flex items-center space-x-2"
//                     onClick={closeMobileMenu}
//                   >
//                     <User className="w-4 h-4" />
//                     <span>{t('nav.profile')}</span>
//                   </Link>
//                   <Link
//                     to="/settings"
//                     className="px-3 sm:px-4 py-2.5 sm:py-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg smooth-transition text-sm sm:text-base font-medium flex items-center space-x-2"
//                     onClick={closeMobileMenu}
//                   >
//                     <Settings className="w-4 h-4" />
//                     <span>{t('nav.settings')}</span>
//                   </Link>
//                   <button
//                     onClick={handleLogout}
//                     className="px-3 sm:px-4 py-2.5 sm:py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg smooth-transition text-sm sm:text-base font-medium flex items-center space-x-2 w-full text-left"
//                   >
//                     <LogOut className="w-4 h-4" />
//                     <span>{t('nav.logout')}</span>
//                   </button>
//                 </>
//               )}
              
//               {/* Auth Buttons for Mobile (when not authenticated) */}
//               {!isAuthenticated && (
//                 <div className="pt-2 border-t border-gray-200 dark:border-gray-700 space-y-2">
//                   <Link 
//                     to="/login" 
//                     className="block px-3 sm:px-4 py-2.5 sm:py-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg smooth-transition text-sm sm:text-base font-medium text-center"
//                     onClick={closeMobileMenu}
//                   >
//                     {t('nav.login')}
//                   </Link>
//                   <Link 
//                     to="/signup" 
//                     className="block px-3 sm:px-4 py-2.5 sm:py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 smooth-transition text-sm sm:text-base font-medium text-center"
//                     onClick={closeMobileMenu}
//                   >
//                     {t('nav.signup')}
//                   </Link>
//                 </div>
//               )}
//             </div>
//           </motion.div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState, useEffect, useRef } from 'react';
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
  const { t, language, changeLanguage } = useTranslation();
  
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const { darkMode } = useSelector((state: RootState) => state.theme);
  const { currentLanguage } = useSelector((state: RootState) => state.language);

  // Refs for dropdown management
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'ml', name: 'മലയാളം', flag: '🇮🇳' },
    { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangDropdownOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setIsUserDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        const target = event.target as Element;
        if (!target.closest('[data-mobile-menu-trigger]')) {
          setIsMenuOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLanguageChange = (langCode: 'en' | 'hi' | 'ml' | 'bn') => {
    changeLanguage(langCode);
    localStorage.setItem('language', langCode);
    dispatch(setLanguage(langCode));
    setIsLangDropdownOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setIsUserDropdownOpen(false);
    setIsMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 glass-card shadow-lg">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo - Responsive sizing */}
          <Link to="/" className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-1 sm:space-x-2"
            >
              <div className="relative">
                <img 
                  src="logo.Aro.svg" 
                  alt="logo" 
                  className='h-8 sm:h-10 w-auto' 
                />
              </div>
              <div className="hidden xs:block sm:block">
                <img 
                  src="logo.svg" 
                  alt="" 
                  className='h-5 sm:h-7 w-auto mb-1 ml-0'
                />
                <div className="text-xs sm:text-xs text-gray-600 dark:text-gray-400 -mt-1 whitespace-nowrap">
                  Kerala Health System
                </div>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation - Hidden on mobile/tablet */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <Link 
              to="/" 
              className="text-sm xl:text-base text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 smooth-transition font-medium"
            >
              {t('nav.home')}
            </Link>
            <Link 
              to="/features" 
              className="text-sm xl:text-base text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 smooth-transition font-medium"
            >
              {t('nav.features')}
            </Link>
            <Link 
              to="/hospitals" 
              className="text-sm xl:text-base text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 smooth-transition font-medium"
            >
              {t('nav.hospitals')}
            </Link>
            <Link 
              to="/outbreak-alerts" 
              className="text-sm xl:text-base text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 smooth-transition relative font-medium"
            >
              {t('nav.outbreakAlerts')}
              <Activity className="w-3 h-3 text-red-500 absolute -top-1 -right-1 pulse-animation" />
            </Link>
          </div>

          {/* Right Side Actions - Responsive spacing */}
          <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4">
            {/* Language Switcher - Responsive */}
            <div className="relative" ref={langDropdownRef}>
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center space-x-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 smooth-transition"
                aria-label="Language selector"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium hidden xs:inline">
                  {languages.find(l => l.code === (language || currentLanguage))?.flag}
                </span>
              </button>
              
              {isLangDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-40 sm:w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
                >
                  {languages.map((lang) => (
                    <div
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code as 'en' | 'hi' | 'ml' | 'bn')}
                      className={`flex items-center space-x-2 px-3 sm:px-4 py-2 sm:py-3 text-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 smooth-transition ${
                        (language || currentLanguage) === lang.code ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600' : 'text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <span className="text-base">{lang.flag}</span>
                      <span className="font-medium">{lang.name}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Theme Toggle - Responsive */}
            <button
              onClick={() => dispatch(toggleTheme())}
              className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 smooth-transition"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="w-4 h-4 sm:w-5 sm:h-5" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>

            {/* Auth Buttons / User Menu - Responsive */}
            {isAuthenticated && user ? (
              <div className="relative" ref={userDropdownRef}>
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 smooth-transition"
                  aria-label="User menu"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden md:block text-sm font-medium max-w-24 lg:max-w-32 truncate">
                    {user.name}
                  </span>
                </button>

                {isUserDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-44 sm:w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
                  >
                    <Link
                      to="/dashboard"
                      className="flex items-center space-x-2 px-3 sm:px-4 py-2 sm:py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 smooth-transition"
                      onClick={() => setIsUserDropdownOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      <span>{t('nav.dashboard')}</span>
                    </Link>
                    <Link
                      to="/profile"
                      className="flex items-center space-x-2 px-3 sm:px-4 py-2 sm:py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 smooth-transition"
                      onClick={() => setIsUserDropdownOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      <span>{t('nav.profile')}</span>
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center space-x-2 px-3 sm:px-4 py-2 sm:py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 smooth-transition"
                      onClick={() => setIsUserDropdownOpen(false)}
                    >
                      <Settings className="w-4 h-4" />
                      <span>{t('nav.settings')}</span>
                    </Link>
                    <div className="border-t border-gray-100 dark:border-gray-700">
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 w-full px-3 sm:px-4 py-2 sm:py-3 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 smooth-transition"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>{t('nav.logout')}</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            ) : (
              <div className="hidden lg:flex items-center space-x-2 xl:space-x-3">
                <Link
                  to="/login"
                  className="px-3 xl:px-4 py-1.5 xl:py-2 text-sm xl:text-base text-emerald-600 hover:text-emerald-700 font-medium smooth-transition"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  to="/signup"
                  className="px-3 xl:px-4 py-1.5 xl:py-2 text-sm xl:text-base bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 smooth-transition font-medium"
                >
                  {t('nav.signup')}
                </Link>
              </div>
            )}

            {/* Mobile Menu Button - Only visible on mobile/tablet */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 smooth-transition"
              data-mobile-menu-trigger
              aria-label="Toggle mobile menu"
            >
              {isMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Enhanced responsiveness */}
        {isMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden py-3 sm:py-4 border-t border-gray-200 dark:border-gray-700"
          >
            <div className="flex flex-col space-y-1">
              {/* Navigation Links */}
              <Link 
                to="/" 
                className="px-3 sm:px-4 py-2.5 sm:py-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg smooth-transition text-sm sm:text-base font-medium"
                onClick={closeMobileMenu}
              >
                {t('nav.home')}
              </Link>
              <Link 
                to="/features" 
                className="px-3 sm:px-4 py-2.5 sm:py-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg smooth-transition text-sm sm:text-base font-medium"
                onClick={closeMobileMenu}
              >
                {t('nav.features')}
              </Link>
              <Link 
                to="/hospitals" 
                className="px-3 sm:px-4 py-2.5 sm:py-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg smooth-transition text-sm sm:text-base font-medium"
                onClick={closeMobileMenu}
              >
                {t('nav.hospitals')}
              </Link>
              <Link 
                to="/outbreak-alerts" 
                className="px-3 sm:px-4 py-2.5 sm:py-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg smooth-transition text-sm sm:text-base font-medium flex items-center space-x-2"
                onClick={closeMobileMenu}
              >
                <span>{t('nav.outbreak')}</span>
                <Activity className="w-3 h-3 text-red-500 pulse-animation" />
              </Link>
              
              {/* User Menu Items for Mobile (when authenticated) */}
              {isAuthenticated && user && (
                <>
                  <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                  <div className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">
                    Account
                  </div>
                  <Link
                    to="/dashboard"
                    className="px-3 sm:px-4 py-2.5 sm:py-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg smooth-transition text-sm sm:text-base font-medium flex items-center space-x-2"
                    onClick={closeMobileMenu}
                  >
                    <User className="w-4 h-4" />
                    <span>{t('nav.dashboard')}</span>
                  </Link>
                  <Link
                    to="/profile"
                    className="px-3 sm:px-4 py-2.5 sm:py-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg smooth-transition text-sm sm:text-base font-medium flex items-center space-x-2"
                    onClick={closeMobileMenu}
                  >
                    <User className="w-4 h-4" />
                    <span>{t('nav.profile')}</span>
                  </Link>
                  <Link
                    to="/settings"
                    className="px-3 sm:px-4 py-2.5 sm:py-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg smooth-transition text-sm sm:text-base font-medium flex items-center space-x-2"
                    onClick={closeMobileMenu}
                  >
                    <Settings className="w-4 h-4" />
                    <span>{t('nav.settings')}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-3 sm:px-4 py-2.5 sm:py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg smooth-transition text-sm sm:text-base font-medium flex items-center space-x-2 w-full text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{t('nav.logout')}</span>
                  </button>
                </>
              )}
              
              {/* Auth Buttons for Mobile (when not authenticated) */}
              {!isAuthenticated && (
                <div className="pt-2 border-t border-gray-200 dark:border-gray-700 space-y-2">
                  <Link 
                    to="/login" 
                    className="block px-3 sm:px-4 py-2.5 sm:py-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg smooth-transition text-sm sm:text-base font-medium text-center"
                    onClick={closeMobileMenu}
                  >
                    {t('nav.login')}
                  </Link>
                  <Link 
                    to="/signup" 
                    className="block px-3 sm:px-4 py-2.5 sm:py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 smooth-transition text-sm sm:text-base font-medium text-center"
                    onClick={closeMobileMenu}
                  >
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