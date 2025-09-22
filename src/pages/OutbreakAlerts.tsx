import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import AOS from 'aos';
import { RootState } from '../store';
import { dismissAlert } from '../store/slices/outbreakSlice';
import { useTranslation } from '../hooks/useTranslation';
import { 
  AlertTriangle, 
  MapPin, 
  Calendar, 
  Users, 
  TrendingUp, 
  Shield, 
  Phone, 
  X,
  Eye,
  Filter,
  Search,
  Download,
  Bell,
  Activity,
  Thermometer,
  Droplets,
  Wind,
  Bug
} from 'lucide-react';

const OutbreakAlerts: React.FC = () => {
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null);
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { alerts, loading } = useSelector((state: RootState) => state.outbreaks);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.disease.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         alert.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeverity = filterSeverity === 'all' || alert.severity === filterSeverity;
    return matchesSearch && matchesSeverity;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-100 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-100 border-green-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getDiseaseIcon = (disease: string) => {
    switch (disease.toLowerCase()) {
      case 'dengue': case 'chikungunya': return Bug;
      case 'h1n1': case 'covid-19': return Wind;
      case 'malaria': return Droplets;
      default: return Activity;
    }
  };

  const severityStats = {
    high: alerts.filter(a => a.severity === 'high').length,
    medium: alerts.filter(a => a.severity === 'medium').length,
    low: alerts.filter(a => a.severity === 'low').length,
    total: alerts.length
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      {/* Header */}
      <section className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <div className="inline-flex items-center space-x-2 bg-red-100 dark:bg-red-900/20 px-4 py-2 rounded-full mb-4">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <span className="text-sm font-medium text-red-700 dark:text-red-400">
                  Live Disease Surveillance
                </span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Outbreak Prevention Alerts
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Real-time disease outbreak monitoring and prevention guidelines for Kerala
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-emerald-100 dark:bg-emerald-900/20 px-4 py-2 rounded-lg">
                <Shield className="w-5 h-5 text-emerald-600" />
                <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                  {severityStats.total} Active Alerts
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{severityStats.high}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">High Risk</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{severityStats.medium}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Medium Risk</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{severityStats.low}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Low Risk</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{severityStats.total}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Alerts</div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by disease or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Severity Filter */}
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Severities</option>
              <option value="high">High Risk</option>
              <option value="medium">Medium Risk</option>
              <option value="low">Low Risk</option>
            </select>

            <button className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 smooth-transition flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export Report</span>
            </button>
          </div>
        </div>
      </section>

      {/* Alerts List */}
      <section className="pb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredAlerts.map((alert, index) => {
                const IconComponent = getDiseaseIcon(alert.disease);
                return (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-l-4 overflow-hidden hover:shadow-xl smooth-transition ${getSeverityColor(alert.severity).replace('text-', 'border-').replace(' bg-', ' ').replace(' border-', ' border-l-')}`}
                  >
                    {/* Alert Header */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getSeverityColor(alert.severity)}`}>
                            <IconComponent className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                              {alert.disease}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">{alert.location}, {alert.district}</p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                          {alert.severity.toUpperCase()}
                        </span>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <Users className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                          <div className="text-lg font-bold text-gray-900 dark:text-white">{alert.cases}</div>
                          <div className="text-xs text-gray-500">Cases</div>
                        </div>
                        <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <Calendar className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                          <div className="text-lg font-bold text-gray-900 dark:text-white">{alert.date}</div>
                          <div className="text-xs text-gray-500">Reported</div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                        {alert.description}
                      </p>

                      {/* Prevention Tips */}
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center space-x-2">
                          <Shield className="w-4 h-4" />
                          <span>Prevention Tips</span>
                        </h4>
                        <ul className="space-y-1">
                          {alert.preventionTips.slice(0, 2).map((tip, idx) => (
                            <li key={idx} className="text-sm text-gray-600 dark:text-gray-400 flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                              <span>{tip}</span>
                            </li>
                          ))}
                          {alert.preventionTips.length > 2 && (
                            <li className="text-sm text-emerald-600 dark:text-emerald-400">
                              +{alert.preventionTips.length - 2} more tips
                            </li>
                          )}
                        </ul>
                      </div>

                      {/* Actions */}
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedAlert(selectedAlert === alert.id ? null : alert.id)}
                          className="flex-1 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 smooth-transition flex items-center justify-center space-x-2"
                        >
                          <Eye className="w-4 h-4" />
                          <span>View Details</span>
                        </button>
                        <button className="p-2 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                          <Phone className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {selectedAlert === alert.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-gray-200 dark:border-gray-700 p-6 bg-gray-50 dark:bg-gray-700"
                      >
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Complete Prevention Guidelines</h4>
                        <ul className="space-y-2">
                          {alert.preventionTips.map((tip, idx) => (
                            <li key={idx} className="text-sm text-gray-600 dark:text-gray-400 flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                        
                        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <div className="flex items-center space-x-2 text-blue-700 dark:text-blue-400">
                            <Phone className="w-4 h-4" />
                            <span className="font-medium">Emergency Helpline: 108</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}

          {filteredAlerts.length === 0 && !loading && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No alerts found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search criteria or filters
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Emergency Contact Banner */}
      <section className="bg-red-600 text-white py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Emergency Health Helpline</h3>
                <p className="text-red-100">24/7 medical assistance and outbreak reporting</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <a href="tel:108" className="text-2xl font-bold hover:text-red-200">108</a>
              <a href="tel:104" className="text-2xl font-bold hover:text-red-200">104</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OutbreakAlerts;