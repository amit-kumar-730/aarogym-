import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Award, MapPin, Phone, Clock, Users, Heart, Shield } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

const HospitalLeaderboard: React.FC = () => {
  const { t } = useTranslation();
  const [sortBy, setSortBy] = useState<'rating' | 'patients' | 'experience'>('rating');
  const [filterBy, setFilterBy] = useState<string>('all');

  const hospitals = [
    {
      id: 1,
      name: 'Amrita Institute of Medical Sciences',
      rating: 4.8,
      totalPatients: 15420,
      monthlyPatients: 1250,
      experience: 28,
      location: 'Kochi',
      phone: '+91-484-280-1234',
      specialties: ['Cardiology', 'Neurology', 'Oncology'],
      badge: 'gold',
      reviews: 2840,
      image: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=300',
      achievements: ['ISO Certified', 'NABH Accredited', 'JCI Certified']
    },
    {
      id: 2,
      name: 'Aster Medcity',
      rating: 4.7,
      totalPatients: 12800,
      monthlyPatients: 1100,
      experience: 15,
      location: 'Kochi',
      phone: '+91-484-667-9999',
      specialties: ['Transplant', 'Cardiac Surgery', 'Emergency'],
      badge: 'gold',
      reviews: 2156,
      image: 'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=300',
      achievements: ['NABH Accredited', '24/7 Emergency']
    },
    {
      id: 3,
      name: 'KIMSHEALTH',
      rating: 4.6,
      totalPatients: 11200,
      monthlyPatients: 950,
      experience: 22,
      location: 'Thiruvananthapuram',
      phone: '+91-471-304-0000',
      specialties: ['Orthopedics', 'Gastroenterology', 'Pediatrics'],
      badge: 'silver',
      reviews: 1890,
      image: 'https://images.pexels.com/photos/668298/pexels-photo-668298.jpeg?auto=compress&cs=tinysrgb&w=300',
      achievements: ['NABH Accredited', 'Green Hospital']
    },
    {
      id: 4,
      name: 'Baby Memorial Hospital',
      rating: 4.5,
      totalPatients: 9800,
      monthlyPatients: 800,
      experience: 35,
      location: 'Kozhikode',
      phone: '+91-495-235-6789',
      specialties: ['Maternity', 'Pediatrics', 'General Medicine'],
      badge: 'silver',
      reviews: 1456,
      image: 'https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=compress&cs=tinysrgb&w=300',
      achievements: ['Baby Friendly Hospital', 'NABH Accredited']
    },
    {
      id: 5,
      name: 'Sree Chitra Tirunal Institute',
      rating: 4.4,
      totalPatients: 8600,
      monthlyPatients: 720,
      experience: 42,
      location: 'Thiruvananthapuram',
      phone: '+91-471-252-4266',
      specialties: ['Cardiothoracic Surgery', 'Neurosurgery', 'Research'],
      badge: 'bronze',
      reviews: 1234,
      image: 'https://images.pexels.com/photos/1170979/pexels-photo-1170979.jpeg?auto=compress&cs=tinysrgb&w=300',
      achievements: ['Research Excellence', 'Government Institute']
    }
  ];

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'gold': return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
      case 'silver': return 'bg-gradient-to-r from-gray-300 to-gray-500';
      case 'bronze': return 'bg-gradient-to-r from-orange-400 to-orange-600';
      default: return 'bg-gradient-to-r from-blue-400 to-blue-600';
    }
  };

  const sortedHospitals = [...hospitals].sort((a, b) => {
    switch (sortBy) {
      case 'rating': return b.rating - a.rating;
      case 'patients': return b.totalPatients - a.totalPatients;
      case 'experience': return b.experience - a.experience;
      default: return 0;
    }
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('hospitalLeaderboard')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('leaderboardDescription')}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
          >
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Hospitals</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{hospitals.length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
          >
            <div className="flex items-center">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                <Heart className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Patients Served</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {hospitals.reduce((sum, h) => sum + h.totalPatients, 0).toLocaleString()}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
          >
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                <Award className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Gold Certified</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {hospitals.filter(h => h.badge === 'gold').length}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
          >
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                <Shield className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Avg Rating</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {(hospitals.reduce((sum, h) => sum + h.rating, 0) / hospitals.length).toFixed(1)}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="rating">Rating</option>
                <option value="patients">Total Patients</option>
                <option value="experience">Experience</option>
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Filter By Location
              </label>
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="all">All Locations</option>
                <option value="Kochi">Kochi</option>
                <option value="Thiruvananthapuram">Thiruvananthapuram</option>
                <option value="Kozhikode">Kozhikode</option>
              </select>
            </div>
          </div>
        </div>

        {/* Hospital Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {sortedHospitals.map((hospital, index) => (
            <motion.div
              key={hospital.id}
              variants={cardVariants}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl font-bold text-gray-400 dark:text-gray-500">
                      #{index + 1}
                    </div>
                    <img
                      src={hospital.image}
                      alt={hospital.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                        {hospital.name}
                      </h3>
                      <div className="flex items-center space-x-2 mb-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-600 dark:text-gray-400">{hospital.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-600 dark:text-gray-400">{hospital.phone}</span>
                      </div>
                    </div>
                  </div>

                  <div className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getBadgeColor(hospital.badge)}`}>
                    {hospital.badge.toUpperCase()} CERTIFIED
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Star className="h-5 w-5 text-yellow-400 mr-1" />
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        {hospital.rating}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {hospital.reviews} Reviews
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {hospital.totalPatients.toLocaleString()}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Patients</p>
                  </div>

                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {hospital.monthlyPatients}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Monthly Patients</p>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Clock className="h-5 w-5 text-blue-500 mr-1" />
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        {hospital.experience}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Years Experience</p>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Specialties
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {hospital.specialties.map((specialty, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Achievements
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {hospital.achievements.map((achievement, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm rounded-full"
                      >
                        {achievement}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                    Book Appointment
                  </button>
                  <button className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200">
                    View Details
                  </button>
                  <button className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200">
                    Write Review
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default HospitalLeaderboard;