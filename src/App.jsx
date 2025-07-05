import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import api from './api';
import Auth from './features/auth/auth.jsx';
import MainLayout from './main_layout.jsx';
import LoginForm from './features/auth/login-form.jsx';
import RegisterForm from './features/auth/registration-form.jsx';
import ProtectedRoute from './features/routeprotection.jsx';
import Home from './tabs/home/home.jsx';
import Services from './tabs/services/services.jsx';
import Gallery from './tabs/gallery/gallery.jsx';
import PrivacyPolicy from './features/footer/privacy-policy.jsx';
import TermsAndConditions from './features/footer/terms-and-conditions.jsx';
import AccountSettings from './features/account-settings/account-settings.jsx';
import BookingPage from './features/booking-form/booking-form.jsx';

function App() {
  useEffect(() => {
    api.get('track_visit.php')
      .then(() => {
        console.log('Visit recorded');
      })
      .catch((error) => {
        console.error('Error recording visit:', error);
      });
  }, []);
  
  return (
    <Router>
      <Routes>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* Parent route for /auth */}
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="services/book/:style" element={<BookingPage />} />
          <Route path="/gallery" element={<Gallery />} />

          <Route path="/auth" element={<Auth />}>
            <Route index element={<Navigate to="login" replace />} />
            <Route path="login" element={<LoginForm />} />
            <Route path="register" element={<RegisterForm />} />
          </Route>
          
          {/* Protected Standalone pages */}
          <Route path="/account" element={<ProtectedRoute><AccountSettings /></ProtectedRoute>} />

          {/* Standalone pages */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        </Route>

        <Route path="/services" element={<Services />} />
        <Route path="/services/book/:style" element={<BookingPage />} />
      </Routes>
    </Router>
  );
}

export default App;