import  { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { loadTheme } from './store/slices/themeSlice';
import { loadLanguage } from './store/slices/languageSlice';
import { useToast } from './hooks/useToast';
import ErrorBoundary from './components/Common/ErrorBoundary';
import { ToastContainer } from './components/Common/NotificationToast';
import AOS from 'aos';
import 'aos/dist/aos.css';

import { MigrantHealthReport } from './pages/migrantRecord-Dashboard/ui/migrant-health-report';

// Layout Components
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Chatbot from './components/Common/Chatbot';

// Pages
import Home from './pages/Home';
import Features from './pages/Features';
import Hospitals from './pages/Hospitals';
import HospitalMap from "./pages/HospitalMap";

import QRScanner from './pages/QRScanner';
import HealthCard from './pages/HealthCard';
import QRCardGenerator from "./pages/QRCardGenerator";

import MigrantDashboard from './pages/Dashboard/MigrantDashboard';
import OutbreakAlerts from './pages/OutbreakAlerts';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import AdminDashboard from './pages/AdminDashboard';
import HospitalDashboard from './pages/HospitalDashboard';
import HospitalLeaderboard from './pages/HospitalLeaderboard';
import Feedback from './pages/Feedback';
import Contact from './pages/Contact';
import Settings from './pages/Settings';
import MigrantProfile from './pages/MigrantProfile';
import Unauthorized from "./pages/Unauthorized";
import "./index.css"


function App() {
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state: RootState) => state.theme);
  const { toasts, removeToast } = useToast();

  useEffect(() => {
    dispatch(loadTheme());
    dispatch(loadLanguage());
  }, [dispatch]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);
  
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-base-100 text-neutral smooth-transition">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/features" element={<Features />} />
              <Route path="/hospitals" element={<Hospitals />} />
              <Route path="/hospital-map" element={<HospitalMap />} />
              <Route path="/outbreak-alerts" element={<OutbreakAlerts />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<MigrantDashboard />} />
              <Route path="/profile" element={<MigrantProfile></MigrantProfile>} />
              <Route path="/settings" element={<Settings></Settings>} />
              <Route path="/health-card" element={<HealthCard />} />
              <Route path="/card-generator" element={<QRCardGenerator />} />
              <Route path="/qr-scanner" element={<QRScanner />} />
              <Route path="/hospital-dashboard" element={<HospitalDashboard />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/leaderboard" element={<HospitalLeaderboard />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              <Route path="/migrantrecord" element={<MigrantHealthReport/>}></Route>
            </Routes>
          </main>
          <Footer />
          <Chatbot />
          <ToastContainer toasts={toasts} onClose={removeToast} />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;