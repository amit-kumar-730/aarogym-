import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Star, MessageCircle, AlertCircle, CheckCircle, Phone, Mail } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

const Feedback: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'feedback' | 'complaint' | 'suggestion'>('feedback');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    hospitalId: '',
    category: '',
    subject: '',
    message: '',
    anonymous: false,
    priority: 'medium'
  });

  const hospitals = [
    'Amrita Institute of Medical Sciences',
    'Aster Medcity',
    'KIMSHEALTH',
    'Baby Memorial Hospital',
    'Sree Chitra Tirunal Institute'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Handle form submission
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        hospitalId: '',
        category: '',
        subject: '',
        message: '',
        anonymous: false,
        priority: 'medium'
      });
      setRating(0);
    }, 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const tabs = [
    { id: 'feedback', label: 'Hospital Feedback', icon: MessageCircle, color: 'blue' },
    { id: 'complaint', label: 'File Complaint', icon: AlertCircle, color: 'red' },
    { id: 'suggestion', label: 'Suggestions', icon: CheckCircle, color: 'green' }
  ];

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg text-center max-w-md mx-auto"
        >
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {activeTab === 'feedback' && 'Feedback Submitted!'}
            {activeTab === 'complaint' && 'Complaint Filed!'}
            {activeTab === 'suggestion' && 'Suggestion Received!'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Thank you for your valuable input. We will review and respond within 48 hours.
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <span>Reference ID: #FBK{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('feedbackAndComplaints')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Your feedback helps us improve healthcare services for migrant workers across Kerala
          </p>
        </div>

        {/* Emergency Contact */}
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-8">
          <div className="flex items-center space-x-2 text-red-800 dark:text-red-200">
            <AlertCircle className="h-5 w-5" />
            <span className="font-medium">For Medical Emergencies</span>
          </div>
          <div className="mt-2 flex flex-col sm:flex-row gap-4">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-red-600 dark:text-red-400" />
              <span className="text-red-700 dark:text-red-300">Emergency: 108 | Health Helpline: 104</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-red-600 dark:text-red-400" />
              <span className="text-red-700 dark:text-red-300">emergency@aarogyam.kerala.gov.in</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg mb-8">
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 font-medium transition-colors duration-200 ${
                    activeTab === tab.id
                      ? `text-${tab.color}-600 border-b-2 border-${tab.color}-600`
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    Hospital/Clinic
                  </label>
                  <select
                    name="hospitalId"
                    value={formData.hospitalId}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Select a hospital</option>
                    {hospitals.map((hospital) => (
                      <option key={hospital} value={hospital}>
                        {hospital}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Category and Priority */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Select category</option>
                    {activeTab === 'feedback' && (
                      <>
                        <option value="service">Service Quality</option>
                        <option value="staff">Staff Behavior</option>
                        <option value="facilities">Facilities</option>
                        <option value="treatment">Treatment Experience</option>
                      </>
                    )}
                    {activeTab === 'complaint' && (
                      <>
                        <option value="medical">Medical Issue</option>
                        <option value="billing">Billing Problem</option>
                        <option value="staff">Staff Misconduct</option>
                        <option value="discrimination">Discrimination</option>
                        <option value="language">Language Barrier</option>
                      </>
                    )}
                    {activeTab === 'suggestion' && (
                      <>
                        <option value="improvement">Service Improvement</option>
                        <option value="feature">New Feature</option>
                        <option value="process">Process Enhancement</option>
                        <option value="accessibility">Accessibility</option>
                      </>
                    )}
                  </select>
                </div>

                {activeTab === 'complaint' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Priority Level
                    </label>
                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Rating (for feedback only) */}
              {activeTab === 'feedback' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Overall Rating
                  </label>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className={`p-1 transition-colors duration-200 ${
                          star <= (hoverRating || rating)
                            ? 'text-yellow-400'
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                      >
                        <Star className="h-8 w-8 fill-current" />
                      </button>
                    ))}
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                      {rating ? `${rating} star${rating > 1 ? 's' : ''}` : 'No rating'}
                    </span>
                  </div>
                </div>
              )}

              {/* Subject */}
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
                  placeholder={`Brief ${activeTab} subject`}
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Detailed Description *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder={`Please provide detailed information about your ${activeTab}...`}
                />
              </div>

              {/* Anonymous option */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="anonymous"
                  checked={formData.anonymous}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Submit anonymously
                </label>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
                >
                  <Send className="h-5 w-5" />
                  <span>
                    {activeTab === 'feedback' && 'Submit Feedback'}
                    {activeTab === 'complaint' && 'File Complaint'}
                    {activeTab === 'suggestion' && 'Send Suggestion'}
                  </span>
                </motion.button>
              </div>
            </form>
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Contact Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Helpline</p>
                  <p className="font-medium text-gray-900 dark:text-white">1800-425-1912</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                  <p className="font-medium text-gray-900 dark:text-white">feedback@aarogyam.kerala.gov.in</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Response Time
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Feedback</span>
                <span className="font-medium text-green-600 dark:text-green-400">48 hours</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">General Complaints</span>
                <span className="font-medium text-yellow-600 dark:text-yellow-400">24 hours</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Urgent Issues</span>
                <span className="font-medium text-red-600 dark:text-red-400">2 hours</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;