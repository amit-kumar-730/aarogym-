// import React, { useEffect } from 'react';
// import { motion } from 'framer-motion';
// import AOS from 'aos';
// import { useTranslation } from '../hooks/useTranslation';
// import { 
//   Shield, 
//   Activity, 
//   Bot, 
//   Award, 
//   QrCode, 
//   MapPin, 
//   Users, 
//   Heart,
//   Globe,
//   Smartphone,
//   Zap,
//   CheckCircle,
//   Star,
//   AlertTriangle,
//   Camera,
//   Database,
//   Lock,
//   Bell,
//   Search,
//   MessageSquare
// } from 'lucide-react';

// const Features: React.FC = () => {
//   const { t } = useTranslation();

//   useEffect(() => {
//     AOS.init({
//       duration: 1000,
//       once: true,
//       easing: 'ease-out-cubic',
//     });
//   }, []);

//   const mainFeatures = [
//     {
//       icon: QrCode,
//       title: 'QR-Enabled Health Cards',
//       description: 'Generate secure digital health cards with QR codes for instant access to medical records.',
//       features: ['Photo-based ID verification', 'Encrypted data storage', 'Offline QR scanning', 'Multi-language support'],
//       color: 'text-emerald-600',
//       bgColor: 'bg-emerald-100 dark:bg-emerald-900/20',
//       image: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg'
//     },
//     {
//       icon: Globe,
//       title: 'Multilingual Support',
//       description: 'Complete website and app interface available in 4 languages for better accessibility.',
//       features: ['English, Hindi, Malayalam, Bengali', 'Real-time language switching', 'Cultural adaptation', 'Voice assistance'],
//       color: 'text-blue-600',
//       bgColor: 'bg-blue-100 dark:bg-blue-900/20',
//       image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg'
//     },
//     {
//       icon: AlertTriangle,
//       title: 'Outbreak Prevention Alerts',
//       description: 'Real-time disease outbreak notifications with prevention guidelines and safety measures.',
//       features: ['Live disease tracking', 'Location-based alerts', 'Prevention guidelines', 'Emergency contacts'],
//       color: 'text-red-600',
//       bgColor: 'bg-red-100 dark:bg-red-900/20',
//       image: 'https://images.pexels.com/photos/3992933/pexels-photo-3992933.jpeg'
//     },
//     {
//       icon: Award,
//       title: 'Hospital Leaderboard',
//       description: 'Transparent hospital ratings and performance metrics to help choose the best healthcare.',
//       features: ['Performance ratings', 'Patient reviews', 'Service quality metrics', 'Certification badges'],
//       color: 'text-amber-600',
//       bgColor: 'bg-amber-100 dark:bg-amber-900/20',
//       image: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg'
//     },
//     {
//       icon: MapPin,
//       title: 'Location-Based Healthcare',
//       description: 'Find nearby hospitals, clinics, and healthcare services with integrated mapping.',
//       features: ['GPS-based search', 'Distance calculation', 'Real-time availability', 'Appointment booking'],
//       color: 'text-purple-600',
//       bgColor: 'bg-purple-100 dark:bg-purple-900/20',
//       image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg'
//     },
//     {
//       icon: Bot,
//       title: 'AI Health Assistant',
//       description: 'Intelligent chatbot providing 24/7 health guidance and medical information.',
//       features: ['Symptom checker', 'Medicine information', 'Emergency guidance', 'Appointment scheduling'],
//       color: 'text-indigo-600',
//       bgColor: 'bg-indigo-100 dark:bg-indigo-900/20',
//       image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg'
//     }
//   ];

//   const technicalFeatures = [
//     {
//       icon: Shield,
//       title: 'Advanced Security',
//       description: 'End-to-end encryption and secure data handling',
//       items: ['256-bit encryption', 'Biometric authentication', 'Secure API endpoints', 'GDPR compliance']
//     },
//     {
//       icon: Database,
//       title: 'Data Management',
//       description: 'Comprehensive health record management system',
//       items: ['Cloud storage', 'Backup & recovery', 'Data analytics', 'Export capabilities']
//     },
//     {
//       icon: Smartphone,
//       title: 'Mobile Optimized',
//       description: 'Responsive design for all devices and platforms',
//       items: ['Progressive Web App', 'Offline functionality', 'Push notifications', 'Cross-platform']
//     },
//     {
//       icon: Bell,
//       title: 'Smart Notifications',
//       description: 'Intelligent alert system for health updates',
//       items: ['Appointment reminders', 'Medication alerts', 'Health tips', 'Emergency notifications']
//     }
//   ];

