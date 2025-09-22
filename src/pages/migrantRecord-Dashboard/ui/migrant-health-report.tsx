
"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  MapPin,
  CheckCircle,
  AlertTriangle,
  Clock,
  FileText,
  ChevronRight,
  Shield,
  Download,
  Phone,
  User,
  Calendar,
  Building2,
  Stethoscope,
  Activity,
  Heart,
  Menu,
  X
} from "lucide-react"
import { Card } from "./card"
import { Badge } from "./badge"
import OTPModal from "./otp-modal"

// Types
interface TestResult {
  testName: string
  result: string
  normalRange: string
  status: "normal" | "abnormal" | "pending"
  reportAttached?: boolean
}

interface InteractiveTestSectionProps {
  title: string
  tests: TestResult[]
  description: string
  priority: "mandatory" | "recommended" | "optional"
}

interface StatusIconProps {
  status: "normal" | "abnormal" | "pending"
}

interface StatusBadgeProps {
  status: "normal" | "abnormal" | "pending"
}

// Test data
const mandatoryTests: TestResult[] = [
  { testName: "TB Screening", result: "Negative", normalRange: "Negative", status: "normal", reportAttached: true },
  { testName: "COVID-19 Test", result: "Negative", normalRange: "Negative", status: "normal", reportAttached: true },
  { testName: "Blood Pressure", result: "120/80 mmHg", normalRange: "90-140/60-90 mmHg", status: "normal" },
  { testName: "Weight", result: "68 kg", normalRange: "BMI 18.5-24.9", status: "normal" },
  { testName: "Height", result: "170 cm", normalRange: "As per age", status: "normal" },
  { testName: "Skin Examination", result: "No visible infection", normalRange: "No infection", status: "normal" },
]

const recommendedTests: TestResult[] = [
  {
    testName: "Complete Blood Count",
    result: "Normal",
    normalRange: "WBC: 4-11k/μL",
    status: "normal",
    reportAttached: true,
  },
  { testName: "Blood Sugar (Fasting)", result: "95 mg/dL", normalRange: "70-100 mg/dL", status: "normal" },
  { testName: "Vaccination Status", result: "Up to date", normalRange: "Current", status: "normal" },
  { testName: "Dengue Test", result: "Negative", normalRange: "Negative", status: "normal" },
  { testName: "Malaria Test", result: "Negative", normalRange: "Negative", status: "normal" },
]

const optionalTests: TestResult[] = [
  { testName: "Hepatitis B", result: "Negative", normalRange: "Negative", status: "normal", reportAttached: true },
  { testName: "HIV Test", result: "Negative", normalRange: "Negative", status: "normal", reportAttached: true },
  { testName: "Vision Test", result: "6/6", normalRange: "6/6 to 6/9", status: "normal" },
  { testName: "Hearing Test", result: "Normal", normalRange: "Normal", status: "normal" },
]

// Status Icon Component
const StatusIcon: React.FC<StatusIconProps> = ({ status }) => {
  switch (status) {
    case "normal":
      return <CheckCircle className="h-4 w-4 text-green-600" />
    case "abnormal":
      return <AlertTriangle className="h-4 w-4 text-red-600" />
    case "pending":
      return <Clock className="h-4 w-4 text-yellow-600" />
  }
}

  const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    const variants = {
      normal: "bg-green-100 text-green-800 border-green-200",
      abnormal: "bg-red-100 text-red-800 border-red-200",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    }

    return (
      <Badge variant="outline" className={variants[status]}>
        <StatusIcon status={status} />
        <span className="ml-1 capitalize">{status}</span>
      </Badge>
    )
  }

