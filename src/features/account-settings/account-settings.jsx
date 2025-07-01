import React, { useState } from 'react';
import './account-settings.scss';

function AccountSettings() {
  // Current logged-in user's name — to be set dynamically in your actual app
  const [currentUserName, setCurrentUserName] = useState('');

  return (
    <div className='accountsettings-container'>
      <p className='page-title'>Account</p>
      <hr />

      <div className='main-container'>

        {/* 1️⃣ Profile Picture */}
        <div className='profile-picture-container'>
          <div className="profile-content">
            <div className="profile-image">
              <span>{currentUserName ? currentUserName.charAt(0).toUpperCase() : ''}</span>
            </div>

            <div className="profile-details">
              <div className="section-header">
                <h3>Profile Picture</h3>
                <p>Upload a new image or remove your current picture.</p>
              </div>
              <div className="button-group">
                <button className="primary-btn">Upload</button>
                <button className="secondary-btn">Remove</button>
              </div>
            </div>
          </div>
        </div>

        {/* 2️⃣ Personal & Address Information */}
        <div className='information-container'>
          <div className="section-header">
            <h3>Personal Information</h3>
          </div>

          <div className="info-row">
            <div className="info-item">
              <label>First Name</label>
              <input type="text" placeholder="First Name" />
            </div>
            <div className="info-item">
              <label>Last Name</label>
              <input type="text" placeholder="Last Name" />
            </div>
            <div className="info-item">
              <label>Suffix</label>
              <input type="text" placeholder="Suffix (optional)" />
            </div>
          </div>

          <div className="info-row">
            <div className="info-item">
              <label>Email Address</label>
              <input type="email" placeholder="Email Address" />
            </div>
            <button className="secondary-btn verify-btn">Verify Email</button>
          </div>

          <div className="info-row">
            <div className="info-item">
              <label>Phone Number</label>
              <input type="text" placeholder="Phone Number" />
            </div>
            <button className="secondary-btn verify-btn">Verify Number</button>
          </div>

          <div className="section-header">
            <h3>Address Information</h3>
          </div>

          <div className="info-row">
            <div className="info-item">
              <label>Region</label>
              <input type="text" placeholder="Region" />
            </div>
            <div className="info-item">
              <label>Province</label>
              <input type="text" placeholder="Province" />
            </div>
          </div>

          <div className="info-row">
            <div className="info-item">
              <label>City/Municipality</label>
              <input type="text" placeholder="City/Municipality" />
            </div>
            <div className="info-item">
              <label>Barangay</label>
              <input type="text" placeholder="Barangay" />
            </div>
          </div>

          <div className="info-row">
            <div className="info-item full-width">
              <label>House / Building No. / Street</label>
              <input type="text" placeholder="House / Building No. / Street" />
            </div>
          </div>

          <div className="info-row">
            <div className="info-item">
              <label>Zip Code</label>
              <input type="text" placeholder="Zip Code" />
            </div>
          </div>

          <div className="button-row">
            <button className="primary-btn save-btn">Save Changes</button>
          </div>
        </div>

        {/* 3️⃣ Your Data */}
        <div className='your-data-container'>
          <div className="section-header">
            <h3>Your Data</h3>
            <p>Download a copy of your account data.</p>
          </div>
          <div className="button-row">
            <button className="secondary-btn">Download My Data</button>
          </div>
        </div>

        {/* 4️⃣ Account Deletion */}
        <div className='account-deletion-container'>
          <div className="section-header">
            <h3>Account Deletion</h3>
            <p>Deleting your account is permanent and cannot be undone. All your data will be permanently removed.</p>
          </div>
          <div className="button-row">
            <button className="delete-btn">Delete Account</button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AccountSettings;
