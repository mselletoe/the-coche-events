import { Outlet, useNavigate, useLocation } from "react-router-dom";
import "../auth/auth.scss";
import { cocheLogo, profileSetupCover, addressSetupCover, paymentSetupCover } from '../../assets/images.js';

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
            <div className="setup-item">
              <div className="profile-setup" onClick={() => handleNavigate("profile")}>
                <img src={profileSetupCover} alt="profile" />
              </div>
              <p className="setup-label">Account Profile</p>
            </div>

            <div className="setup-item">
              <div className="address-setup" onClick={() => handleNavigate("address")}>
                <img src={addressSetupCover} alt="address" />
              </div>
              <p className="setup-label">Address</p>
            </div>

            <div className="setup-item">
              <div className="payment-setup" onClick={() => handleNavigate("payment")}>
                <img src={paymentSetupCover} alt="payment" />
              </div>
              <p className="setup-label">Payment Method</p>
            </div>
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