// Interactive Test Section Component
const InteractiveTestSection: React.FC<InteractiveTestSectionProps> = ({
  title,
  tests,
  description,
  priority,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const priorityStyles = {
    mandatory: "border-red-200 bg-red-50 hover:bg-red-100 text-red-800",
    recommended: "border-yellow-200 bg-yellow-50 hover:bg-yellow-100 text-yellow-800",
    optional: "border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-800",
  }

  const priorityIcons = {
    mandatory: "🔴",
    recommended: "🟡",
    optional: "🔵",
  }

  return (
    <motion.div
      className="space-y-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full text-left p-3 sm:p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${priorityStyles[priority]} hover:shadow-md`}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
            <span className="text-base sm:text-lg flex-shrink-0">{priorityIcons[priority]}</span>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-sm sm:text-lg truncate">{title}</h3>
              <p className="text-xs sm:text-sm opacity-80 line-clamp-2">{description}</p>
            </div>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0 ml-2">
            <Badge variant="outline" className="bg-white/50 text-xs">
              {tests.length}
            </Badge>
            <motion.div 
              animate={{ rotate: isExpanded ? 90 : 0 }} 
              transition={{ duration: 0.2 }}
              className="flex-shrink-0"
            >
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </motion.div>
          </div>
        </div>
      </motion.button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-2 border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-blue-600 text-white px-3 sm:px-4 py-2 font-semibold text-xs sm:text-sm">
                {title} - Detailed Results
              </div>
              
              {/* Mobile Card View */}
              <div className="block sm:hidden">
                {tests.map((test, index) => (
                  <motion.div
                    key={index}
                    className={`p-3 border-b border-gray-200 last:border-b-0 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-sm">{test.testName}</h4>
                        <StatusBadge status={test.status} />
                      </div>
                      <div className="text-xs text-gray-600 space-y-1">
                        <div><span className="font-medium">Result:</span> {test.result}</div>
                        <div><span className="font-medium">Normal Range:</span> {test.normalRange}</div>
                        <div className="flex items-center">
                          <span className="font-medium">Report:</span>
                          {test.reportAttached ? (
                            <div className="flex items-center text-green-600 ml-1">
                              <FileText className="h-3 w-3 mr-1" />
                              <span>Attached</span>
                            </div>
                          ) : (
                            <span className="text-gray-500 ml-1">Not Available</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Desktop Table View */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="text-left p-3 font-medium">Test Name</th>
                      <th className="text-left p-3 font-medium">Result</th>
                      <th className="text-left p-3 font-medium">Normal Range</th>
                      <th className="text-left p-3 font-medium">Status</th>
                      <th className="text-left p-3 font-medium">Report</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tests.map((test, index) => (
                      <motion.tr
                        key={index}
                        className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <td className="p-3 font-medium">{test.testName}</td>
                        <td className="p-3">{test.result}</td>
                        <td className="p-3 text-gray-600">{test.normalRange}</td>
                        <td className="p-3">
                          <StatusBadge status={test.status} />
                        </td>
                        <td className="p-3">
                          {test.reportAttached ? (
                            <div className="flex items-center text-green-600">
                              <FileText className="h-4 w-4 mr-1" />
                              <span className="text-xs">Attached</span>
                            </div>
                          ) : (
                            <span className="text-xs text-gray-500">Not Available</span>
                          )}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// Main Component
export const MigrantHealthReport: React.FC = () => {
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false)
  const [isOtpVerified, setIsOtpVerified] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleSendOtp = () => {
    setOtpSent(true)
    setIsOtpModalOpen(true)
  }

  const handleOtpVerify = (otp: string) => {
    if (otp === "123456") {
      setIsOtpVerified(true)
      setIsOtpModalOpen(false)
    }
  }

  const generateQRCode = () => {
    const currentUrl = window.location.href
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(currentUrl)}`
  }

  const handleDownloadPDF = () => {
    // Create PDF content with complete test results
    const printWindow = window.open('', '_blank');
    const currentDate = new Date().toLocaleDateString('en-IN');
    
    const pdfContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Kerala Health Report - ARG-2024-MH-001234</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
          line-height: 1.4; 
          background: white;
          position: relative;
        }
        .watermark {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(15deg);
          opacity: 0.05;
          z-index: 1;
          pointer-events: none;
        }
        .content { 
          position: relative; 
          z-index: 2; 
          padding: 20px;
          max-width: 800px;
          margin: 0 auto;
        }
        .header { 
          text-align: center; 
          background: #1e40af; 
          color: white; 
          padding: 15px; 
          margin-bottom: 20px;
          border-radius: 8px;
        }
        .logo-section { 
          display: flex; 
          justify-content: space-between; 
          align-items: center; 
          margin-bottom: 20px;
          border-bottom: 2px solid #e5e7eb;
          padding-bottom: 15px;
        }
        .personal-info { 
          display: grid; 
          grid-template-columns: 1fr 2fr; 
          gap: 20px; 
          margin-bottom: 20px;
          padding: 15px;
          background: #f8fafc;
          border-radius: 8px;
        }
        .photo { 
          width: 120px; 
          height: 150px; 
          background: #e5e7eb; 
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .photo img { width: 100%; height: 100%; object-fit: cover; }
        .details { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
        .detail-item { margin-bottom: 10px; }
        .detail-label { font-weight: bold; color: #374151; font-size: 12px; }
        .detail-value { color: #1f2937; font-size: 14px; margin-top: 2px; }
        .health-score { 
          text-align: center; 
          background: linear-gradient(135deg, #eff6ff, #dbeafe); 
          padding: 20px; 
          border-radius: 12px; 
          margin: 20px 0;
          border: 2px solid #3b82f6;
        }
        .score-circle { 
          display: inline-block; 
          width: 100px; 
          height: 100px; 
          border: 6px solid #3b82f6; 
          border-radius: 50%; 
          display: flex; 
          align-items: center; 
          justify-content: center;
          margin: 10px;
        }
        .score-text { font-size: 24px; font-weight: bold; color: #1e40af; }
        .test-section { 
          margin: 20px 0; 
          page-break-inside: avoid;
        }
        .test-header { 
          background: #3b82f6; 
          color: white; 
          padding: 10px; 
          font-weight: bold;
          border-radius: 6px 6px 0 0;
        }
        .test-table { 
          width: 100%; 
          border-collapse: collapse; 
          background: white;
          border: 1px solid #d1d5db;
        }
        .test-table th, .test-table td { 
          border: 1px solid #d1d5db; 
          padding: 8px; 
          text-align: left; 
          font-size: 11px;
        }
        .test-table th { background: #f3f4f6; font-weight: bold; }
        .status-normal { color: #16a34a; font-weight: bold; }
        .status-abnormal { color: #dc2626; font-weight: bold; }
        .status-pending { color: #ca8a04; font-weight: bold; }
        .footer { 
          margin-top: 30px; 
          text-align: center; 
          font-size: 10px; 
          color: #6b7280;
          border-top: 1px solid #e5e7eb;
          padding-top: 15px;
        }
        .signature-line { 
          border-top: 1px solid #374151; 
          width: 200px; 
          margin: 40px auto 10px; 
        }
        @media print {
          body { margin: 0; }
          .content { padding: 15px; }
        }
        @page { margin: 1cm; }
      </style>
    </head>
    <body>
      <!-- Government Watermark -->
      <div class="watermark">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Emblem_of_Kerala.svg/400px-Emblem_of_Kerala.svg.png" 
             alt="Kerala Government" 
             style="width: 300px; height: 300px;">
      </div>
      
      <div class="content">
        <!-- Page 1 -->
        <div class="header">
          <h1>🏥 KERALA STATE HEALTH DEPARTMENT</h1>
          <h2>आरोग्यम - AAROGYAM MIGRANT HEALTH RECORD SYSTEM</h2>
        </div>
        
        <div class="logo-section">
          <div>
            <h2 style="color: #1e40af; margin-bottom: 5px;">📋 HEALTH REPORT</h2>
            <p style="color: #6b7280; font-size: 14px;">Report Ref: ARG-2024-MH-001234</p>
          </div>
          <div style="text-align: right;">
            <p><strong>Issue Date:</strong> 15 March 2024</p>
            <p><strong>Valid Till:</strong> 15 March 2025</p>
            <p><strong>Generated:</strong> ${currentDate}</p>
          </div>
        </div>
        
        <div class="personal-info">
          <div class="photo">
            <img src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg" alt="Photo">
          </div>
          <div>
            <h3 style="color: #1e40af; margin-bottom: 15px;">👤 Personal Information</h3>
            <div class="details">
              <div class="detail-item">
                <div class="detail-label">Migrant ID</div>
                <div class="detail-value">KL-MIG-2025-001</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Full Name</div>
                <div class="detail-value">Rajesh Kumar / സുമിത് കുമാര്</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Date of Birth</div>
                <div class="detail-value">12 September 1997</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Gender</div>
                <div class="detail-value">Male</div>
              </div>
              <div class="detail-item" style="grid-column: 1 / -1;">
                <div class="detail-label">Current Address</div>
                <div class="detail-value">Room 12, Workers Colony, Kakkanad, Ernakulam, Kerala - 682030</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="health-score">
          <h3 style="margin-bottom: 15px; color: #1e40af;">🏥 Health Assessment Summary</h3>
          <div style="display: flex; justify-content: center; align-items: center; flex-wrap: wrap; gap: 20px;">
            <div class="score-circle">
              <span class="score-text">95</span>
            </div>
            <div style="text-align: left;">
              <p><strong>Overall Status:</strong> <span style="color: #16a34a;">✅ Fit for Employment</span></p>
              <p><strong>Tests Completed:</strong> 16/16 (100%)</p>
              <p><strong>Risk Assessment:</strong> Low Risk</p>
              <p><strong>Next Checkup:</strong> Sep 15, 2026</p>
            </div>
          </div>
        </div>
        
        <!-- Page Break -->
        <div style="page-break-before: always;"></div>
        
        <!-- Page 2 - Test Results -->
        <div class="header">
          <h2>📊 DETAILED TEST RESULTS</h2>
          <p>Complete Health Assessment Report</p>
        </div>
        
        <div class="test-section">
          <div class="test-header">🔴 MANDATORY TESTS (Required for all migrants)</div>
          <table class="test-table">
            <thead>
              <tr>
                <th>Test Name</th>
                <th>Result</th>
                <th>Normal Range</th>
                <th>Status</th>
                <th>Report</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>TB Screening</td><td>Negative</td><td>Negative</td><td class="status-normal">✅ Normal</td><td>📄 Attached</td></tr>
              <tr><td>COVID-19 Test</td><td>Negative</td><td>Negative</td><td class="status-normal">✅ Normal</td><td>📄 Attached</td></tr>
              <tr><td>Blood Pressure</td><td>120/80 mmHg</td><td>90-140/60-90 mmHg</td><td class="status-normal">✅ Normal</td><td>-</td></tr>
              <tr><td>Weight</td><td>68 kg</td><td>BMI 18.5-24.9</td><td class="status-normal">✅ Normal</td><td>-</td></tr>
              <tr><td>Height</td><td>170 cm</td><td>As per age</td><td class="status-normal">✅ Normal</td><td>-</td></tr>
              <tr><td>Skin Examination</td><td>No visible infection</td><td>No infection</td><td class="status-normal">✅ Normal</td><td>-</td></tr>
            </tbody>
          </table>
        </div>
        
        <div class="test-section">
          <div class="test-header">🟡 RECOMMENDED TESTS (Additional health assessment)</div>
          <table class="test-table">
            <thead>
              <tr>
                <th>Test Name</th>
                <th>Result</th>
                <th>Normal Range</th>
                <th>Status</th>
                <th>Report</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Complete Blood Count</td><td>Normal</td><td>WBC: 4-11k/μL</td><td class="status-normal">✅ Normal</td><td>📄 Attached</td></tr>
              <tr><td>Blood Sugar (Fasting)</td><td>95 mg/dL</td><td>70-100 mg/dL</td><td class="status-normal">✅ Normal</td><td>-</td></tr>
              <tr><td>Vaccination Status</td><td>Up to date</td><td>Current</td><td class="status-normal">✅ Normal</td><td>-</td></tr>
              <tr><td>Dengue Test</td><td>Negative</td><td>Negative</td><td class="status-normal">✅ Normal</td><td>-</td></tr>
              <tr><td>Malaria Test</td><td>Negative</td><td>Negative</td><td class="status-normal">✅ Normal</td><td>-</td></tr>
            </tbody>
          </table>
        </div>
        
        <div class="test-section">
          <div class="test-header">🔵 OPTIONAL TESTS (Supplementary health screening)</div>
          <table class="test-table">
            <thead>
              <tr>
                <th>Test Name</th>
                <th>Result</th>
                <th>Normal Range</th>
                <th>Status</th>
                <th>Report</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Hepatitis B</td><td>Negative</td><td>Negative</td><td class="status-normal">✅ Normal</td><td>📄 Attached</td></tr>
              <tr><td>HIV Test</td><td>Negative</td><td>Negative</td><td class="status-normal">✅ Normal</td><td>📄 Attached</td></tr>
              <tr><td>Vision Test</td><td>6/6</td><td>6/6 to 6/9</td><td class="status-normal">✅ Normal</td><td>-</td></tr>
              <tr><td>Hearing Test</td><td>Normal</td><td>Normal</td><td class="status-normal">✅ Normal</td><td>-</td></tr>
            </tbody>
          </table>
        </div>
        
        <div class="footer">
          <div class="signature-line"></div>
          <p><strong>Authorized by Kerala Health Department</strong></p>
          <p style="margin: 15px 0;">
            <strong>🏥 Hospital:</strong> Government Medical College Hospital, Ernakulam<br>
            <strong>📍 Address:</strong> Kalamassery, Ernakulam, Kerala - 683503<br>
            <strong>📅 Last Checkup:</strong> 15 March 2024
          </p>
          <p style="margin-top: 20px; padding: 10px; background: #fef3c7; border-radius: 5px;">
            <strong>⚠️ Confidentiality Note:</strong> This report is confidential and intended only for healthcare and administrative purposes.
          </p>
          <p style="margin-top: 15px;">
            <strong>📞 Contact:</strong> 0471-2552056 | <strong>✉️ Email:</strong> health@kerala.gov.in<br>
            <strong>🌐 Website:</strong> www.kerala.gov.in/health
          </p>
        </div>
      </div>
    </body>
    </html>
    `;
    
    if (printWindow) {
      printWindow.document.write(pdfContent);
      printWindow.document.close();
      printWindow.focus();
      
      // Wait for content to load then print
      printWindow.onload = function() {
        setTimeout(() => {
          printWindow.print();
          printWindow.close();
        }, 500);
      };
    }
  }

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Kerala Government Watermark */}
<div className="absolute bottom-[1150px] inset-0 flex items-center justify-center pointer-events-none z-50 opacity-100">
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 0.07, scale: 1 }}
    transition={{ duration: 2, delay: 0 }}
    className="transform rotate-12"
  >
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/5/5b/Government_of_Kerala_Logo.svg"
      alt="Kerala Government Logo"
      className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px] object-contain opacity-100 z-50"
    />
  </motion.div>
</div>

      {/* Fixed Download Button - Moved to bottom right */}
      <motion.div
        className="fixed bottom-6 right-6 z-50 download-btn"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
      >
        <motion.button
          onClick={handleDownloadPDF}
          className="flex items-center space-x-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-full font-bold hover:shadow-2xl transition-all duration-300 shadow-xl text-sm sm:text-base hover:from-red-700 hover:to-red-800 border-2 border-red-500"
          whileHover={{ scale: 1.1, y: -3 }}
          whileTap={{ scale: 0.95 }}
        >
          <Download className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0" />
          <span className="hidden sm:inline font-bold">Download PDF</span>
          <span className="sm:hidden font-bold">PDF</span>
        </motion.button>
      </motion.div>

      {/* Main Container */}
      <div className="min-h-screen relative">
        <div className="max-w-6xl mx-auto bg-white shadow-2xl print:shadow-none print:max-w-none border border-gray-200 sm:rounded-lg overflow-hidden relative">
          
          
          {/* Header */}
          <motion.div
            className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 p-3 sm:p-4 relative overflow-hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Kerala Government Watermark in Header */}
           
            
            <div className="flex justify-between items-center relative z-20">
              <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600 min-w-0 flex-1">
                <Building2 className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                <span className="truncate">Kerala Government Health Department</span>
              </div>
            </div>
          </motion.div>

          

          {/* Title Banner */}
          <motion.div
            className="bg-blue-600 text-white text-center py-3 sm:py-4 text-xs sm:text-sm font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex items-center justify-center space-x-2 px-4">
              <Stethoscope className="h-4 w-4 flex-shrink-0" />
              <span className="text-center leading-tight">
                Kerala State Health Department – Aarogyam Migrant Health Record System
              </span>
              <Activity className="h-4 w-4 flex-shrink-0" />
            </div>
          </motion.div>

          

          {/* Report Header */}
          <motion.div
            className="p-4 sm:p-6 border-b-2 border-gray-200 bg-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex flex-col lg:flex-row justify-between items-start space-y-4 lg:space-y-0 lg:space-x-6 mb-4">
              {/* Logo and Title */}
              
              <div className="flex items-center space-x-3 sm:space-x-4">
                <motion.div
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16   flex items-center justify-center text-white font-bold text-lg sm:text-2xl">
                    <img src="logo.Aro.svg" alt="" />
                  </div>
                </motion.div>
                <div>
                  <h1 className="text-xl sm:text-3xl font-bold  flex items-center space-x-2">
                    {/* <Heart className="h-5 w-5 sm:h-8 sm:w-8" /> */}
                    {/* <span>AAROGYAM</span> */}
                    <img src="logo.svg" alt="" className="h-9" />
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-600 flex items-center space-x-1">
                    {/* <User className="h-3 w-3" /> */}
                    <span>Migrant Health Record System</span>
                  </p>
                </div>
                
              </div>

              {/* QR Code */}
              <div className="text-right self-center lg:self-start">
                <motion.div
                  className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-lg shadow-sm overflow-hidden mb-2 mx-auto lg:mx-0"
                  whileHover={{ scale: 1.05 }}
                >
                  <img
                    src={generateQRCode() || "/placeholder.svg"}
                    alt="QR Code for Health Report"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = "none"
                      target.parentElement!.innerHTML = `
                        <div class="w-full h-full flex items-center justify-center text-xs text-center bg-gray-100">
                          <div>
                            <div class="text-blue-600 font-bold text-sm">QR</div>
                            <div class="text-xs text-gray-600">Scan Me</div>
                          </div>
                        </div>
                      `
                    }}
                  />
                </motion.div>
                <p className="text-xs text-gray-600 flex items-center justify-center lg:justify-end space-x-1">
                  <Shield className="h-3 w-3" />
                  <span>Scan to verify</span>
                </p>
              </div>
            </div>

            {/* Report Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-sm">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                <span className="font-medium flex items-center space-x-1 mb-1">
                  <FileText className="h-3 w-3" />
                  <span>Report Reference No:</span>
                </span>
                <p className="text-black-700 font-mono font-bold text-xs sm:text-sm break-all">ARG-2024-MH-001234</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                <span className="font-medium flex items-center space-x-1 mb-1">
                  <Calendar className="h-3 w-3" />
                  <span>Issue Date:</span>
                </span>
                <p>15 March 2024</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
                <span className="font-medium flex items-center space-x-1 mb-1">
                  <Clock className="h-3 w-3" />
                  <span>Valid Till:</span>
                </span>
                <p>15 March 2026</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Personal Information */}
          <motion.div
            className="p-4 sm:p-6 border-b border-gray-200 bg-gradient-to-br from-white to-slate-50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="border-2 border-blue-200 bg-white mb-6 shadow-xl p-4 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                {/* Photo */}
                <div className="flex justify-center md:justify-start">
                  <motion.div
                    className="w-24 h-32 sm:w-32 sm:h-40 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center rounded-lg shadow-sm overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                  >
                    <img 
                      src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg" 
                      alt="Migrant Photo" 
                      className="object-cover h-full w-full rounded"
                    />
                  </motion.div>
                </div>

                {/* Personal Details */}
                <div className="md:col-span-2">
                  <h2 className="text-lg font-semibold text-blue-600 mb-4 flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>Migrant Information</span>
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      <span className="font-medium text-gray-600 flex items-center space-x-1 mb-1">
                        <FileText className="h-3 w-3" />
                        <span>Migrant ID:</span>
                      </span>
                      <p className="font-mono font-bold">KL-MIG-2025-001</p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      <span className="font-medium text-gray-600 flex items-center space-x-1 mb-1">
                        <User className="h-3 w-3" />
                        <span>Full Name:</span>
                      </span>
                      <p>Rajesh Kumar / സുമിത് കുമാര്</p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 }}
                    >
                      <span className="font-medium text-gray-600 flex items-center space-x-1 mb-1">
                        <Calendar className="h-3 w-3" />
                        <span>Date of Birth:</span>
                      </span>
                      <p>12 September 1997</p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.0 }}
                    >
                      <span className="font-medium text-gray-600 mb-1 block">Gender:</span>
                      <p>Male</p>
                    </motion.div>

                    <motion.div
                      className="col-span-1 sm:col-span-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.1 }}
                    >
                      <span className="font-medium text-gray-600 flex items-center space-x-1 mb-1">
                        <MapPin className="h-3 w-3" />
                        <span>Current Address:</span>
                      </span>
                      <p className="break-words">Room 12, Workers Colony, Kakkanad, Ernakulam, Kerala - 682030</p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Hospital Information */}
          <motion.div
            className="p-4 sm:p-6 border-b border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <Card className="border-2 border-blue-200 bg-white mb-6 shadow-xl">
              <div className="shadow-sm bg-gradient-to-br from-white to-blue-50">
                <div className="p-4 sm:p-6">
                  <h3 className="font-semibold text-blue-600 mb-3 flex items-center space-x-2">
                    <Building2 className="h-5 w-5" />
                    <span>Last Checkup Hospital Information</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-600 flex items-center space-x-1 mb-1">
                        <Building2 className="h-3 w-3" />
                        <span>Hospital Name:</span>
                      </span>
                      <p>Government Medical College Hospital, Ernakulam</p>
                    </div>

                    <div>
                      <span className="font-medium text-gray-600 flex items-center space-x-1 mb-1">
                        <FileText className="h-3 w-3" />
                        <span>Registration No:</span>
                      </span>
                      <p>GMCH-ERN-2024</p>
                    </div>

                    <div>
                      <span className="font-medium text-gray-600 flex items-center space-x-1 mb-1">
                        <MapPin className="h-3 w-3" />
                        <span>Hospital Address:</span>
                      </span>
                      <p className="break-words">Kalamassery, Ernakulam, Kerala - 683503</p>
                    </div>

                    <div>
                      <span className="font-medium text-gray-600 flex items-center space-x-1 mb-1">
                        <Calendar className="h-3 w-3" />
                        <span>Last Checkup Date:</span>
                      </span>
                      <p>15 March 2024</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Health Score Section */}
          <div className="p-4 sm:p-6 space-y-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Card className="border-2 border-blue-200 bg-white mb-6 shadow-xl">
                <div className="p-4 sm:p-6">
                  <div className="flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-8">
                    {/* Health Score Circle */}
                    <div className="flex-shrink-0">
                      <div className="relative w-32 h-32 sm:w-48 sm:h-48 lg:w-56 lg:h-56">
                        <div className="absolute inset-0 w-32 h-32 sm:w-48 sm:h-48 lg:w-56 lg:h-56 rounded-full border-4 sm:border-6 lg:border-8 border-gray-100 bg-white shadow-2xl"></div>
                        <svg
                          className="absolute inset-0 w-32 h-32 sm:w-48 sm:h-48 lg:w-56 lg:h-56 transform -rotate-90"
                          viewBox="0 0 100 100"
                        >
                          <circle cx="50" cy="50" r="42" fill="none" stroke="#f1f5f9" strokeWidth="6" />
                          <motion.circle
                            cx="50"
                            cy="50"
                            r="42"
                            fill="none"
                            stroke="#0ea5e9"
                            strokeWidth="6"
                            strokeLinecap="round"
                            strokeDasharray={`${85 * 2.64} 264`}
                            initial={{ strokeDasharray: "0 264" }}
                            animate={{ strokeDasharray: `${85 * 2.64} 264` }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                            className="drop-shadow-lg"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <motion.div
                            className="text-2xl sm:text-4xl lg:text-6xl font-bold text-blue-600"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 1, duration: 0.5, type: "spring" }}
                          >
                            95
                          </motion.div>
                          <div className="text-xs sm:text-sm text-slate-600 font-semibold tracking-wider uppercase">
                            Health Score
                          </div>
                          <motion.div
                            className="text-xs sm:text-sm text-green-600 font-bold tracking-wide"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5 }}
                          >
                            Excellent
                          </motion.div>
                        </div>
                      </div>
                    </div>

                    {/* Health Summary */}
                    <div className="flex-1 w-full">
                      <motion.div
                        className="mb-4 text-center lg:text-left"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-800 mb-2">Health Assessment Summary</h3>
                        <p className="text-sm sm:text-base text-slate-600">
                          Comprehensive health evaluation completed successfully
                        </p>
                      </motion.div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm sm:text-base">
                        <motion.div
                          className="bg-white rounded-lg p-3 sm:p-4 border border-green-200 shadow-sm"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                        >
                          <div className="flex items-center space-x-2 mb-2">
                            <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                            <span className="font-semibold text-green-800 text-xs sm:text-sm lg:text-base">Overall Status</span>
                          </div>
                          <p className="text-green-700 font-bold text-xs sm:text-sm lg:text-base">Fit for Employment</p>
                        </motion.div>

                        <motion.div
                          className="bg-white rounded-lg p-3 sm:p-4 border border-blue-200 shadow-sm"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                        >
                          <div className="flex items-center space-x-2 mb-2">
                            <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                            <span className="font-semibold text-blue-800 text-xs sm:text-sm lg:text-base">Tests Completed</span>
                          </div>
                          <p className="text-blue-700 font-bold text-xs sm:text-sm lg:text-base">16/16 (100%)</p>
                        </motion.div>

                        <motion.div
                          className="bg-white rounded-lg p-3 sm:p-4 border border-blue-200 shadow-sm"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 }}
                        >
                          <div className="flex items-center space-x-2 mb-2">
                            <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                            <span className="font-semibold text-blue-800 text-xs sm:text-sm lg:text-base">Next Checkup</span>
                          </div>
                          <p className="text-blue-700 font-bold text-xs sm:text-sm lg:text-base">Sep 15, 2026</p>
                        </motion.div>

                        <motion.div
                          className="bg-white rounded-lg p-3 sm:p-4 border border-blue-200 shadow-sm"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7 }}
                        >
                          <div className="flex items-center space-x-2 mb-2">
                            <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                            <span className="font-semibold text-blue-800 text-xs sm:text-sm lg:text-base">Risk Assessment</span>
                          </div>
                          <p className="text-blue-700 font-bold text-xs sm:text-sm lg:text-base">Low Risk</p>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* OTP Section and Test Results */}
            <div className="mb-8 otp-section">
              {!isOtpVerified ? (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                  <Card className="border-2 border-blue-200 bg-white p-4 sm:p-8 relative backdrop-blur-sm">
                    <div className="flex flex-col items-center space-y-4 relative z-10">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                        <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                      </div>
                      <div className="max-w-md">
                        <h3 className="text-lg sm:text-xl font-bold text-blue-600 mb-2">Secure Access Required</h3>
                        <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
                          To view detailed test results, please verify your identity with OTP
                        </p>
                      </div>
                      <motion.button
                        onClick={handleSendOtp}
                        className="bg-blue-600 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg text-sm sm:text-base w-full sm:w-auto hover:shadow-xl"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {otpSent ? "Resend OTP" : "Send OTP to View Results"}
                      </motion.button>
                    </div>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4"
                >
                  <div className="text-center mb-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", duration: 0.5 }}
                      className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-3 sm:px-4 py-2 rounded-full text-sm sm:text-base mx-4 shadow-md"
                    >
                      <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span className="font-semibold">Access Verified - Test Results Unlocked</span>
                    </motion.div>
                  </div>

                  <InteractiveTestSection
                    title="Mandatory Tests"
                    tests={mandatoryTests}
                    description="Essential health screenings required for all migrants"
                    priority="mandatory"
                  />

                  <InteractiveTestSection
                    title="Recommended Tests"
                    tests={recommendedTests}
                    description="Additional tests recommended for comprehensive health assessment"
                    priority="recommended"
                  />

                  <InteractiveTestSection
                    title="Optional Tests"
                    tests={optionalTests}
                    description="Supplementary tests for specific health concerns"
                    priority="optional"
                  />
                </motion.div>
              )}
            </div>
          </div>

          {/* Footer */}
          <motion.div
            className="p-4 sm:p-6 border-t-2 border-gray-200 bg-gray-50 relative overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <div className="relative z-10">
              <div className="text-center mb-4">
                <p className="font-medium flex items-center justify-center space-x-2 text-sm sm:text-base">
                  <Shield className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>Authorized by Kerala Health Department</span>
                </p>
                <div className="w-32 sm:w-48 h-px bg-gray-200 mx-auto mt-6 sm:mt-8 mb-2"></div>
                <p className="text-xs text-gray-600">Authorized Signatory</p>
              </div>

              <div className="text-center text-xs text-gray-600 space-y-2">
                <p className="mb-2 px-4">
                  <strong>Confidentiality Note:</strong> This report is confidential and intended only for healthcare and
                  administrative purposes.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
                  <span className="flex items-center space-x-1">
                    <Phone className="h-3 w-3" />
                    <span>0471-2552056</span>
                  </span>
                  <span className="hidden sm:inline text-gray-400">|</span>
                  <span>health@kerala.gov.in</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* OTP Modal */}
          <OTPModal 
            isOpen={isOtpModalOpen} 
            onClose={() => setIsOtpModalOpen(false)} 
            onVerify={handleOtpVerify} 
          />
        </div>
      </div>
    </div>
  )
}

export default MigrantHealthReport