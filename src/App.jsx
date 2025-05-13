import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './features/auth/auth.jsx';
import LoginForm from './features/auth/login-form.jsx';
import RegisterForm from './features/auth/registration-form.jsx';
import AccountSetup from './features/account_setup/account-setup.jsx';
import ProfileSetup from './features/account_setup/profile-setup.jsx';
import AddressSetup from './features/account_setup/address-setup.jsx';
import PaymentSetup from './features/account_setup/payment-setup.jsx';
import ProtectedRoute from './features/routeprotection.jsx';
// import LandingPage from './pages/landing_page/landing-page.jsx';

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/auth/login" replace />} />

        {/* Parent route for /auth */}
        <Route path="/auth" element={<Auth />}>
          <Route index element={<Navigate to="login" replace />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="register" element={<RegisterForm />} />
        </Route>

        {/* Setup entry point */}
        <Route path="/setup" element={<ProtectedRoute><AccountSetup showWelcome /></ProtectedRoute>} />
        
        {/* Now top-level standalone pages */}
        <Route path="/profile" element={<ProtectedRoute><ProfileSetup /></ProtectedRoute>} />
        <Route path="/address" element={<ProtectedRoute><AddressSetup /></ProtectedRoute>} />
        <Route path="/payment" element={<ProtectedRoute><PaymentSetup /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;