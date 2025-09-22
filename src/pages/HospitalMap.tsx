import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, Search, Filter, Star, Phone, Clock, 
  Navigation, Heart, Activity, Users, AlertTriangle 
} from 'lucide-react';

interface Hospital {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  specialty: string[];
  distance: string;
  phone: string;
  address: string;
  status: 'open' | 'busy' | 'emergency';
  coordinates: { lat: number; lng: number };
  badge: 'gold' | 'silver' | 'bronze';
}

interface OutbreakZone {
  id: string;
  district: string;
  disease: string;
  severity: 'high' | 'medium' | 'low';
  cases: number;
  coordinates: { lat: number; lng: number };
}

const HospitalMap: React.FC = () => {
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showOutbreaks, setShowOutbreaks] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  // Mock Kerala hospitals data
  const hospitals: Hospital[] = [
    {
      id: '1',
      name: 'Amrita Institute of Medical Sciences',
      rating: 4.8,
      reviews: 2547,
      specialty: ['Cardiology', 'Neurology', 'Oncology'],
      distance: '2.1 km',
      phone: '+91-484-2801234',
      address: 'Edappally, Kochi, Kerala',
      status: 'open',
      coordinates: { lat: 10.0261, lng: 76.3105 },
      badge: 'gold'
    },
    {
      id: '2', 
      name: 'Aster Medcity',
      rating: 4.6,
      reviews: 1892,
      specialty: ['Orthopedics', 'Gastroenterology', 'Pulmonology'],
      distance: '3.5 km',
      phone: '+91-484-6699999',
      address: 'Cheranelloor, Kochi, Kerala', 
      status: 'busy',
      coordinates: { lat: 9.9816, lng: 76.2999 },
      badge: 'gold'
    },
    {
      id: '3',
      name: 'KIMSHEALTH',
      rating: 4.5,
      reviews: 1456,
      specialty: ['Emergency Care', 'General Medicine', 'Surgery'],
      distance: '1.8 km', 
      phone: '+91-484-2828282',
      address: 'PB No.1, Anayara, Thiruvananthapuram',
      status: 'open',
      coordinates: { lat: 8.5241, lng: 76.9366 },
      badge: 'silver'
    },
    {
      id: '4',
      name: 'Baby Memorial Hospital',
      rating: 4.3,
      reviews: 987,
      specialty: ['Pediatrics', 'Gynecology', 'Dermatology'],
      distance: '5.2 km',
      phone: '+91-495-2358001',
      address: 'Indira Gandhi Rd, Calicut',
      status: 'open', 
      coordinates: { lat: 11.2588, lng: 75.7804 },
      badge: 'bronze'
    },
    {
      id: '5',
      name: 'Sree Chitra Tirunal Institute',
      rating: 4.7,
      reviews: 1654,
      specialty: ['Cardiothoracic Surgery', 'Neurosurgery'],
      distance: '4.1 km',
      phone: '+91-471-2524266', 
      address: 'Medical College Campus, Thiruvananthapuram',
      status: 'emergency',
      coordinates: { lat: 8.5071, lng: 76.9469 },
      badge: 'gold'
    }
  ];

  // Mock outbreak zones
  const outbreakZones: OutbreakZone[] = [
    {
      id: '1',
      district: 'Ernakulam',
      disease: 'Dengue',
      severity: 'high',
      cases: 245,
      coordinates: { lat: 10.0261, lng: 76.3105 }
    },
    {
      id: '2', 
      district: 'Thiruvananthapuram',
      disease: 'Chikungunya',
      severity: 'medium', 
      cases: 89,
      coordinates: { lat: 8.5241, lng: 76.9366 }
    },
    {
      id: '3',
      district: 'Kozhikode',
      disease: 'H1N1',
      severity: 'low',
      cases: 23,
      coordinates: { lat: 11.2588, lng: 75.7804 }
    }
  ];

  const filteredHospitals = hospitals.filter(hospital => {
    if (selectedFilter !== 'all' && !hospital.specialty.some(s => 
      s.toLowerCase().includes(selectedFilter.toLowerCase()))) {
      return false;
    }
    if (searchQuery && !hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !hospital.address.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'text-green-600';
      case 'busy': return 'text-yellow-600'; 
      case 'emergency': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case 'gold': return '🥇';
      case 'silver': return '🥈'; 
      case 'bronze': return '🥉';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Hospital & Healthcare Map
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Find nearby hospitals and track disease outbreaks in Kerala
          </p>
        </motion.div>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search hospitals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Specialty Filter */}
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Specialties</option>
              <option value="cardiology">Cardiology</option>
              <option value="neurology">Neurology</option>
              <option value="orthopedics">Orthopedics</option>
              <option value="emergency">Emergency Care</option>
              <option value="pediatrics">Pediatrics</option>
            </select>

            {/* Near Me Button */}
            <button className="flex items-center justify-center px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
              <Navigation className="w-4 h-4 mr-2" />
              Near Me
            </button>

            {/* Outbreak Toggle */}
            <button
              onClick={() => setShowOutbreaks(!showOutbreaks)}
              className={`flex items-center justify-center px-4 py-3 rounded-lg transition-colors ${
                showOutbreaks 
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
              }`}
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              Outbreaks
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Hospital List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Nearby Hospitals ({filteredHospitals.length})
              </h2>
              
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {filteredHospitals.map((hospital) => (
                  <div
                    key={hospital.id}
                    onClick={() => setSelectedHospital(hospital)}
                    className={`p-4 border rounded-xl cursor-pointer transition-all hover:shadow-md ${
                      selectedHospital?.id === hospital.id
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1">
                        {getBadgeIcon(hospital.badge)} {hospital.name}
                      </h3>
                      <span className={`text-sm font-medium ${getStatusColor(hospital.status)}`}>
                        {hospital.status.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="flex items-center mb-2">
                      <div className="flex items-center mr-4">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                        <span className="text-sm font-medium">{hospital.rating}</span>
                        <span className="text-sm text-gray-500 ml-1">({hospital.reviews})</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{hospital.distance}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-2">
                      {hospital.specialty.slice(0, 2).map((spec, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs rounded-full"
                        >
                          {spec}
                        </span>
                      ))}
                      {hospital.specialty.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                          +{hospital.specialty.length - 2} more
                        </span>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
                      {hospital.address}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Outbreak Zones */}
            {showOutbreaks && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
              >
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Active Outbreaks
                </h2>
                
                <div className="space-y-3">
                  {outbreakZones.map((zone) => (
                    <div
                      key={zone.id}
                      className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {zone.district}
                        </h3>
                        <span className={`px-2 py-1 text-white text-xs rounded-full ${getSeverityColor(zone.severity)}`}>
                          {zone.severity.toUpperCase()}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        Disease: <span className="font-medium">{zone.disease}</span>
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Cases: <span className="font-medium">{zone.cases}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Map Container */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Kerala Healthcare Map
              </h2>
              
              {/* Mock Map */}
              <div
                ref={mapRef}
                className="w-full h-[600px] bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl relative overflow-hidden"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-green-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">
                      Kerala Healthcare Network
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Interactive map showing {filteredHospitals.length} hospitals
                      {showOutbreaks && ` and ${outbreakZones.length} outbreak zones`}
                    </p>
                  </div>
                </div>

                {/* Mock Hospital Pins */}
                {filteredHospitals.map((hospital, index) => (
                  <div
                    key={hospital.id}
                    className={`absolute w-6 h-6 transform -translate-x-1/2 -translate-y-full cursor-pointer ${
                      selectedHospital?.id === hospital.id ? 'z-10' : ''
                    }`}
                    style={{
                      left: `${20 + index * 15}%`,
                      top: `${30 + index * 10}%`
                    }}
                    onClick={() => setSelectedHospital(hospital)}
                  >
                    <div className={`w-6 h-6 rounded-full border-2 border-white shadow-lg ${
                      hospital.badge === 'gold' ? 'bg-yellow-500' :
                      hospital.badge === 'silver' ? 'bg-gray-400' :
                      'bg-orange-600'
                    }`} />
                  </div>
                ))}

                {/* Mock Outbreak Zones */}
                {showOutbreaks && outbreakZones.map((zone, index) => (
                  <div
                    key={zone.id}
                    className={`absolute w-16 h-16 rounded-full opacity-70 transform -translate-x-1/2 -translate-y-1/2 ${getSeverityColor(zone.severity)}`}
                    style={{
                      left: `${60 + index * 10}%`,
                      top: `${40 + index * 15}%`
                    }}
                  />
                ))}
              </div>

              {/* Selected Hospital Info */}
              {selectedHospital && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl"
                >
                  <h3 className="font-bold text-green-900 dark:text-green-100 mb-2">
                    {getBadgeIcon(selectedHospital.badge)} {selectedHospital.name}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center mb-1">
                        <Star className="w-4 h-4 text-yellow-500 mr-2" />
                        <span className="font-medium">{selectedHospital.rating}</span>
                        <span className="text-gray-600 dark:text-gray-400 ml-1">({selectedHospital.reviews} reviews)</span>
                      </div>
                      <div className="flex items-center mb-1">
                        <MapPin className="w-4 h-4 text-gray-500 mr-2" />
                        <span className="text-sm">{selectedHospital.distance}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 text-gray-500 mr-2" />
                        <span className="text-sm">{selectedHospital.phone}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col justify-center">
                      <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg mb-2 transition-colors">
                        Book Appointment
                      </button>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                        Get Directions
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HospitalMap;