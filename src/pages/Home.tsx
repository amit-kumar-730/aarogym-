import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AOS from 'aos';
import { useTranslation } from '../hooks/useTranslation';
import { Shield, Activity, Bot, Award, ArrowRight, QrCode, MapPin, Users, Heart,CheckCircle,Globe,Smartphone,Zap,Info,Copy, Check, Key, Mail, Lock} from 'lucide-react';

const Home: React.FC = () => {
  const { t } = useTranslation();
  const [copiedItems, setCopiedItems] = useState<{ [key: string]: boolean }>({});

  const handleCopy = async (text: string, itemKey: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItems(prev => ({ ...prev, [itemKey]: true }));
      
      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setCopiedItems(prev => ({ ...prev, [itemKey]: false }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  const features = [
    {
      icon: Shield,
      title: t('features.secure'),
      description: t('features.secure.desc'),
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100 dark:bg-emerald-900/20',
    },
    {
      icon: Activity,
      title: t('features.alerts'),
      description: t('features.alerts.desc'),
      color: 'text-red-600',
      bgColor: 'bg-red-100 dark:bg-red-900/20',
    },
    {
      icon: Bot,
      title: t('features.chatbot'),
      description: t('features.chatbot.desc'),
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20',
    },
    {
      icon: Award,
      title: t('features.transparency'),
      description: t('features.transparency.desc'),
      color: 'text-amber-600',
      bgColor: 'bg-amber-100 dark:bg-amber-900/20',
    },
  ];

  const stats = [
    { number: '50,000+', label: 'Migrant Workers Registered', icon: Users },
    { number: '200+', label: 'Partner Hospitals', icon: Heart },
    { number: '24/7', label: 'Health Support', icon: Activity },
    { number: '4', label: 'Languages Supported', icon: Globe },
  ];

  const benefits = [
    'Instant QR-based health record access',
    'Multilingual support in 4 languages',
    'Real-time outbreak alerts and notifications',
    'Transparent hospital ratings and reviews',
    'AI-powered health assistance',
    'Emergency contact integration ',
  ];

  // Credential data for easier management
  const credentials = [
    {
      type: 'MIGRANT',
      icon: '👤',
      email: 'rajeshkumar12@gmail.com',
      password: '12345678',
      borderColor: 'border-emerald-200 dark:border-emerald-700',
      textColor: 'text-emerald-700 dark:text-emerald-300'
    },
    {
      type: 'HOSPITAL',
      icon: '🏥',
      email: 'hospital12@gmail.com',
      password: 'hospital12',
      borderColor: 'border-blue-200 dark:border-blue-700',
      textColor: 'text-blue-700 dark:text-blue-300'
    },
    {
      type: 'ADMIN',
      icon: '⚙️',
      email: 'admin123@gmail.com',
      password: '123456',
      borderColor: 'border-purple-200 dark:border-purple-700',
      textColor: 'text-purple-700 dark:text-purple-300'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Login Credentials Banner */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative bg-gradient-to-r from-amber-100 via-yellow-100 to-orange-100 dark:from-amber-900/30 dark:via-yellow-900/30 dark:to-orange-900/30 border-b-2 border-amber-300 dark:border-amber-600 overflow-hidden"
      >
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-20">
          <motion.div 
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "easeInOut"
            }}
          />
        </div>
        
        <div className="container mx-auto px-2 sm:px-4 lg:px-6 py-3 relative">
          {/* Header */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center justify-center mb-3"
          >
            <motion.div 
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3
              }}
              className="flex items-center space-x-2"
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Key className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </motion.div>
                <motion.div 
                  className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </div>
              <motion.span 
                className="text-sm sm:text-base font-bold text-amber-800 dark:text-amber-200"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🔑 DEMO LOGIN CREDENTIALS
              </motion.span>
            </motion.div>
          </motion.div>
          
          {/* Credentials Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 sm:gap-3">
            {credentials.map((cred, index) => (
              <motion.div
                key={cred.type}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
                }}
                className={`bg-white/90 dark:bg-gray-800/90 backdrop-blur rounded-lg px-2 sm:px-3 py-2 border-2 ${cred.borderColor} shadow-md hover:shadow-lg transition-all duration-300`}
              >
                <div className="space-y-2">
                  {/* Header */}
                  <motion.div 
                    className="flex items-center justify-center space-x-1"
                    animate={{ y: [0, -2, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  >
                    <span className="text-sm sm:text-base">{cred.icon}</span>
                    <span className={`font-bold text-xs sm:text-sm ${cred.textColor}`}>
                      {cred.type}
                    </span>
                  </motion.div>
                  
                  {/* Credentials in single line */}
                  <div className="flex items-center justify-center space-x-1 text-xs">
                    <div className="flex items-center space-x-1">
                      <Mail className="w-3 h-3 text-gray-500 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300 font-mono bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded">
                        {cred.email}
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleCopy(cred.email, `${cred.type.toLowerCase()}-email`)}
                        className="p-0.5 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        title="Copy email"
                      >
                        <motion.div
                          animate={copiedItems[`${cred.type.toLowerCase()}-email`] ? { scale: [1, 1.2, 1] } : {}}
                          transition={{ duration: 0.3 }}
                        >
                          {copiedItems[`${cred.type.toLowerCase()}-email`] ? (
                            <Check className="w-2.5 h-2.5 text-green-600" />
                          ) : (
                            <Copy className="w-2.5 h-2.5 text-gray-500" />
                          )}
                        </motion.div>
                      </motion.button>
                    </div>
                    
                    <span className="text-gray-400 mx-1">|</span>
                    
                    <div className="flex items-center space-x-1">
                      <Lock className="w-3 h-3 text-red-500 flex-shrink-0" />
                      <motion.span 
                        className="font-mono font-bold text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-900/30 px-1 py-0.5 rounded border border-red-300 dark:border-red-600"
                        animate={{ 
                          boxShadow: [
                            "0 0 0px rgba(239, 68, 68, 0.3)",
                            "0 0 8px rgba(239, 68, 68, 0.5)",
                            "0 0 0px rgba(239, 68, 68, 0.3)"
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                      >
                        {cred.password}
                      </motion.span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleCopy(cred.password, `${cred.type.toLowerCase()}-password`)}
                        className="p-0.5 rounded hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                        title="Copy password"
                      >
                        <motion.div
                          animate={copiedItems[`${cred.type.toLowerCase()}-password`] ? { scale: [1, 1.2, 1] } : {}}
                          transition={{ duration: 0.3 }}
                        >
                          {copiedItems[`${cred.type.toLowerCase()}-password`] ? (
                            <Check className="w-2.5 h-2.5 text-green-600" />
                          ) : (
                            <Copy className="w-2.5 h-2.5 text-red-500" />
                          )}
                        </motion.div>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Bottom indicator */}
          <motion.div 
            className="flex justify-center mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.div
              className="flex space-x-1"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-amber-500 rounded-full"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Rest of your home component content goes here */}
      {/* Add your existing JSX content below this comment */}
      
    
      

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-blue-600/10" />
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-12 lg:space-y-0 lg:space-x-12">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-1 text-center lg:text-left"
            >
              {/* Kerala Government Badge */}
              <div className="inline-flex items-center space-x-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-md mb-6">
                <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center">
                  <Heart className="w-3 h-3 text-white fill-current" />
                </div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Government of Kerala Initiative
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                <span className="text-gradient">{t('hero.title').split(' – ')[0]}</span>
                <br />
                <span className="text-2xl md:text-3xl lg:text-4xl font-normal text-gray-600 dark:text-gray-300">
                  {t('hero.title').split(' – ')[1]}
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
                {t('hero.tagline')}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/health-card"
                    className="inline-flex items-center justify-center px-8 py-4 bg-emerald-600 text-white font-semibold rounded-lg shadow-lg hover:bg-emerald-700 smooth-transition space-x-2"
                  >
                    <QrCode className="w-5 h-5" />
                    <span>{t('hero.cta.card')}</span>
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/hospitals"
                    className="inline-flex items-center justify-center px-8 py-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-white font-semibold rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700 hover:border-emerald-600 dark:hover:border-emerald-400 smooth-transition space-x-2"
                  >
                    <MapPin className="w-5 h-5" />
                    <span>{t('hero.cta.hospital')}</span>
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/features"
                    className="inline-flex items-center justify-center px-8 py-4 text-emerald-600 dark:text-emerald-400 font-semibold space-x-2 hover:text-emerald-700 dark:hover:text-emerald-300 smooth-transition"
                  >
                    <span>{t('hero.cta.learn')}</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </motion.div>
              </div>

              {/* Key Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl">
                {benefits.map((benefit, index) => (
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

            {/* Hero Image/Animation */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-1 relative"
            >
              <div className="relative w-full max-w-lg mx-auto">
                {/* Main Device */}
                <div className="relative">
                  <div className="w-80 h-96 mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border-8 border-gray-200 dark:border-gray-700 overflow-hidden floating-animation">
                    {/* Screen Content */}
                    <div className="h-full bg-gradient-to-br from-emerald-500 to-blue-600 relative">
                      {/* Status Bar */}
                      <div className="flex justify-between items-center px-6 pt-4 text-white text-sm">
                        <span>9:41</span>
                        <div className="flex space-x-1">
                          <div className="w-4 h-2 bg-white rounded-full" />
                          <div className="w-1 h-2 bg-white rounded-full" />
                          <div className="w-4 h-2 bg-white rounded-full" />
                        </div>
                      </div>
                      
                      {/* App Content */}
                      <div className="px-6 pt-8 text-white">
                        <div className="text-center mb-6">
                          <Heart className="w-12 h-12 mx-auto mb-4 text-white fill-current" />
                          <h3 className="text-xl font-bold">Aarogyam</h3>
                          <p className="text-sm opacity-90">Your Health, Secured</p>
                        </div>
                        
                        {/* Cards */}
                        <div className="space-y-3">
                          <div className="bg-white/20 backdrop-blur rounded-lg p-3 flex items-center space-x-3">
                            <QrCode className="w-8 h-8 text-white" />
                            <div>
                              <div className="font-medium">Health Card</div>
                              <div className="text-xs opacity-80">ID: MH2025001</div>
                            </div>
                          </div>
                          <div className="bg-white/20 backdrop-blur rounded-lg p-3 flex items-center space-x-3">
                            <MapPin className="w-8 h-8 text-white" />
                            <div>
                              <div className="font-medium">Nearby Hospitals</div>
                              <div className="text-xs opacity-80">5 hospitals found</div>
                            </div>
                          </div>
                          <div className="bg-white/20 backdrop-blur rounded-lg p-3 flex items-center space-x-3">
                            <Activity className="w-8 h-8 text-white" />
                            <div>
                              <div className="font-medium">Health Status</div>
                              <div className="text-xs opacity-80">All clear</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-emerald-200 dark:bg-emerald-800/50 rounded-full flex items-center justify-center floating-animation anim-delay-1">
                  <Shield className="w-12 h-12 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-blue-200 dark:bg-blue-800/50 rounded-full flex items-center justify-center floating-animation anim-delay-2">
                  <Zap className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="absolute top-1/2 -left-4 w-16 h-16 bg-amber-200 dark:bg-amber-800/50 rounded-full flex items-center justify-center floating-animation anim-delay-3">
                  <Bot className="w-8 h-8 text-amber-600 dark:text-amber-400" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {/*
      <section className="py-16 bg-white dark:bg-gray-800" data-aos="fade-up">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 dark:bg-emerald-900/20 rounded-full mb-4">
                  <stat.icon className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      */}

      {/* Features Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Comprehensive Health Solutions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Empowering migrant workers with digital health tools, transparent healthcare access, 
              and multilingual support across Kerala.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl smooth-transition group"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 ${feature.bgColor} group-hover:scale-110 smooth-transition`}>
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 gradient-bg text-white" data-aos="fade-up">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Ready to Secure Your Health?
            </h2>
            <p className="text-xl mb-12 opacity-90">
              Join thousands of migrant workers who trust Aarogyam for their healthcare needs. 
              Get started with your digital health card today.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/signup"
                  className="inline-flex items-center px-8 py-4 bg-white text-emerald-600 font-bold rounded-lg shadow-lg hover:bg-gray-100 smooth-transition space-x-2"
                >
                  <Smartphone className="w-5 h-5" />
                  <span>Get Started Now</span>
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/features"
                  className="inline-flex items-center px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 smooth-transition space-x-2"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;