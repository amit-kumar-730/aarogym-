import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { loginSuccess } from '../../store/slices/authSlice';
import { useTranslation } from '../../hooks/useTranslation';
import { 
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
  CheckCircle
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

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
      id: 'migrant',
      name: 'Migrant Worker',
      description: 'Access health records and services',
      icon: User,
      color: 'text-emerald-600 bg-emerald-100'
    },
    {
      id: 'hospital',
      name: 'Hospital Staff',
      description: 'Manage patient records and appointments',
      icon: Building,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      id: 'admin',
      name: 'Administrator',
      description: 'System administration and oversight',
      icon: Settings,
      color: 'text-purple-600 bg-purple-100'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Link to="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="relative">
              {/* <Heart className="w-10 h-10 text-emerald-600 fill-current" />
              <Shield className="w-5 h-5 text-blue-600 absolute -top-1 -right-1" /> */}
              <img src="logo.Aro.svg" alt=""  className='h-14'/>
            </div>
            <div>
              {/* <span className="text-2xl font-bold text-gradient">Aarogyam</span> */}
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

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 className="text-sm font-medium text-blue-800 dark:text-blue-400 mb-2">Demo Credentials:</h4>
            <div className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
              <p><strong>Migrant:</strong> migrant@demo.com / password123</p>
              <p><strong>Hospital:</strong> hospital@demo.com / password123</p>
              <p><strong>Admin:</strong> admin@demo.com / password123</p>
            </div>
          </div>

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
  );
};

export default Login;