import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from '../../hooks/useTranslation';
import { 
  Heart, 
  Shield, 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  ExternalLink
} from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  const quickLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.features'), path: '/features' },
    { name: t('nav.hospitals'), path: '/hospitals' },
    { name: 'QR Scanner', path: '/qr-scanner' },
    { name: 'Health Card', path: '/health-card' },
  ];

  const helpLinks = [
    { name: 'FAQ', path: '/faq' },
    { name: 'Help Center', path: '/help' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' },
  ];

  const emergencyNumbers = [
    { name: 'Emergency Helpline', number: '108' },
    { name: 'Health Helpline', number: '104' },
    { name: 'COVID Helpline', number: '+91 471 2552056' },
    { name: 'Women Helpline', number: '181' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <Link to="/" className="flex items-center space-x-2 mb-4">
                <div className="relative">
                  <Heart className="w-8 h-8 text-emerald-400 fill-current" />
                  <Shield className="w-4 h-4 text-blue-400 absolute -top-1 -right-1" />
                </div>
                <div>
                  <span className="text-xl font-bold text-emerald-400">Aarogyam</span>
                  <div className="text-xs text-gray-400 -mt-1">
                    Kerala Health System
                  </div>
                </div>
              </Link>
              <p className="text-gray-300 text-sm mb-4">
                Empowering migrant workers with secure, accessible healthcare services across Kerala.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-emerald-400 smooth-transition">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-emerald-400 smooth-transition">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-emerald-400 smooth-transition">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-emerald-400 smooth-transition">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-emerald-400">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-emerald-400 smooth-transition text-sm flex items-center space-x-2"
                  >
                    <span>{link.name}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Help & Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-emerald-400">Help & Support</h3>
            <ul className="space-y-2">
              {helpLinks.map((link, index) => (
                <motion.li
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-emerald-400 smooth-transition text-sm flex items-center space-x-2"
                  >
                    <span>{link.name}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Emergency Contacts */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-emerald-400">Emergency Contacts</h3>
            <ul className="space-y-3">
              {emergencyNumbers.map((contact, index) => (
                <motion.li
                  key={contact.number}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-2"
                >
                  <Phone className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-gray-300 text-sm font-medium">{contact.name}</div>
                    <a
                      href={`tel:${contact.number}`}
                      className="text-emerald-400 hover:text-emerald-300 text-sm font-mono"
                    >
                      {contact.number}
                    </a>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Government Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-t border-gray-700 mt-8 pt-6"
        >
          <h4 className="text-emerald-400 font-semibold mb-4">Official Links</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <a
              href="https://kerala.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-emerald-400 smooth-transition flex items-center space-x-2"
            >
              <span>Government of Kerala</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://dhs.kerala.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-emerald-400 smooth-transition flex items-center space-x-2"
            >
              <span>Directorate of Health Services</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://norka.kerala.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-emerald-400 smooth-transition flex items-center space-x-2"
            >
              <span>NORKA Department</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-t border-gray-700 mt-6 pt-6"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Secretariat, Thiruvananthapuram, Kerala</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>aarogyam@kerala.gov.in</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+91 471 2518873</span>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              Available in: English • हिंदी • മലയാളം • বাংলা
            </div>
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-t border-gray-700 mt-6 pt-6 text-center"
        >
          <p className="text-gray-400 text-sm">
            © 2025 Aarogyam - Kerala Migrant Health Record System. All rights reserved. | 
            Developed by Kerala Government Health Department
          </p>
          <p className="text-gray-500 text-xs mt-2">
            This is a government initiative for the welfare of migrant workers in Kerala
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;