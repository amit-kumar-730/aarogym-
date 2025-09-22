import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  AlertTriangle, 
  Heart, 
  Globe,
  MessageSquare,
  Headphones,
  FileText
} from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    urgency: 'normal',
    department: 'general'
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        urgency: 'normal',
        department: 'general'
      });
    }, 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const emergencyNumbers = [
    {
      name: 'Medical Emergency',
      number: '108',
      description: '24/7 Emergency Ambulance Service',
      icon: AlertTriangle,
      color: 'red'
    },
    {
      name: 'Health Helpline',
      number: '104',
      description: 'Free Health Advisory Service',
      icon: Heart,
      color: 'blue'
    },
    {
      name: 'COVID-19 Helpline',
      number: '1075',
      description: 'COVID-19 Information & Support',
      icon: Phone,
      color: 'purple'
    },
    {
      name: 'Women Helpline',
      number: '1091',
      description: '24x7 Helpline for Women in Distress',
      icon: Phone,
      color: 'pink'
    }
  ];

  const departments = [
    {
      name: 'General Inquiry',
      email: 'info@aarogyam.kerala.gov.in',
      phone: '1800-425-1912',
      hours: '9:00 AM - 6:00 PM',
      icon: MessageSquare
    },
    {
      name: 'Technical Support',
      email: 'support@aarogyam.kerala.gov.in',
      phone: '1800-425-1913',
      hours: '24/7',
      icon: Headphones
    },
    {
      name: 'Medical Records',
      email: 'records@aarogyam.kerala.gov.in',
      phone: '1800-425-1914',
      hours: '9:00 AM - 5:00 PM',
      icon: FileText
    },
    {
      name: 'Hospital Registration',
      email: 'hospitals@aarogyam.kerala.gov.in',
      phone: '1800-425-1915',
      hours: '9:00 AM - 6:00 PM',
      icon: Heart
    }
  ];

  const officeLocations = [
    {
      name: 'Thiruvananthapuram Office',
      address: 'Directorate of Health Services, Vellayambalam, Thiruvananthapuram - 695033',
      phone: '+91-471-252-1234',
      email: 'tvm@aarogyam.kerala.gov.in',
      hours: '9:00 AM - 5:00 PM'
    },
    {
      name: 'Kochi Office',
      address: 'District Medical Office, Civil Station Road, Kakkanad, Kochi - 682030',
      phone: '+91-484-285-5678',
      email: 'kochi@aarogyam.kerala.gov.in',
      hours: '9:00 AM - 5:00 PM'
    },
    {
      name: 'Kozhikode Office',
      address: 'Medical College Campus, Kozhikode - 673008',
      phone: '+91-495-235-9012',
      email: 'kozhikode@aarogyam.kerala.gov.in',
      hours: '9:00 AM - 5:00 PM'
    }
  ];

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg text-center max-w-md mx-auto"
        >
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Message Sent Successfully!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Thank you for contacting us. We'll respond to your inquiry within 24 hours.
          </p>
          <div className="text-sm text-gray-500">
            Reference ID: #MSG{Math.random().toString(36).substr(2, 8).toUpperCase()}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('contactUs')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Get in touch with us for any questions, support, or feedback regarding the Aarogyam system
          </p>
        </div>

        {/* Emergency Numbers */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Emergency Helplines
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {emergencyNumbers.map((emergency, index) => {
              const Icon = emergency.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg text-center border-l-4 border-${emergency.color}-500`}
                >
                  <div className={`w-12 h-12 bg-${emergency.color}-100 dark:bg-${emergency.color}-900 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Icon className={`h-6 w-6 text-${emergency.color}-600 dark:text-${emergency.color}-400`} />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {emergency.name}
                  </h3>
                  <div className={`text-2xl font-bold text-${emergency.color}-600 dark:text-${emergency.color}-400 mb-2`}>
                    {emergency.number}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {emergency.description}
                  </p>
                  <button className={`mt-3 w-full bg-${emergency.color}-600 text-white py-2 px-4 rounded-lg hover:bg-${emergency.color}-700 transition-colors duration-200`}>
                    Call Now
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Send us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="+91 9876543210"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Department
                  </label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="technical">Technical Support</option>
                    <option value="medical">Medical Records</option>
                    <option value="hospital">Hospital Registration</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Urgency Level
                </label>
                <select
                  name="urgency"
                  value={formData.urgency}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="low">Low - General inquiry</option>
                  <option value="normal">Normal - Standard request</option>
                  <option value="high">High - Urgent matter</option>
                  <option value="critical">Critical - Emergency</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Brief subject of your message"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Please provide details about your inquiry..."
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
              >
                Send Message
              </motion.button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Departments */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Contact Departments
              </h3>
              <div className="space-y-4">
                {departments.map((dept, index) => {
                  const Icon = dept.icon;
                  return (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                        <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-white">{dept.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          <Phone className="h-4 w-4 inline mr-1" />
                          {dept.phone}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          <Mail className="h-4 w-4 inline mr-1" />
                          {dept.email}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          <Clock className="h-4 w-4 inline mr-1" />
                          {dept.hours}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Office Locations */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Office Locations
              </h3>
              <div className="space-y-6">
                {officeLocations.map((office, index) => (
                  <div key={index} className="border-b border-gray-200 dark:border-gray-700 last:border-b-0 pb-4 last:pb-0">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">{office.name}</h4>
                    <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                      <p className="flex items-start space-x-2">
                        <MapPin className="h-4 w-4 mt-0.5 text-red-500" />
                        <span>{office.address}</span>
                      </p>
                      <p className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-blue-500" />
                        <span>{office.phone}</span>
                      </p>
                      <p className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-green-500" />
                        <span>{office.email}</span>
                      </p>
                      <p className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-purple-500" />
                        <span>{office.hours}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Follow Us
              </h3>
              <div className="flex space-x-4">
                {['Facebook', 'Twitter', 'Instagram', 'YouTube'].map((platform) => (
                  <button
                    key={platform}
                    className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors duration-200"
                  >
                    <Globe className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;