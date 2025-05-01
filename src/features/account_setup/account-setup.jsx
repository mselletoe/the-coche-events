import { useState } from "react";
import "../auth/auth.scss";
import ProfileSetup from './profile-setup';
import AddressSetup from './address-setup';
import PaymentSetup from './payment-setup';

function AccountSetup() {
  const [activeSection, setActiveSection] = useState("");

  const renderSection = () => {
    switch (activeSection) {
      case "profile":
        return <ProfileSetup />;
      case "address":
        return <AddressSetup />;
      case "payment":
        return <PaymentSetup />;
      default:
        return null;
    }
  };

  // If a section is active, just show that section
  if (activeSection) {
    return (
      <div className="accountsetup-container">
        {renderSection()}
      </div>
    );
  }

  return (
    <div className="accountsetup-container">
      <img id='coche-logo' src="src/assets/coche-logo.svg" alt="coche"/>
      <h3>You have successfully created an account!</h3>
      <div className="setup-container">
        <h1>Setup your account</h1>
        <div className="setup-options">
          <div className="profile-setup" onClick={() => setActiveSection("profile")}>Profile Setup</div>
          <div className="address-setup" onClick={() => setActiveSection("address")}>Address Setup</div>
          <div className="payment-setup" onClick={() => setActiveSection("payment")}>Payment Setup</div>  
        </div>
      </div>
      <button id="skip-button">Skip</button>
    </div>
  );
}

export default AccountSetup;