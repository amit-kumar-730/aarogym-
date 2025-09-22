"use client"

import { useState } from "react"
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
} from "lucide-react"
import { Card } from "./card"
import { Badge } from "./badge"
import OTPModal from "./otp-modal"

interface TestResult {
  testName: string
  result: string
  normalRange: string
  status: "normal" | "abnormal" | "pending"
  reportAttached?: boolean
}

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

function StatusIcon({ status }: { status: "normal" | "abnormal" | "pending" }) {
  switch (status) {
    case "normal":
      return <CheckCircle className="h-4 w-4 text-green-600" />
    case "abnormal":
      return <AlertTriangle className="h-4 w-4 text-red-600" />
    case "pending":
      return <Clock className="h-4 w-4 text-yellow-600" />
  }
}

function StatusBadge({ status }: { status: "normal" | "abnormal" | "pending" }) {
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

function InteractiveTestSection({
  title,
  tests,
  description,
  priority,
}: {
  title: string
  tests: TestResult[]
  description: string
  priority: "mandatory" | "recommended" | "optional"
}) {
  const [isExpanded, setIsExpanded] = useState(false)

  const priorityStyles = {
    mandatory: "border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-800",
    recommended: "border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-800",
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
        className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${priorityStyles[priority]} hover:shadow-md`}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-lg">{priorityIcons[priority]}</span>
            <div>
              <h3 className="font-semibold text-lg">{title}</h3>
              <p className="text-sm opacity-80">{description}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-white/50">
              {tests.length} tests
            </Badge>
            <motion.div animate={{ rotate: isExpanded ? 90 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronRight className="h-5 w-5" />
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
              <div className="bg-blue-600 text-white px-4 py-2 font-semibold text-sm">{title} - Detailed Results</div>
              <div className="overflow-x-auto">
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

export function MigrantHealthReport() {
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false)
  const [isOtpVerified, setIsOtpVerified] = useState(false)
  const [otpSent, setOtpSent] = useState(false)

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
    const reportContent = `
KERALA GOVERNMENT HEALTH DEPARTMENT
AAROGYAM - MIGRANT HEALTH RECORD SYSTEM

Report Reference No: ARG-2024-MH-001234
Issue Date: 15 March 2024
Valid Till: 15 March 2026

MIGRANT INFORMATION:
Name: Ram Kumar Sharma
Migrant ID: MIG-KL-2024-5678
Date of Birth: 12 September 1997
Gender: Male
Current Address: Room 12, Workers Colony, Kakkanad, Ernakulam, Kerala - 682030

HEALTH ASSESSMENT SUMMARY:
Overall Health Score: 95% (Excellent)
Overall Status: Fit for Employment
Tests Completed: 16/16 (100%)
Risk Assessment: Low Risk

This report is confidential and intended only for healthcare and administrative purposes.

Kerala Health Department
Phone: 0471-2552056
Email: health@kerala.gov.in
    `

    const element = document.createElement("a")
    const file = new Blob([reportContent], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = "Kerala-Health-Report-ARG-2024-MH-001234.txt"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="relative">
      <motion.div
        className="fixed top-2 sm:top-4 right-2 sm:right-4 z-50"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.button
          onClick={handleDownloadPDF}
          className="flex items-center space-x-1 sm:space-x-2 bg-red-600 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200 shadow-lg text-xs sm:text-sm"
          whileHover={{ scale: 1.05, y: -1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Download className="h-3 w-2 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">Download PDF</span>
          <span className="sm:hidden">PDF</span>
        </motion.button>
      </motion.div>

      <div className="max-w-4xl mx-auto bg-white shadow-2xl print:shadow-none print:max-w-none border border-gray-200 rounded-lg overflow-hidden px-2 sm:px-0">
        <motion.div
          className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 p-2 sm:p-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
              <Building2 className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="truncate">Kerala Government Health Department</span>
            </div>
          </div>
        </motion.div>

        <div className="relative">
          <motion.div
            className="bg-blue-600 text-white text-center py-2 sm:py-3 text-xs sm:text-sm font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex items-center justify-center space-x-1 sm:space-x-2 px-2">
              <Stethoscope className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              <span className="text-center leading-tight">
                Kerala State Health Department – Aarogyam Migrant Health Record System
              </span>
              <Activity className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
            </div>
          </motion.div>

          <motion.div
            className="p-3 sm:p-6 border-b-2 border-gray-200 bg-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-start mb-4 space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <motion.div
                  className="w-15 h-15 sm:w-14 sm:h-15 rounded-full flex items-center justify-center font-bold text-xs "
                  whileHover={{ scale: 1.05 }}
                >
                 <img src="logo.Aro.svg" alt="" />
                </motion.div>
                <div >
                  <h1 className="text-xl sm:text-3xl font-bold text-blue-600 flex items-center space-x-1 sm:space-x-2">
                    {/* <Heart className="h-5 w-5 sm:h-8 sm:w-8" /> */}
                    {/* <img src="logo.Aro.svg" alt="" className="h-10 w-8 sm:h-10 sm:w-10" /> */}
                    <img src="logo.svg" alt=""  className="h-9"/>
                    {/* <span>AAROGYAM</span> */}
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-600 flex items-center space-x-1">
                    <User className="h-3 w-3" />
                    <span>Migrant Health Record System</span>
                  </p>
                </div>
              </div>

              <div className="text-right self-end sm:self-start">
                <motion.div
                  className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-lg shadow-sm overflow-hidden mb-2"
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
                <p className="text-xs text-gray-600 flex items-center justify-end space-x-1">
                  <Shield className="h-3 w-3" />
                  <span>Scan to verify record</span>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-sm">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                <span className="font-medium flex items-center space-x-1">
                  <FileText className="h-3 w-3" />
                  <span>Report Reference No:</span>
                </span>
                <p className="text-blue-600 font-mono font-bold text-xs sm:text-sm">ARG-2024-MH-001234</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                <span className="font-medium flex items-center space-x-1">
                  <Calendar className="h-3 w-3" />
                  <span>Issue Date:</span>
                </span>
                <p>15 March 2024</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
                <span className="font-medium flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>Valid Till:</span>
                </span>
                <p>15 March 2025</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

{/* health score */}
        <motion.div
      className="p-6 border-b border-border bg-gradient-to-br from-white to-slate-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <Card className="border-2 border-blue-200 bg-white mb-6 shadow-xl p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Photo */}
        <div className="flex justify-center md:justify-start">
          <motion.div
            className="w-32 h-40 bg-gradient-to-br from-gray-100 to-gray-200  flex items-center justify-center rounded-lg shadow-sm"
            whileHover={{ scale: 1.02 }}
          >
            <div className="text-center">
              {/* <User className="h-8 w-8 mx-auto mb-2 text-muted-foreground" /> */}
              {/* <span className="text-xs text-muted-foreground"> */}
                <img src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg" alt="" 
                className=" object-cover h-[160px] rounded w-[125px]"/>
              {/* </span> */}
            </div>
          </motion.div>
        </div>

        {/* Personal Details */}
        <div className="md:col-span-2 relative">
          {/* <div className="absolute bottom-15 right-15"><img src="https://upload.wikimedia.org/wikipedia/commons/5/5b/Government_of_Kerala_Logo.svg" alt="" className=""/></div> */}
          <h2 className="text-lg font-semibold text-primary mb-4 flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Migrant Information</span>
          </h2>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <span className="font-medium text-muted-foreground flex items-center space-x-1">
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
              <span className="font-medium text-muted-foreground flex items-center space-x-1">
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
              <span className="font-medium text-muted-foreground flex items-center space-x-1">
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
              <span className="font-medium text-muted-foreground">Gender:</span>
              <p>Male</p>
            </motion.div>

            <motion.div
              className="col-span-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
            >
              <span className="font-medium text-muted-foreground flex items-center space-x-1">
                <MapPin className="h-3 w-3" />
                <span>Current Address:</span>
              </span>
              <p>Room 12, Workers Colony, Kakkanad, Ernakulam, Kerala - 682030</p>
            </motion.div>
          </div>
        </div>
      </div>
      </Card>
    </motion.div>
    
    {/* hospital detail */}
    
          <motion.div
      className="p-6 border-b border-border"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2 }}
    >
      <Card className="border-2 border-blue-200 bg-white mb-6 shadow-xl">
        {/* <div className=""> */}

      <div className=" shadow-sm bg-gradient-to-br from-white to-blue-50">
        <div className="p-4">
          <h3 className="font-semibold text-primary mb-3 flex items-center space-x-2">
            <Building2 className="h-5 w-5" />
            <span>Last Checkup Hospital Information</span>
          </h3>

          <div className="grid grid-cols-2 gap-4 text-sm">
            {/* Hospital Name */}
            <div>
              <span className="font-medium text-muted-foreground flex items-center space-x-1">
                <Building2 className="h-3 w-3" />
                <span>Hospital Name:</span>
              </span>
              <p>Government Medical College Hospital, Ernakulam</p>
            </div>

            {/* Registration No */}
            <div>
              <span className="font-medium text-muted-foreground flex items-center space-x-1">
                <FileText className="h-3 w-3" />
                <span>Registration No:</span>
              </span>
              <p>GMCH-ERN-2024</p>
            </div>

            {/* Hospital Address */}
            <div>
              <span className="font-medium text-muted-foreground flex items-center space-x-1">
                <MapPin className="h-3 w-3" />
                <span>Hospital Address:</span>
              </span>
              <p>Kalamassery, Ernakulam, Kerala - 683503</p>
            </div>

            {/* Last Checkup Date */}
            <div>
              <span className="font-medium text-muted-foreground flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span>Last Checkup Date:</span>
              </span>
              <p>15 March 2024</p>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
      </Card>
    </motion.div>


    

{/* score section */}

        <div className="p-3 sm:p-6 space-y-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="border-2 border-blue-200 bg-white mb-6 shadow-xl">
              <div className="p-3 sm:p-4">
                <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-6">
                  <div className="flex-shrink-0">
                    <div className="relative w-40 h-40 sm:w-56 sm:h-56">
                      <div className="absolute inset-0 w-40 h-40 sm:w-56 sm:h-56 rounded-full border-6 sm:border-8 border-gray-100 bg-white shadow-2xl"></div>
                      <svg
                        className="absolute inset-0 w-40 h-40 sm:w-56 sm:h-56 transform -rotate-90"
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
                          className="text-4xl sm:text-6xl font-bold text-blue-600"
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

{/* otp section */}
                  <div className="flex-1 w-full">
                    <motion.div
                      className="mb-4 text-center lg:text-left"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">Health Assessment Summary</h3>
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
                          <span className="font-semibold text-green-800 text-sm sm:text-base">Overall Status</span>
                        </div>
                        <p className="text-green-700 font-bold text-sm sm:text-base">Fit for Employment</p>
                      </motion.div>

                      <motion.div
                        className="bg-white rounded-lg p-3 sm:p-4 border border-blue-200 shadow-sm"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <div className="flex items-center space-x-2 mb-2">
                          <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                          <span className="font-semibold text-blue-800 text-sm sm:text-base">Tests Completed</span>
                        </div>
                        <p className="text-blue-700 font-bold text-sm sm:text-base">16/16 (100%)</p>
                      </motion.div>

                      <motion.div
                        className="bg-white rounded-lg p-3 sm:p-4 border border-blue-200 shadow-sm"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        <div className="flex items-center space-x-2 mb-2">
                          <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                          <span className="font-semibold text-blue-800 text-sm sm:text-base">Next Checkup</span>
                        </div>
                        <p className="text-blue-700 font-bold text-sm sm:text-base">Sep 15, 2026</p>
                      </motion.div>

                      <motion.div
                        className="bg-white rounded-lg p-3 sm:p-4 border border-blue-200 shadow-sm"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                      >
                        <div className="flex items-center space-x-2 mb-2">
                          <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                          <span className="font-semibold text-blue-800 text-sm sm:text-base">Risk Assessment</span>
                        </div>
                        <p className="text-blue-700 font-bold text-sm sm:text-base">Low Risk</p>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          <div className="mb-8">
            {!isOtpVerified ? (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                <Card className="border-2 border-blue-200 bg-white p-4 sm:p-8">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-600 rounded-full flex items-center justify-center">
                      <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-blue-600 mb-2">Secure Access Required</h3>
                      <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
                        To view detailed test results, please verify your identity with OTP
                      </p>
                    </div>
                    <motion.button
                      onClick={handleSendOtp}
                      className="bg-blue-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg text-sm sm:text-base"
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
                    className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-3 sm:px-4 py-2 rounded-full text-sm sm:text-base"
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

        <motion.div
          className="p-3 sm:p-6 border-t-2 border-gray-200 bg-gray-50 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <div className="absolute inset-0 flex items-center justify-center opacity-5">
            <div className="text-3xl sm:text-6xl font-bold text-blue-600 transform rotate-12">KERALA GOVERNMENT</div>
          </div>

          <div className="relative z-10">
            <div className="text-center mb-4">
              <p className="font-medium flex items-center justify-center space-x-2 text-sm sm:text-base">
                <Shield className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>Authorized by Kerala Health Department</span>
              </p>
              <div className="w-32 sm:w-48 h-px bg-gray-200 mx-auto mt-6 sm:mt-8 mb-2"></div>
              <p className="text-xs text-gray-600">Authorized Signatory</p>
            </div>

            <div className="text-center text-xs text-gray-600">
              <p className="mb-2">
                <strong>Confidentiality Note:</strong> This report is confidential and intended only for healthcare and
                administrative purposes.
              </p>
              <p className="flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-4">
                <span className="flex items-center space-x-1">
                  <Phone className="h-3 w-3" />
                  <span>0471-2552056</span>
                </span>
                <span className="hidden sm:inline">|</span>
                <span>health@kerala.gov.in</span>
              </p>
            </div>
          </div>
        </motion.div>

        <OTPModal isOpen={isOtpModalOpen} onClose={() => setIsOtpModalOpen(false)} onVerify={handleOtpVerify} />
      </div>
    </div>
  )
}
