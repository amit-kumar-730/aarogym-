import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LanguageState {
  currentLanguage: 'en' | 'hi' | 'ml' | 'bn';
  translations: Record<string, Record<string, string>>;
}

const initialState: LanguageState = {
  currentLanguage: 'en',
  translations: {
    en: {
      // Navigation
      'nav.home': 'Home',
      'nav.features': 'Features',
      'nav.hospitals': 'Hospitals',
      'nav.outbreak': 'Outbreak Alerts',
      'nav.login': 'Login',
      'nav.signup': 'Sign Up',
      'nav.dashboard': 'Dashboard',
      'nav.profile': 'Profile',
      'nav.settings': 'Settings',
      'nav.logout': 'Logout',
      
      // Hero Section
      'hero.title': 'Aarogyam – Kerala Migrant Health Record System',
      'hero.tagline': 'Secure Health, Fair Access, Safer Communities.',
      'hero.cta.card': 'Get Health Card',
      'hero.cta.hospital': 'Find Hospital',
      'hero.cta.learn': 'Learn More',
      
      // Features
      'features.secure': 'Secure Health Records',
      'features.secure.desc': 'Encrypted digital health records with QR code access',
      'features.alerts': 'Outbreak Alerts',
      'features.alerts.desc': 'Real-time disease outbreak notifications and prevention tips',
      'features.chatbot': 'AI Health Assistant',
      'features.chatbot.desc': 'Get instant health information and guidance',
      'features.transparency': 'Hospital Leaderboard',
      'features.transparency.desc': 'Transparent hospital ratings and performance metrics',
      
      // Common
      'common.loading': 'Loading...',
      'common.error': 'Error',
      'common.success': 'Success',
      'common.save': 'Save',
      'common.cancel': 'Cancel',
      'common.submit': 'Submit',
      'common.search': 'Search',
      'common.filter': 'Filter',
      'common.view': 'View',
      'common.edit': 'Edit',
      'common.delete': 'Delete',
      
      // Auth
      'auth.login': 'Login',
      'auth.signup': 'Sign Up',
      'auth.email': 'Email',
      'auth.password': 'Password',
      'auth.name': 'Full Name',
      'auth.phone': 'Phone Number',
      'auth.role': 'Role',
      'auth.migrant': 'Migrant Worker',
      'auth.hospital': 'Hospital Staff',
      'auth.admin': 'Administrator',
    },
    hi: {
      // Navigation
      'nav.home': 'होम',
      'nav.features': 'सुविधाएं',
      'nav.hospitals': 'अस्पताल',
      'nav.outbreak': 'प्रकोप अलर्ट',
      'nav.login': 'लॉगिन',
      'nav.signup': 'साइन अप',
      'nav.dashboard': 'डैशबोर्ड',
      'nav.profile': 'प्रोफ़ाइल',
      'nav.settings': 'सेटिंग्स',
      'nav.logout': 'लॉग आउट',
      
      // Hero Section
      'hero.title': 'आरोग्यम – केरल प्रवासी स्वास्थ्य रिकॉर्ड सिस्टम',
      'hero.tagline': 'सुरक्षित स्वास्थ्य, निष्पक्ष पहुंच, सुरक्षित समुदाय।',
      'hero.cta.card': 'स्वास्थ्य कार्ड प्राप्त करें',
      'hero.cta.hospital': 'अस्पताल खोजें',
      'hero.cta.learn': 'और जानें',
      
      // Features
      'features.secure': 'सुरक्षित स्वास्थ्य रिकॉर्ड',
      'features.secure.desc': 'QR कोड एक्सेस के साथ एन्क्रिप्टेड डिजिटल स्वास्थ्य रिकॉर्ड',
      'features.alerts': 'प्रकोप अलर्ट',
      'features.alerts.desc': 'वास्तविक समय रोग प्रकोप अधिसूचना और रोकथाम युक्तियां',
      'features.chatbot': 'AI स्वास्थ्य सहायक',
      'features.chatbot.desc': 'तत्काल स्वास्थ्य जानकारी और मार्गदर्शन प्राप्त करें',
      'features.transparency': 'अस्पताल लीडरबोर्ड',
      'features.transparency.desc': 'पारदर्शी अस्पताल रेटिंग और प्रदर्शन मेट्रिक्स',
    },
    ml: {
      // Navigation
      'nav.home': 'ഹോം',
      'nav.features': 'സവിശേഷതകൾ',
      'nav.hospitals': 'ആശുപത്രികൾ',
      'nav.outbreak': 'പൊട്ടിത്തെറി അലർട്ടുകൾ',
      'nav.login': 'ലോഗിൻ',
      'nav.signup': 'സൈൻ അപ്പ്',
      'nav.dashboard': 'ഡാഷ്ബോർഡ്',
      'nav.profile': 'പ്രൊഫൈൽ',
      'nav.settings': 'ക്രമീകരണങ്ങൾ',
      'nav.logout': 'ലോഗ് ഔട്ട്',
      
      // Hero Section
      'hero.title': 'ആരോഗ്യം – കേരള കുടിയേറ്റ തൊഴിലാളി ആരോഗ്യ രേഖ സംവിധാനം',
      'hero.tagline': 'സുരക്ഷിത ആരോഗ്യം, ന്യായമായ പ്രവേശനം, സുരക്ഷിത സമൂഹങ്ങൾ.',
      'hero.cta.card': 'ആരോഗ്യ കാർഡ് നേടുക',
      'hero.cta.hospital': 'ആശുപത്രി കണ്ടെത്തുക',
      'hero.cta.learn': 'കൂടുതൽ അറിയുക',
      
      // Features
      'features.secure': 'സുരക്ഷിത ആരോഗ്യ രേഖകൾ',
      'features.secure.desc': 'QR കോഡ് ആക്സസ് ഉള്ള എൻക്രിപ്റ്റഡ് ഡിജിറ്റൽ ആരോഗ്യ രേഖകൾ',
      'features.alerts': 'പൊട്ടിത്തെറി അലർട്ടുകൾ',
      'features.alerts.desc': 'തത്സമയ രോഗ പൊട്ടിത്തെറി അറിയിപ്പുകളും പ്രതിരോധ നുറുങ്ങുകളും',
      'features.chatbot': 'AI ആരോഗ്യ അസിസ്റ്റന്റ്',
      'features.chatbot.desc': 'തൽക്ഷണ ആരോഗ്യ വിവരങ്ങളും മാർഗനിർദേശവും നേടുക',
      'features.transparency': 'ആശുപത്രി ലീഡർബോർഡ്',
      'features.transparency.desc': 'സുതാര്യമായ ആശുപത്രി റേറ്റിംഗുകളും പ്രകടന മെട്രിക്സും',
    },
    bn: {
      // Navigation
      'nav.home': 'হোম',
      'nav.features': 'বৈশিষ্ট্যসমূহ',
      'nav.hospitals': 'হাসপাতালগুলি',
      'nav.outbreak': 'প্রাদুর্ভাব সতর্কতা',
      'nav.login': 'লগইন',
      'nav.signup': 'সাইন আপ',
      'nav.dashboard': 'ড্যাশবোর্ড',
      'nav.profile': 'প্রোফাইল',
      'nav.settings': 'সেটিংস',
      'nav.logout': 'লগআউট',
      
      // Hero Section
      'hero.title': 'আরোগ্যম – কেরালা প্রবাসী স্বাস্থ্য রেকর্ড সিস্টেম',
      'hero.tagline': 'নিরাপদ স্বাস্থ্য, ন্যায্য প্রবেশাধিকার, নিরাপদ সম্প্রদায়।',
      'hero.cta.card': 'স্বাস্থ্য কার্ড পান',
      'hero.cta.hospital': 'হাসপাতাল খুঁজুন',
      'hero.cta.learn': 'আরো জানুন',
      
      // Features
      'features.secure': 'নিরাপদ স্বাস্থ্য রেকর্ড',
      'features.secure.desc': 'QR কোড অ্যাক্সেস সহ এনক্রিপ্টেড ডিজিটাল স্বাস্থ্য রেকর্ড',
      'features.alerts': 'প্রাদুর্ভাব সতর্কতা',
      'features.alerts.desc': 'রিয়েল-টাইম রোগ প্রাদুর্ভাব বিজ্ঞপ্তি এবং প্রতিরোধের টিপস',
      'features.chatbot': 'AI স্বাস্থ্য সহায়ক',
      'features.chatbot.desc': 'তাৎক্ষণিক স্বাস্থ্য তথ্য এবং নির্দেশনা পান',
      'features.transparency': 'হাসপাতাল লিডারবোর্ড',
      'features.transparency.desc': 'স্বচ্ছ হাসপাতাল রেটিং এবং কর্মক্ষমতা মেট্রিক্স',
    },
  },
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<'en' | 'hi' | 'ml' | 'bn'>) => {
      state.currentLanguage = action.payload;
      localStorage.setItem('language', action.payload);
    },
    loadLanguage: (state) => {
      const saved = localStorage.getItem('language') as 'en' | 'hi' | 'ml' | 'bn';
      if (saved && ['en', 'hi', 'ml', 'bn'].includes(saved)) {
        state.currentLanguage = saved;
      }
    },
  },
});

export const { setLanguage, loadLanguage } = languageSlice.actions;
export default languageSlice.reducer;