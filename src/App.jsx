import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './features/auth/auth.jsx';
import LoginForm from './features/auth/login-form.jsx';
import RegisterForm from './features/auth/registration-form.jsx';
import AccountSetup from './features/account_setup/account-setup.jsx';
import ProfileSetup from './features/account_setup/profile-setup.jsx';
import AddressSetup from './features/account_setup/address-setup.jsx';
import PaymentSetup from './features/account_setup/payment-setup.jsx';
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
          <Route path="setup" element={<AccountSetup />}>
            <Route index element={<AccountSetup showWelcome />} />
            <Route path="profile" element={<ProfileSetup />} />
            <Route path="address" element={<AddressSetup />} />
            <Route path="payment" element={<PaymentSetup />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;