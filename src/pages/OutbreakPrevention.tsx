import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  AlertTriangle, 
  Shield, 
  MapPin, 
  TrendingUp, 
  Users, 
  Calendar,
  Phone,
  Heart,
  Droplets,
  Wind,
  Thermometer,
  Eye,
  Stethoscope,
  Activity,
  Clock,
  CheckCircle,
  XCircle,
  Info,
  Download,
  Share2,
  Bell,
  Search,
  Filter
} from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

interface OutbreakData {
  id: string;
  disease: string;
  location: string;
  district: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  cases: number;
  newCases: number;
  deaths: number;
  recovered: number;
  lastUpdated: string;
  description: string;
  symptoms: string[];
  prevention: string[];
  treatment: string;
  riskFactors: string[];
  affectedAreas: string[];
}

interface PreventionTip {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  category: 'hygiene' | 'vaccination' | 'lifestyle' | 'environment';
  priority: 'high' | 'medium' | 'low';
}

const OutbreakPrevention: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'alerts' | 'prevention' | 'guidelines' | 'statistics'>('alerts');
  const [selectedDisease, setSelectedDisease] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');

  // Mock outbreak data for Kerala
  const outbreakData: OutbreakData[] = [
    {
      id: '1',
      disease: 'Dengue Fever',
      location: 'Kochi',
      district: 'Ernakulam',
      severity: 'high',
      cases: 245,
      newCases: 23,
      deaths: 2,
      recovered: 198,
      lastUpdated: '2024-01-15',
      description: 'Dengue outbreak reported in multiple areas of Kochi with increasing cases.',
      symptoms: ['High fever', 'Severe headache', 'Joint pain', 'Skin rash', 'Nausea'],
      prevention: ['Remove stagnant water', 'Use mosquito nets', 'Wear full sleeves', 'Use repellents'],
      treatment: 'Supportive care with fluid management and fever control',
      riskFactors: ['Stagnant water', 'Poor sanitation', 'Monsoon season'],
      affectedAreas: ['Kakkanad', 'Edappally', 'Palarivattom', 'Vyttila']
    },
    {
      id: '2',
      disease: 'Chikungunya',
      location: 'Thiruvananthapuram',
      district: 'Thiruvananthapuram',
      severity: 'medium',
      cases: 156,
      newCases: 12,
      deaths: 0,
      recovered: 134,
      lastUpdated: '2024-01-14',
      description: 'Chikungunya cases reported in coastal areas with moderate spread.',
      symptoms: ['Joint pain', 'Fever', 'Headache', 'Muscle pain', 'Rash'],
      prevention: ['Eliminate breeding sites', 'Use protective clothing', 'Community awareness'],
      treatment: 'Pain management and supportive care',
      riskFactors: ['Aedes mosquito breeding', 'Urban areas', 'Water storage'],
      affectedAreas: ['Kovalam', 'Neyyattinkara', 'Attingal', 'Varkala']
    },
    {
      id: '3',
      disease: 'H1N1 Influenza',
      location: 'Kozhikode',
      district: 'Kozhikode',
      severity: 'medium',
      cases: 89,
      newCases: 8,
      deaths: 1,
      recovered: 76,
      lastUpdated: '2024-01-13',
      description: 'Seasonal H1N1 outbreak with respiratory symptoms.',
      symptoms: ['Fever', 'Cough', 'Sore throat', 'Body aches', 'Fatigue'],
      prevention: ['Vaccination', 'Hand hygiene', 'Avoid crowded places', 'Wear masks'],
      treatment: 'Antiviral medications and supportive care',
      riskFactors: ['Crowded places', 'Poor ventilation', 'Weak immunity'],
      affectedAreas: ['Calicut City', 'Vadakara', 'Koyilandy', 'Balussery']
    },
    {
      id: '4',
      disease: 'Hepatitis A',
      location: 'Thrissur',
      district: 'Thrissur',
      severity: 'low',
      cases: 34,
      newCases: 3,
      deaths: 0,
      recovered: 28,
      lastUpdated: '2024-01-12',
      description: 'Hepatitis A cases linked to contaminated water sources.',
      symptoms: ['Jaundice', 'Fatigue', 'Nausea', 'Abdominal pain', 'Dark urine'],
      prevention: ['Safe water', 'Food hygiene', 'Vaccination', 'Sanitation'],
      treatment: 'Supportive care and rest',
      riskFactors: ['Contaminated water', 'Poor sanitation', 'Food contamination'],
      affectedAreas: ['Thrissur City', 'Chalakudy', 'Irinjalakuda', 'Kodungallur']
    }
  ];

  const preventionTips: PreventionTip[] = [
    {
      id: '1',
      title: 'Hand Hygiene',
      description: 'Wash hands frequently with soap and water for at least 20 seconds',
      icon: Droplets,
      category: 'hygiene',
      priority: 'high'
    },
    {
      id: '2',
      title: 'Vaccination',
      description: 'Stay up-to-date with recommended vaccinations',
      icon: Shield,
      category: 'vaccination',
      priority: 'high'
    },
    {
      id: '3',
      title: 'Safe Water',
      description: 'Drink only boiled or bottled water, avoid ice from unknown sources',
      icon: Droplets,
      category: 'hygiene',
      priority: 'high'
    },
    {
      id: '4',
      title: 'Food Safety',
      description: 'Eat freshly cooked food, avoid street food and raw vegetables',
      icon: Heart,
      category: 'hygiene',
      priority: 'medium'
    },
    {
      id: '5',
      title: 'Mosquito Control',
      description: 'Remove stagnant water, use nets and repellents',
      icon: Wind,
      category: 'environment',
      priority: 'high'
    },
    {
      id: '6',
      title: 'Social Distancing',
      description: 'Maintain distance in crowded places during outbreaks',
      icon: Users,
      category: 'lifestyle',
      priority: 'medium'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900 dark:text-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <XCircle className="h-4 w-4" />;
      case 'high': return <AlertTriangle className="h-4 w-4" />;
      case 'medium': return <Info className="h-4 w-4" />;
      case 'low': return <CheckCircle className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50 dark:bg-red-900/20';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'low': return 'border-l-green-500 bg-green-50 dark:bg-green-900/20';
      default: return 'border-l-gray-500 bg-gray-50 dark:bg-gray-700';
    }
  };

  const filteredOutbreaks = outbreakData.filter(outbreak => {
    const matchesSearch = outbreak.disease.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         outbreak.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = filterSeverity === 'all' || outbreak.severity === filterSeverity;
    return matchesSearch && matchesSeverity;
  });

  const renderAlerts = () => (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search by disease or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Severities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Outbreak Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredOutbreaks.map((outbreak, index) => (
          <motion.div
            key={outbreak.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{outbreak.disease}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium border flex items-center space-x-1 ${getSeverityColor(outbreak.severity)}`}>
                  {getSeverityIcon(outbreak.severity)}
                  <span>{outbreak.severity.toUpperCase()}</span>
                </span>
              </div>

              <div className="flex items-center space-x-2 mb-4">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600 dark:text-gray-400">{outbreak.location}, {outbreak.district}</span>
              </div>

              <p className="text-gray-600 dark:text-gray-400 mb-4">{outbreak.description}</p>

              {/* Statistics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600 dark:text-red-400">{outbreak.cases}</div>
                  <div className="text-xs text-gray-500">Total Cases</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">+{outbreak.newCases}</div>
                  <div className="text-xs text-gray-500">New Cases</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">{outbreak.recovered}</div>
                  <div className="text-xs text-gray-500">Recovered</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">{outbreak.deaths}</div>
                  <div className="text-xs text-gray-500">Deaths</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  Updated: {new Date(outbreak.lastUpdated).toLocaleDateString()}
                </span>
                <button
                  onClick={() => setSelectedDisease(selectedDisease === outbreak.id ? null : outbreak.id)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm"
                >
                  {selectedDisease === outbreak.id ? 'Hide Details' : 'View Details'}
                </button>
              </div>

              {/* Detailed Information */}
              {selectedDisease === outbreak.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700"
                >
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Symptoms</h4>
                      <div className="flex flex-wrap gap-2">
                        {outbreak.symptoms.map((symptom, idx) => (
                          <span key={idx} className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 text-sm rounded-full">
                            {symptom}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Prevention</h4>
                      <div className="flex flex-wrap gap-2">
                        {outbreak.prevention.map((tip, idx) => (
                          <span key={idx} className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm rounded-full">
                            {tip}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Affected Areas</h4>
                      <div className="flex flex-wrap gap-2">
                        {outbreak.affectedAreas.map((area, idx) => (
                          <span key={idx} className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm rounded-full">
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Treatment</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{outbreak.treatment}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderPrevention = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">General Prevention Guidelines</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {preventionTips.map((tip, index) => {
            const Icon = tip.icon;
            return (
              <motion.div
                key={tip.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg border-l-4 ${getPriorityColor(tip.priority)}`}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                    <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{tip.title}</h4>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{tip.description}</p>
                <div className="mt-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    tip.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                    tip.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                    'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  }`}>
                    {tip.priority} priority
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderGuidelines = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Health Guidelines for Migrant Workers</h3>
        
        <div className="space-y-6">
          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Before Starting Work</h4>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
              <li>Complete health checkup and vaccination</li>
              <li>Register with local health authorities</li>
              <li>Obtain health insurance coverage</li>
              <li>Learn about local disease risks</li>
            </ul>
          </div>

          <div className="border-l-4 border-green-500 pl-4">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">During Work Period</h4>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
              <li>Regular health monitoring and checkups</li>
              <li>Follow workplace safety protocols</li>
              <li>Report any symptoms immediately</li>
              <li>Maintain personal hygiene standards</li>
            </ul>
          </div>

          <div className="border-l-4 border-yellow-500 pl-4">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Emergency Situations</h4>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
              <li>Call 108 for medical emergencies</li>
              <li>Contact nearest healthcare facility</li>
              <li>Inform employer and family</li>
              <li>Keep health card and documents ready</li>
            </ul>
          </div>

          <div className="border-l-4 border-red-500 pl-4">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Outbreak Response</h4>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
              <li>Follow government health advisories</li>
              <li>Avoid affected areas if possible</li>
              <li>Use protective equipment as recommended</li>
              <li>Get tested if symptoms develop</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStatistics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-red-100 dark:bg-red-900 rounded-full">
              <TrendingUp className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Outbreaks</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{outbreakData.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-full">
              <Users className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Cases</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {outbreakData.reduce((sum, outbreak) => sum + outbreak.cases, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
              <Heart className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Recovered</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {outbreakData.reduce((sum, outbreak) => sum + outbreak.recovered, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
              <Activity className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Recovery Rate</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {Math.round((outbreakData.reduce((sum, outbreak) => sum + outbreak.recovered, 0) / 
                outbreakData.reduce((sum, outbreak) => sum + outbreak.cases, 0)) * 100)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* District-wise breakdown */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">District-wise Outbreak Summary</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-600">
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">District</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Disease</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Cases</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Severity</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Status</th>
              </tr>
            </thead>
            <tbody>
              {outbreakData.map((outbreak) => (
                <tr key={outbreak.id} className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">{outbreak.district}</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{outbreak.disease}</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{outbreak.cases}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${getSeverityColor(outbreak.severity)}`}>
                      {outbreak.severity}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Outbreak Prevention & Monitoring
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Real-time disease surveillance and prevention guidelines for migrant workers in Kerala
          </p>
        </div>

        {/* Emergency Alert */}
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-8">
          <div className="flex items-center space-x-2 text-red-800 dark:text-red-200">
            <AlertTriangle className="h-5 w-5" />
            <span className="font-medium">Health Emergency Helplines</span>
          </div>
          <div className="mt-2 flex flex-col sm:flex-row gap-4">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-red-600 dark:text-red-400" />
              <span className="text-red-700 dark:text-red-300">Emergency: 108 | Health Helpline: 104</span>
            </div>
            <div className="flex items-center space-x-2">
              <Bell className="h-4 w-4 text-red-600 dark:text-red-400" />
              <span className="text-red-700 dark:text-red-300">COVID-19 Helpline: 1075</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg mb-8">
          <div className="flex border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
            {[
              { id: 'alerts', label: 'Active Alerts', icon: AlertTriangle },
              { id: 'prevention', label: 'Prevention Tips', icon: Shield },
              { id: 'guidelines', label: 'Guidelines', icon: Stethoscope },
              { id: 'statistics', label: 'Statistics', icon: TrendingUp }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-6 py-4 font-medium whitespace-nowrap transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="p-6">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'alerts' && renderAlerts()}
              {activeTab === 'prevention' && renderPrevention()}
              {activeTab === 'guidelines' && renderGuidelines()}
              {activeTab === 'statistics' && renderStatistics()}
            </motion.div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg text-center">
            <Download className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Download Guidelines
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Get comprehensive prevention guidelines PDF
            </p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
              Download PDF
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg text-center">
            <Share2 className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Share Information
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Share outbreak alerts with your community
            </p>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200">
              Share Now
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg text-center">
            <Bell className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Alert Notifications
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Subscribe to real-time outbreak alerts
            </p>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutbreakPrevention;