import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { loginSuccess } from '../../store/slices/authSlice';
import { useTranslation } from '../../hooks/useTranslation';
import { 
  Info,
  Heart, 
  Shield, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  User, 
  Building, 
  Settings,
  ArrowRight,
  CheckCircle,
  Copy,
  Check,
  Key
} from 'lucide-react';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'migrant' as 'migrant' | 'hospital' | 'admin'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copiedItems, setCopiedItems] = useState<{ [key: string]: boolean }>({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

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

  const handleInputChange = (field: string, value: string) => {
    if (field === 'role') {
      setFormData(prev => ({ ...prev, [field]: value as 'migrant' | 'hospital' | 'admin' }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockUser = {
        id: '1',
        name: formData.role === 'migrant' ? 'Rajesh Kumar' : 
              formData.role === 'hospital' ? 'Dr. Priya Nair' : 'Admin User',
        email: formData.email,
        role: formData.role,
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
        phone: '+91 9876543210',
        location: formData.role === 'migrant' ? 'Kochi, Kerala' : 'Thiruvananthapuram, Kerala',
        migrantId: formData.role === 'migrant' ? 'KL-MIG-2025-001' : undefined,
        hospitalId: formData.role === 'hospital' ? 'KL-HOSP-001' : undefined,
      };

      dispatch(loginSuccess(mockUser));
      setLoading(false);
      
      // Redirect based on role
      switch (formData.role) {
        case 'migrant':
          navigate('/dashboard');
          break;
        case 'hospital':
          navigate('/hospital-dashboard');
          break;
        case 'admin':
          navigate('/admin-dashboard');
          break;
        default:
          navigate('/');
      }
    }, 1500);
  };

  const roles = [
    {
      id: 'migrant' as const,
      name: 'Migrant Worker',
      description: 'Access health records and services',
      icon: User,
      color: 'text-emerald-600 bg-emerald-100'
    },
    {
      id: 'hospital' as const,
      name: 'Hospital Staff',
      description: 'Manage patient records and appointments',
      icon: Building,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      id: 'admin' as const,
      name: 'Administrator',
      description: 'System administration and oversight',
      icon: Settings,
      color: 'text-purple-600 bg-purple-100'
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
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent animate-pulse" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 relative">
          <div className="flex flex-col lg:flex-row items-center justify-center space-y-3 lg:space-y-0 lg:space-x-6">
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
                <Info className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
              </div>
              <span className="text-lg font-bold text-amber-800 dark:text-amber-200 animate-pulse">
                🔑 DEMO LOGIN CREDENTIALS
              </span>
            </motion.div>
            
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm">
              {/* Migrant Credentials */}
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-lg px-4 py-2 border-2 border-emerald-200 dark:border-emerald-700 shadow-md"
              >
                <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-3">
                  <span className="font-bold text-emerald-700 dark:text-emerald-300 flex items-center">
                    👤 MIGRANT:
                  </span>
                  <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-2">
                    <div className="flex items-center space-x-1">
                      <span className="text-gray-700 dark:text-gray-300 font-mono text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                        rajeshkumar12@gmail.com
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleCopy('rajeshkumar12@gmail.com', 'migrant-email')}
                        className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        title="Copy email"
                      >
                        {copiedItems['migrant-email'] ? (
                          <Check className="w-3 h-3 text-green-600" />
                        ) : (
                          <Copy className="w-3 h-3 text-gray-500" />
                        )}
                      </motion.button>
                    </div>
                    <span className="text-gray-500">|</span>
                    <div className="flex items-center space-x-1">
                      <span className="text-red-600 dark:text-red-400 font-semibold">Password:</span>
                      <div className="flex items-center space-x-1">
                        <span className="font-mono font-bold text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded border border-red-300 dark:border-red-600 animate-pulse">
                          12345678
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleCopy('12345678', 'migrant-password')}
                          className="p-1 rounded hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                          title="Copy password"
                        >
                          {copiedItems['migrant-password'] ? (
                            <Check className="w-3 h-3 text-green-600" />
                          ) : (
                            <Copy className="w-3 h-3 text-red-500" />
                          )}
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Hospital Credentials */}
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-lg px-4 py-2 border-2 border-blue-200 dark:border-blue-700 shadow-md"
              >
                <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-3">
                  <span className="font-bold text-blue-700 dark:text-blue-300 flex items-center">
                    🏥 HOSPITAL:
                  </span>
                  <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-2">
                    <div className="flex items-center space-x-1">
                      <span className="text-gray-700 dark:text-gray-300 font-mono text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                        hospital12@gmail.com
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleCopy('hospital12@gmail.com', 'hospital-email')}
                        className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        title="Copy email"
                      >
                        {copiedItems['hospital-email'] ? (
                          <Check className="w-3 h-3 text-green-600" />
                        ) : (
                          <Copy className="w-3 h-3 text-gray-500" />
                        )}
                      </motion.button>
                    </div>
                    <span className="text-gray-500">|</span>
                    <div className="flex items-center space-x-1">
                      <span className="text-red-600 dark:text-red-400 font-semibold">Password:</span>
                      <div className="flex items-center space-x-1">
                        <span className="font-mono font-bold text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded border border-red-300 dark:border-red-600 animate-pulse">
                          hospital12
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleCopy('hospital12', 'hospital-password')}
                          className="p-1 rounded hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                          title="Copy password"
                        >
                          {copiedItems['hospital-password'] ? (
                            <Check className="w-3 h-3 text-green-600" />
                          ) : (
                            <Copy className="w-3 h-3 text-red-500" />
                          )}
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
      {/* Main Login Content */}
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Link to="/" className="inline-flex items-center space-x-2 mb-6">
              <div className="relative">
                <img src="logo.Aro.svg" alt="" className='h-14'/>
              </div>
              <div>
                <img src="logo.svg" alt="" className='h-9'/>
                <div className="text-base text-gray-600 dark:text-gray-400 -mt-1">
                  Kerala Health System
                </div>
              </div>
            </Link>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome Back
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Sign in to access your health dashboard
            </p>
          </motion.div>

          {/* Login Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Role Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Select Your Role
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {roles.map((role) => (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => handleInputChange('role', role.id)}
                      className={`p-4 border-2 rounded-lg text-left smooth-transition ${
                        formData.role === role.id
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${role.color}`}>
                          <role.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 dark:text-white">{role.name}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">{role.description}</div>
                        </div>
                        {formData.role === role.id && (
                          <CheckCircle className="w-5 h-5 text-emerald-600" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                      errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                      errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Remember me</span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-emerald-600 hover:text-emerald-700 dark:text-emerald-400"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 smooth-transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="text-center mt-6">
              <p className="text-gray-600 dark:text-gray-400">
                Don't have an account?{' '}
                <Link
                  to="/signup"
                  className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 font-medium"
                >
                  Sign up here
                </Link>
              </p>
            </div>
          </motion.div>

         

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center text-sm text-gray-500 dark:text-gray-400"
          >
            <p>© 2025 Government of Kerala. All rights reserved.</p>
            <p className="mt-1">Secure healthcare access for all migrant workers</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;