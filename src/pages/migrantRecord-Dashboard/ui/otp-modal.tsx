"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Shield, X, Phone, Info } from "lucide-react"

interface OTPModalProps {
  isOpen: boolean
  onClose: () => void
  onVerify: (otp: string) => void
}

export default function OTPModal({ isOpen, onClose, onVerify }: OTPModalProps) {
  const [otp, setOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (otp.length === 6) {
      setIsLoading(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      onVerify(otp)
      setIsLoading(false)
    }
  }

  const handleOtpChange = (value: string) => {
    if (value.length <= 6 && /^\d*$/.test(value)) {
      setOtp(value)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white rounded-xl shadow-xl p-4 sm:p-6 max-w-sm sm:max-w-md w-full mx-4 border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-2">
                <motion.div
                  className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-lg"
                  whileHover={{ scale: 1.05 }}
                >
                  <Shield className="h-4 w-4 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-blue-600">OTP Verification</h3>
                  <p className="text-xs text-gray-600 flex items-center">
                    <Phone className="h-3 w-3 mr-1" />
                    Secure access to health records
                  </p>
                </div>
              </div>
              <motion.button
                onClick={onClose}
                className="text-gray-600 hover:text-gray-800 transition-colors p-1 rounded-full hover:bg-gray-100"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="h-4 w-4" />
              </motion.button>
            </div>

            <motion.div
              className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-start space-x-2">
                <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-blue-800 mb-1 text-sm">Demo OTP Information</h4>
                  <div className="text-xs text-blue-700 space-y-1">
                    <p>
                      <strong>Demo OTP:</strong>{" "}
                      <code className="bg-blue-100 px-1 py-0.5 rounded font-mono text-xs">123456</code>
                    </p>
                    <p>
                      <strong>Contains:</strong> Access to all test results, health score details, and medical
                      recommendations
                    </p>
                    <p>
                      <strong>Valid for:</strong> Single session access to protected health information
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="mb-4">
              <p className="text-xs text-gray-600 mb-3 flex items-center flex-wrap">
                <Phone className="h-3 w-3 mr-2 flex-shrink-0" />
                <span>An OTP has been sent to your registered mobile number ending with ****67</span>
              </p>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-xs font-medium mb-2">Enter 6-digit OTP</label>
                  <motion.input
                    type="text"
                    value={otp}
                    onChange={(e) => handleOtpChange(e.target.value)}
                    className="w-full px-3 py-2 sm:py-3 border-2 border-gray-200 rounded-lg text-center text-lg sm:text-xl font-mono tracking-widest focus:border-blue-600 focus:outline-none transition-colors"
                    placeholder="000000"
                    maxLength={6}
                    whileFocus={{ scale: 1.02 }}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={otp.length !== 6 || isLoading}
                  className="w-full bg-blue-600 text-white py-2 sm:py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-200 text-sm sm:text-base"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <motion.div
                        className="w-3 h-3 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      />
                      <span>Verifying...</span>
                    </div>
                  ) : (
                    <span className="flex items-center justify-center">
                      <Shield className="h-3 w-3 mr-2" />
                      Verify OTP
                    </span>
                  )}
                </motion.button>
              </form>

              <div className="mt-3 text-center">
                <motion.button
                  className="text-xs text-blue-600 hover:underline flex items-center justify-center space-x-1"
                  whileHover={{ scale: 1.05 }}
                >
                  <Phone className="h-3 w-3" />
                  <span>Didn't receive OTP? Resend</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