//   const benefits = [
//     'Instant access to health records anywhere in Kerala',
//     'Reduced paperwork and administrative burden',
//     'Better coordination between healthcare providers',
//     'Improved emergency response times',
//     'Enhanced disease surveillance and prevention',
//     'Transparent healthcare quality assessment'
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
//       {/* Hero Section */}
//       <section className="relative overflow-hidden pt-24 pb-16">
//         <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-blue-600/10" />
        
//         <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="text-center max-w-4xl mx-auto"
//           >
//             <div className="inline-flex items-center space-x-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-md mb-6">
//               <Zap className="w-5 h-5 text-emerald-600" />
//               <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
//                 Advanced Healthcare Technology
//               </span>
//             </div>

//             <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
//               Comprehensive Health
//               <span className="text-gradient block">Features & Solutions</span>
//             </h1>

//             <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
//               Discover how Aarogyam revolutionizes healthcare access for migrant workers with 
//               cutting-edge technology, multilingual support, and transparent healthcare services.
//             </p>

//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
//               {benefits.slice(0, 3).map((benefit, index) => (
//                 <motion.div
//                   key={benefit}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.8 + (index * 0.1) }}
//                   className="flex items-center space-x-2 text-gray-600 dark:text-gray-400"
//                 >
//                   <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
//                   <span className="text-sm">{benefit}</span>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Main Features */}
//       <section className="py-24 bg-white dark:bg-gray-800">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16" data-aos="fade-up">
//             <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
//               Core Features
//             </h2>
//             <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
//               Explore the powerful features that make Aarogyam the most comprehensive 
//               health record system for migrant workers in Kerala.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//             {mainFeatures.map((feature, index) => (
//               <motion.div
//                 key={feature.title}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: index * 0.1 }}
//                 className="bg-gray-50 dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl smooth-transition group"
//               >
//                 <div className="relative h-48 overflow-hidden">
//                   <img 
//                     src={feature.image} 
//                     alt={feature.title}
//                     className="w-full h-full object-cover group-hover:scale-105 smooth-transition"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
//                   <div className={`absolute top-4 left-4 w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center`}>
//                     <feature.icon className={`w-6 h-6 ${feature.color}`} />
//                   </div>
//                 </div>
                
//                 <div className="p-8">
//                   <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
//                     {feature.title}
//                   </h3>
//                   <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
//                     {feature.description}
//                   </p>
                  
//                   <div className="space-y-2">
//                     {feature.features.map((item, idx) => (
//                       <div key={idx} className="flex items-center space-x-2">
//                         <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
//                         <span className="text-sm text-gray-600 dark:text-gray-400">{item}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Technical Features */}
//       <section className="py-24 bg-gray-50 dark:bg-gray-900">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16" data-aos="fade-up">
//             <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
//               Technical Excellence
//             </h2>
//             <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
//               Built with cutting-edge technology to ensure security, reliability, and performance.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {technicalFeatures.map((feature, index) => (
//               <motion.div
//                 key={feature.title}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: index * 0.1 }}
//                 whileHover={{ y: -10 }}
//                 className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl smooth-transition"
//               >
//                 <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 smooth-transition">
//                   <feature.icon className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
//                 </div>
                
//                 <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
//                   {feature.title}
//                 </h3>
//                 <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
//                   {feature.description}
//                 </p>
                
//                 <ul className="space-y-2">
//                   {feature.items.map((item, idx) => (
//                     <li key={idx} className="flex items-center space-x-2">
//                       <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full" />
//                       <span className="text-sm text-gray-600 dark:text-gray-400">{item}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Benefits Section */}
//       <section className="py-24 gradient-bg text-white">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-center max-w-4xl mx-auto"
//           >
//             <h2 className="text-3xl lg:text-5xl font-bold mb-6">
//               Why Choose Aarogyam?
//             </h2>
//             <p className="text-xl mb-12 opacity-90">
//               Experience the benefits of modern healthcare technology designed specifically 
//               for migrant workers in Kerala.
//             </p>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {benefits.map((benefit, index) => (
//                 <motion.div
//                   key={benefit}
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: index * 0.1 }}
//                   className="bg-white/10 backdrop-blur rounded-lg p-6 hover:bg-white/20 smooth-transition"
//                 >
//                   <CheckCircle className="w-8 h-8 text-emerald-300 mb-4 mx-auto" />
//                   <p className="text-white/90">{benefit}</p>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-24 bg-white dark:bg-gray-800">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="max-w-3xl mx-auto"
//           >
//             <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
//               Ready to Get Started?
//             </h2>
//             <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
//               Join thousands of migrant workers who trust Aarogyam for their healthcare needs.
//             </p>
            
