import { Outlet, useNavigate, useLocation } from "react-router-dom";
import "../auth/auth.scss";
import { cocheLogo } from '../../assets/images.js';

function AccountSetupLayout({ showWelcome }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (section) => {
    navigate(`/auth/setup/${section}`);
  };

  if (showWelcome || location.pathname === "/auth/setup") {
    return (
      <div className="accountsetup-container">
        <img id='coche-logo' src={cocheLogo} alt="coche"/>
        <h3>You have successfully created an account!</h3>
        <div className="setup-container">
          <h1>Setup your account</h1>
          <div className="setup-options">
            <div className="profile-setup" onClick={() => handleNavigate("profile")}>Profile Setup</div>
            <div className="address-setup" onClick={() => handleNavigate("address")}>Address Setup</div>
            <div className="payment-setup" onClick={() => handleNavigate("payment")}>Payment Setup</div>  
          </div>
        </div>
        <button id="skip-button">Skip</button>
      </div>
    );
  }

  return (
    <div className="accountsetup-container">
      <Outlet />
    </div>
  );
}

export default AccountSetupLayout;
