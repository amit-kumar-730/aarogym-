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
  Phone, 
  MapPin,
  Building,
  Settings,
  ArrowRight,
  CheckCircle,
  Upload,
  Camera
} from 'lucide-react';

const Signup: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    role: 'migrant' as 'migrant' | 'hospital' | 'admin',
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    location: '',
    // Migrant specific
    age: '',
    gender: '',
    originState: '',
    occupation: '',
    // Hospital specific
    hospitalName: '',
    licenseNumber: '',
    specialties: [] as string[],
    // Common
    photo: null as string | null,
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleInputChange = (field: string, value: string | boolean | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    
    if (formData.role === 'migrant') {
      if (!formData.age.trim()) newErrors.age = 'Age is required';
      if (!formData.gender) newErrors.gender = 'Gender is required';
      if (!formData.originState) newErrors.originState = 'Origin state is required';
      if (!formData.occupation) newErrors.occupation = 'Occupation is required';
    }
    
    if (formData.role === 'hospital') {
      if (!formData.hospitalName.trim()) newErrors.hospitalName = 'Hospital name is required';
      if (!formData.licenseNumber.trim()) newErrors.licenseNumber = 'License number is required';
      if (formData.specialties.length === 0) newErrors.specialties = 'At least one specialty is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreeToTerms) {
      setErrors({ terms: 'You must agree to the terms and conditions' });
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockUser = {
        id: '1',
        name: formData.name,
        email: formData.email,
        role: formData.role,
        avatar: formData.photo || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
        phone: formData.phone,
        location: formData.location,
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
    }, 2000);
  };

  const roles = [
    {
      id: 'migrant',
      name: 'Migrant Worker',
      description: 'Register for health services and QR card',
      icon: User,
      color: 'text-emerald-600 bg-emerald-100'
    },
    {
      id: 'hospital',
      name: 'Hospital Staff',
      description: 'Request access to manage patient records',
      icon: Building,
      color: 'text-blue-600 bg-blue-100'
    }
  ];

  const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  const occupations = [
    'Construction Worker', 'Domestic Worker', 'Factory Worker', 'Agricultural Worker',
    'Driver', 'Security Guard', 'Cleaner', 'Cook', 'Electrician', 'Plumber',
    'Carpenter', 'Painter', 'Welder', 'Mechanic', 'Other'
  ];

  const specialties = [
    'General Medicine', 'Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics',
    'Gynecology', 'Surgery', 'Emergency Medicine', 'Radiology', 'Pathology'
  ];

  const renderStep1 = () => (
    <div className="space-y-6">
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
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
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

      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Full Name *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
              placeholder="Enter your full name"
            />
          </div>
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Phone Number *
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
              placeholder="+91 9876543210"
            />
          </div>
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Email Address *
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
            placeholder="your.email@example.com"
          />
        </div>
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Password *
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
              placeholder="Create password"
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

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Confirm Password *
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
              placeholder="Confirm password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      {/* Location */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Current Location in Kerala *
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={formData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
              errors.location ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="City, District, Kerala"
          />
        </div>
        {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
      </div>

      {/* Migrant Specific Fields */}
      {formData.role === 'migrant' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Age *
              </label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                  errors.age ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
                placeholder="Enter your age"
                min="18"
                max="100"
              />
              {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Gender *
              </label>
              <select
                value={formData.gender}
                onChange={(e) => handleInputChange('gender', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                  errors.gender ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Origin State *
              </label>
              <select
                value={formData.originState}
                onChange={(e) => handleInputChange('originState', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                  errors.originState ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              >
                <option value="">Select Origin State</option>
                {states.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
              {errors.originState && <p className="text-red-500 text-sm mt-1">{errors.originState}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Occupation *
              </label>
              <select
                value={formData.occupation}
                onChange={(e) => handleInputChange('occupation', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                  errors.occupation ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              >
                <option value="">Select Occupation</option>
                {occupations.map(occupation => (
                  <option key={occupation} value={occupation}>{occupation}</option>
                ))}
              </select>
              {errors.occupation && <p className="text-red-500 text-sm mt-1">{errors.occupation}</p>}
            </div>
          </div>
        </>
      )}

      {/* Hospital Specific Fields */}
      {formData.role === 'hospital' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Hospital Name *
              </label>
              <input
                type="text"
                value={formData.hospitalName}
                onChange={(e) => handleInputChange('hospitalName', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                  errors.hospitalName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
                placeholder="Enter hospital name"
              />
              {errors.hospitalName && <p className="text-red-500 text-sm mt-1">{errors.hospitalName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                License Number *
              </label>
              <input
                type="text"
                value={formData.licenseNumber}
                onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                  errors.licenseNumber ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
                placeholder="Enter license number"
              />
              {errors.licenseNumber && <p className="text-red-500 text-sm mt-1">{errors.licenseNumber}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Specialties *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {specialties.map(specialty => (
                <label key={specialty} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.specialties.includes(specialty)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        handleInputChange('specialties', [...formData.specialties, specialty]);
                      } else {
                        handleInputChange('specialties', formData.specialties.filter(s => s !== specialty));
                      }
                    }}
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{specialty}</span>
                </label>
              ))}
            </div>
            {errors.specialties && <p className="text-red-500 text-sm mt-1">{errors.specialties}</p>}
          </div>
        </>
      )}
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      {/* Photo Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Profile Photo (Optional)
        </label>
        {formData.photo ? (
          <div className="text-center">
            <img
              src={formData.photo}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-emerald-100 mb-4"
            />
            <button
              type="button"
              onClick={() => handleInputChange('photo', null)}
              className="text-red-600 hover:text-red-700 text-sm"
            >
              Remove Photo
            </button>
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400 mb-4">Upload your profile photo</p>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    handleInputChange('photo', event.target?.result as string);
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="hidden"
              id="photo-upload"
            />
            <label
              htmlFor="photo-upload"
              className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 cursor-pointer inline-flex items-center space-x-2"
            >
              <Camera className="w-4 h-4" />
              <span>Choose Photo</span>
            </label>
          </div>
        )}
      </div>

      {/* Terms and Conditions */}
      <div>
        <label className="flex items-start space-x-3">
          <input
            type="checkbox"
            checked={formData.agreeToTerms}
            onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
            className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded mt-1"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            I agree to the{' '}
            <Link to="/terms" className="text-emerald-600 hover:text-emerald-700">
              Terms and Conditions
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-emerald-600 hover:text-emerald-700">
              Privacy Policy
            </Link>
          </span>
        </label>
        {errors.terms && <p className="text-red-500 text-sm mt-1">{errors.terms}</p>}
      </div>

      {/* Summary */}
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 dark:text-white mb-2">Registration Summary</h4>
        <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
          <p><strong>Role:</strong> {roles.find(r => r.id === formData.role)?.name}</p>
          <p><strong>Name:</strong> {formData.name}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Phone:</strong> {formData.phone}</p>
          <p><strong>Location:</strong> {formData.location}</p>
          {formData.role === 'migrant' && (
            <>
              <p><strong>Age:</strong> {formData.age}</p>
              <p><strong>Origin:</strong> {formData.originState}</p>
              <p><strong>Occupation:</strong> {formData.occupation}</p>
            </>
          )}
          {formData.role === 'hospital' && (
            <>
              <p><strong>Hospital:</strong> {formData.hospitalName}</p>
              <p><strong>License:</strong> {formData.licenseNumber}</p>
              <p><strong>Specialties:</strong> {formData.specialties.join(', ')}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Link to="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="relative">
              <Heart className="w-10 h-10 text-emerald-600 fill-current" />
              <Shield className="w-5 h-5 text-blue-600 absolute -top-1 -right-1" />
            </div>
            <div>
              <span className="text-2xl font-bold text-gradient">Aarogyam</span>
              <div className="text-xs text-gray-600 dark:text-gray-400 -mt-1">
                Kerala Health System
              </div>
            </div>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Create Your Account
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Join Kerala's digital health ecosystem
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center space-x-4">
          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= stepNumber 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}>
                {step > stepNumber ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  stepNumber
                )}
              </div>
              {stepNumber < 3 && (
                <div className={`w-12 h-0.5 ml-2 ${
                  step > stepNumber ? 'bg-emerald-600' : 'bg-gray-200 dark:bg-gray-700'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8"
        >
          <form onSubmit={handleSubmit}>
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 smooth-transition"
                >
                  Previous
                </button>
              )}
              
              {step < 3 ? (
                <button
                  type="button"
                  onClick={() => {
                    if (step === 1 && validateStep1()) {
                      setStep(2);
                    } else if (step === 2 && validateStep2()) {
                      setStep(3);
                    }
                  }}
                  className="ml-auto px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 smooth-transition flex items-center space-x-2"
                >
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="ml-auto px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 smooth-transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <span>Create Account</span>
                      <CheckCircle className="w-4 h-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          </form>

          {/* Login Link */}
          <div className="text-center mt-6">
            <p className="text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 font-medium"
              >
                Sign in here
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
          <p className="mt-1">Secure healthcare registration for all</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;