//             <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="inline-flex items-center px-8 py-4 bg-emerald-600 text-white font-bold rounded-lg shadow-lg hover:bg-emerald-700 smooth-transition space-x-2"
//               >
//                 <QrCode className="w-5 h-5" />
//                 <span>Generate Health Card</span>
//               </motion.button>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="inline-flex items-center px-8 py-4 border-2 border-emerald-600 text-emerald-600 font-semibold rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 smooth-transition space-x-2"
//               >
//                 <MapPin className="w-5 h-5" />
//                 <span>Find Hospitals</span>
//               </motion.button>
//             </div>
//           </motion.div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Features;

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import { useTranslation } from '../hooks/useTranslation';
import { 
  Shield, 
  Activity, 
  Bot, 
  Award, 
  QrCode, 
  MapPin, 
  Users, 
  Heart,
  Globe,
  Smartphone,
  Zap,
  CheckCircle,
  Star,
  AlertTriangle,
  Camera,
  Database,
  Lock,
  Bell,
  Search,
  MessageSquare
} from 'lucide-react';

const Features: React.FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  const mainFeatures = [
    {
      icon: QrCode,
      title: t('features.qrSystem.title') || 'QR-Enabled Health Cards',
      description: t('features.qrSystem.description') || 'Generate secure digital health cards with QR codes for instant access to medical records.',
      features: [
        t('features.qrSystem.details.instant') || 'Photo-based ID verification',
        t('features.qrSystem.details.offline') || 'Encrypted data storage',
        t('features.qrSystem.details.universal') || 'Offline QR scanning',
        'Multi-language support'
      ],
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100 dark:bg-emerald-900/20',
      image: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg'
    },
    {
      icon: Globe,
      title: t('features.multilingual.title') || 'Multilingual Support',
      description: t('features.multilingual.description') || 'Complete website and app interface available in 4 languages for better accessibility.',
      features: [
        t('features.multilingual.details.languages') || 'English, Hindi, Malayalam, Bengali',
        t('features.multilingual.details.realtime') || 'Real-time language switching',
        t('features.multilingual.details.cultural') || 'Cultural adaptation',
        'Voice assistance'
      ],
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20',
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg'
    },
    {
      icon: AlertTriangle,
      title: t('features.outbreakAlerts.title') || 'Outbreak Prevention Alerts',
      description: t('features.outbreakAlerts.description') || 'Real-time disease outbreak notifications with prevention guidelines and safety measures.',
      features: [
        t('features.outbreakAlerts.details.realtime') || 'Live disease tracking',
        t('features.outbreakAlerts.details.location') || 'Location-based alerts',
        t('features.outbreakAlerts.details.prevention') || 'Prevention guidelines',
        'Emergency contacts'
      ],
      color: 'text-red-600',
      bgColor: 'bg-red-100 dark:bg-red-900/20',
      image: 'https://images.pexels.com/photos/3992933/pexels-photo-3992933.jpeg'
    },
    {
      icon: Award,
      title: 'Hospital Leaderboard',
      description: 'Transparent hospital ratings and performance metrics to help choose the best healthcare.',
      features: ['Performance ratings', 'Patient reviews', 'Service quality metrics', 'Certification badges'],
      color: 'text-amber-600',
      bgColor: 'bg-amber-100 dark:bg-amber-900/20',
      image: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg'
    },
    {
      icon: MapPin,
      title: t('features.hospitalNetwork.title') || 'Location-Based Healthcare',
      description: t('features.hospitalNetwork.description') || 'Find nearby hospitals, clinics, and healthcare services with integrated mapping.',
      features: [
        'GPS-based search',
        'Distance calculation',
        'Real-time availability',
        'Appointment booking'
      ],
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20',
      image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg'
    },
    {
      icon: Bot,
      title: t('features.aiChatbot.title') || 'AI Health Assistant',
      description: t('features.aiChatbot.description') || 'Intelligent chatbot providing 24/7 health guidance and medical information.',
      features: [
        t('features.aiChatbot.details.available') || 'Symptom checker',
        'Medicine information',
        'Emergency guidance',
        'Appointment scheduling'
      ],
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100 dark:bg-indigo-900/20',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg'
    }
  ];

  const technicalFeatures = [
    {
      icon: Shield,
      title: t('features.technical.security.title') || 'Advanced Security',
      description: t('features.technical.security.description') || 'End-to-end encryption and secure data handling',
      items: ['256-bit encryption', 'Biometric authentication', 'Secure API endpoints', 'GDPR compliance']
    },
    {
      icon: Database,
      title: 'Data Management',
      description: 'Comprehensive health record management system',
      items: ['Cloud storage', 'Backup & recovery', 'Data analytics', 'Export capabilities']
    },
    {
      icon: Smartphone,
      title: t('features.technical.mobile.title') || 'Mobile Optimized',
      description: t('features.technical.mobile.description') || 'Responsive design for all devices and platforms',
      items: ['Progressive Web App', 'Offline functionality', 'Push notifications', 'Cross-platform']
    },
    {
      icon: Bell,
      title: 'Smart Notifications',
      description: 'Intelligent alert system for health updates',
      items: ['Appointment reminders', 'Medication alerts', 'Health tips', 'Emergency notifications']
    }
  ];

  const benefits = [
    'Instant access to health records anywhere in Kerala',
    'Reduced paperwork and administrative burden',
    'Better coordination between healthcare providers',
    'Improved emergency response times',
    'Enhanced disease surveillance and prevention',
    'Transparent healthcare quality assessment'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-16">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-blue-600/10" />
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center space-x-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-md mb-6">
              <Zap className="w-5 h-5 text-emerald-600" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Advanced Healthcare Technology
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {t('features.hero.title') || 'Comprehensive Health'}
              <span className="text-gradient block">Features & Solutions</span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              {t('features.hero.description') || 'Discover how Aarogyam revolutionizes healthcare access for migrant workers with cutting-edge technology, multilingual support, and transparent healthcare services.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
              {benefits.slice(0, 3).map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + (index * 0.1) }}
                  className="flex items-center space-x-2 text-gray-600 dark:text-gray-400"
                >
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="text-sm">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-24 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {t('features.main.title') || 'Core Features'}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {t('features.main.description') || 'Explore the powerful features that make Aarogyam the most comprehensive health record system for migrant workers in Kerala.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {mainFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl smooth-transition group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-105 smooth-transition"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className={`absolute top-4 left-4 w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center`}>
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <div className="space-y-2">
                    {feature.features.map((item, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Features */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {t('features.technical.title') || 'Technical Excellence'}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {t('features.technical.description') || 'Built with cutting-edge technology to ensure security, reliability, and performance.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {technicalFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl smooth-transition"
              >
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 smooth-transition">
                  <feature.icon className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  {feature.description}
                </p>
                
                <ul className="space-y-2">
                  {feature.items.map((item, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 gradient-bg text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Why Choose Aarogyam?
            </h2>
            <p className="text-xl mb-12 opacity-90">
              Experience the benefits of modern healthcare technology designed specifically 
              for migrant workers in Kerala.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur rounded-lg p-6 hover:bg-white/20 smooth-transition"
                >
                  <CheckCircle className="w-8 h-8 text-emerald-300 mb-4 mx-auto" />
                  <p className="text-white/90">{benefit}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {t('features.cta.title') || 'Ready to Get Started?'}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              {t('features.cta.description') || 'Join thousands of migrant workers who trust Aarogyam for their healthcare needs.'}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-emerald-600 text-white font-bold rounded-lg shadow-lg hover:bg-emerald-700 smooth-transition space-x-2"
              >
                <QrCode className="w-5 h-5" />
                <span>{t('features.cta.getStarted') || 'Generate Health Card'}</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 border-2 border-emerald-600 text-emerald-600 font-semibold rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 smooth-transition space-x-2"
              >
                <MapPin className="w-5 h-5" />
                <span>{t('features.cta.learnMore') || 'Find Hospitals'}</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Features;