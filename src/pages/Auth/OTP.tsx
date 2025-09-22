import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Clock, RefreshCw } from 'lucide-react';
import { loginUser } from '../../store/slices/authSlice';

const OTP: React.FC = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(120);
  const [isResending, setIsResending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { phoneNumber, role } = location.state || {};

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const otpString = otp.join('');
    if (otpString.length === 6) {
      setIsVerifying(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock verification (accept any 6-digit OTP)
      const mockUser = {
        id: '1',
        name: role === 'migrant' ? 'राहुल कुमार' : role === 'hospital' ? 'Dr. Priya Sharma' : 'Admin User',
        email: `${role}@example.com`,
        phone: phoneNumber,
        role: role,
        avatar: `https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop`
      };

      dispatch(loginUser(mockUser));
      setIsVerifying(false);

      // Navigate based on role
      if (role === 'migrant') {
        navigate('/dashboard');
      } else if (role === 'hospital') {
        navigate('/hospital-dashboard');
      } else if (role === 'admin') {
        navigate('/admin-dashboard');
      }
    }
  };

  const handleResendOtp = async () => {
    setIsResending(true);
    setTimeLeft(120);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsResending(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
      >
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate('/login')}
            className="mr-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Verify OTP
          </h1>
        </div>

        {/* Info */}
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <Shield className="w-5 h-5 text-green-600 mr-2" />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Secure Verification
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            We've sent a 6-digit verification code to{' '}
            <span className="font-semibold">{phoneNumber}</span>
          </p>
        </div>

        {/* OTP Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Enter Verification Code
          </label>
          <div className="flex gap-3 justify-center">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 dark:bg-gray-700 dark:text-white transition-colors"
              />
            ))}
          </div>
        </div>

        {/* Timer */}
        <div className="mb-6 text-center">
          <div className="flex items-center justify-center mb-2">
            <Clock className="w-4 h-4 text-gray-500 mr-1" />
            <span className="text-sm text-gray-500">
              Code expires in {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        {/* Verify Button */}
        <button
          onClick={handleVerifyOtp}
          disabled={otp.join('').length !== 6 || isVerifying}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
        >
          {isVerifying ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Verifying...
            </>
          ) : (
            'Verify & Continue'
          )}
        </button>

        {/* Resend OTP */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
            Didn't receive the code?
          </p>
          <button
            onClick={handleResendOtp}
            disabled={timeLeft > 0 || isResending}
            className="text-green-600 hover:text-green-700 disabled:text-gray-400 disabled:cursor-not-allowed font-semibold text-sm flex items-center justify-center mx-auto"
          >
            {isResending ? (
              <>
                <RefreshCw className="w-4 h-4 mr-1 animate-spin" />
                Resending...
              </>
            ) : (
              'Resend OTP'
            )}
          </button>
        </div>

        {/* Demo Info */}
        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-xs text-blue-600 dark:text-blue-400 text-center">
            <strong>Demo Mode:</strong> Enter any 6-digit code to continue
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default OTP;