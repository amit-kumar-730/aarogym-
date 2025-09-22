import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { RootState } from '../store';
import { setSearchQuery, setFilters } from '../store/slices/hospitalSlice';
import { useTranslation } from '../hooks/useTranslation';
import {  Search,   Filter,  MapPin,  Star,  Phone, Mail,  Award, Users, Clock,Heart,Shield,CheckCircle,ExternalLink,Navigation,Calendar} from 'lucide-react';

const Hospitals: React.FC = () => {
  const [selectedHospital, setSelectedHospital] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { hospitals, searchQuery, filters, loading } = useSelector((state: RootState) => state.hospitals);

  const specialties = [
    'All Specialties',
    'Cardiology',
    'Neurology', 
    'Oncology',
    'Orthopedics',
    'Gastroenterology',
    'Pediatrics',
    'General Medicine',
    'Surgery',
    'Emergency Care'
  ];

  const locations = [
    'All Locations',
    'Thiruvananthapuram',
    'Kochi',
    'Kozhikode',
    'Thrissur',
    'Kollam',
    'Alappuzha',
    'Kottayam',
    'Palakkad'
  ];

  const filteredHospitals = hospitals.filter(hospital => {
    const matchesSearch = hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         hospital.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = !filters.specialty || filters.specialty === 'All Specialties' ||
                            hospital.specialties.includes(filters.specialty);
    const matchesLocation = !filters.location || filters.location === 'All Locations' ||
                           hospital.address.includes(filters.location);
    const matchesRating = !filters.rating || hospital.rating >= filters.rating;
    
    return matchesSearch && matchesSpecialty && matchesLocation && matchesRating;
  });

  const getBadgeColor = (badge?: string) => {
    switch (badge) {
      case 'gold': return 'text-yellow-600 bg-yellow-100';
      case 'silver': return 'text-gray-600 bg-gray-100';
      case 'bronze': return 'text-orange-600 bg-orange-100';
      default: return 'text-blue-600 bg-blue-100';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      {/* Header */}
      <section className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Healthcare Providers
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Find trusted hospitals and healthcare facilities across Kerala
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-emerald-100 dark:bg-emerald-900/20 px-4 py-2 rounded-lg">
                <Shield className="w-5 h-5 text-emerald-600" />
                <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                  {hospitals.filter(h => h.approved).length} Verified Hospitals
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search hospitals by name or location..."
                value={searchQuery}
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              <select
                value={filters.specialty || 'All Specialties'}
                onChange={(e) => dispatch(setFilters({ specialty: e.target.value === 'All Specialties' ? null : e.target.value }))}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
              >
                {specialties.map(specialty => (
                  <option key={specialty} value={specialty}>{specialty}</option>
                ))}
              </select>

              <select
                value={filters.location || 'All Locations'}
                onChange={(e) => dispatch(setFilters({ location: e.target.value === 'All Locations' ? null : e.target.value }))}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
              >
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>

              <select
                value={filters.rating || ''}
                onChange={(e) => dispatch(setFilters({ rating: e.target.value ? Number(e.target.value) : null }))}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">All Ratings</option>
                <option value="4.5">4.5+ Stars</option>
                <option value="4.0">4.0+ Stars</option>
                <option value="3.5">3.5+ Stars</option>
                <option value="3.0">3.0+ Stars</option>
              </select>
            </div>
          </div>

          {/* Results Summary */}
          <div className="mt-4 flex items-center justify-between">
            <p className="text-gray-600 dark:text-gray-400">
              Showing {filteredHospitals.length} of {hospitals.length} hospitals
            </p>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-emerald-100 text-emerald-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                </div>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-emerald-100 text-emerald-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <div className="w-4 h-4 flex flex-col space-y-1">
                  <div className="bg-current h-0.5 rounded"></div>
                  <div className="bg-current h-0.5 rounded"></div>
                  <div className="bg-current h-0.5 rounded"></div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Hospital List */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            </div>
          ) : (
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {filteredHospitals.map((hospital, index) => (
                <motion.div
                  key={hospital.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl smooth-transition overflow-hidden ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}
                >
                  {/* Hospital Image */}
                  <div className={`relative ${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'h-48'} overflow-hidden`}>
                    <img
                      src={hospital.image}
                      alt={hospital.name}
                      className="w-full h-full object-cover hover:scale-105 smooth-transition"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    
                    {/* Badge */}
                    {hospital.badge && (
                      <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor(hospital.badge)}`}>
                        <Award className="w-3 h-3 inline mr-1" />
                        {hospital.badge.charAt(0).toUpperCase() + hospital.badge.slice(1)}
                      </div>
                    )}

                    {/* Approved Badge */}
                    {hospital.approved && (
                      <div className="absolute top-3 right-3 bg-emerald-500 text-white p-1 rounded-full">
                        <CheckCircle className="w-4 h-4" />
                      </div>
                    )}
                  </div>

                  {/* Hospital Info */}
                  <div className="p-6 flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2">
                        {hospital.name}
                      </h3>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="flex items-center space-x-1">
                        {renderStars(hospital.rating)}
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {hospital.rating}
                      </span>
                      <span className="text-sm text-gray-500">
                        ({hospital.reviews} reviews)
                      </span>
                    </div>

                    {/* Location */}
                    <div className="flex items-start space-x-2 mb-4">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {hospital.address}
                      </p>
                    </div>

                    {/* Specialties */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {hospital.specialties.slice(0, 3).map((specialty, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 text-xs rounded-full"
                          >
                            {specialty}
                          </span>
                        ))}
                        {hospital.specialties.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                            +{hospital.specialties.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <a
                          href={`tel:${hospital.phone}`}
                          className="text-sm text-emerald-600 hover:text-emerald-700"
                        >
                          {hospital.phone}
                        </a>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <a
                          href={`mailto:${hospital.email}`}
                          className="text-sm text-emerald-600 hover:text-emerald-700"
                        >
                          {hospital.email}
                        </a>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button className="flex-1 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 smooth-transition flex items-center justify-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>Book Appointment</span>
                      </button>
                      <button className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 smooth-transition flex items-center justify-center space-x-2">
                        <Navigation className="w-4 h-4" />
                        <span>Directions</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {filteredHospitals.length === 0 && !loading && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No hospitals found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search criteria or filters
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Hospitals;