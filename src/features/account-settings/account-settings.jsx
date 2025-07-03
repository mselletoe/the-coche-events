import React, { useState, useRef } from 'react';
import './account-settings.scss';

function AccountSettings() {
  const [currentUserName, setCurrentUserName] = useState(' ');
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

  // Open file dialog when Upload button is clicked
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  // Set the uploaded image preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  // Remove image and reset to initial icon text
  const handleRemoveImage = () => {
    setProfileImage(null);
    fileInputRef.current.value = null;
  };

  return (
    <div className="accountsettings-container">
      <p className="page-title">Account</p>
      <hr />

      <div className="main-container">
        {/* 1️⃣ Profile Picture */}
        <div className="profile-picture-container">
          <div className="profile-content">
            <div className="profile-image">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <span>{currentUserName ? currentUserName.charAt(0).toUpperCase() : ''}</span>
              )}
            </div>

            <div className="profile-details">
              <div className="section-header">
                <h3>Profile Picture</h3>
                <p>Upload a new image or remove your current picture.</p>
              </div>

              <div className="button-group">
                <button className="primary-btn" onClick={handleUploadClick}>
                  <i className="fa-solid fa-upload" style={{ marginRight: '6px' }}></i>
                  Upload
                </button>

                <button className="secondary-btn" onClick={handleRemoveImage}>
                  <i className="fa-solid fa-trash" style={{ marginRight: '6px' }}></i>
                  Remove
                </button>

                {/* Hidden file input */}
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 2️⃣ Personal & Address Information */}
        <div className="information-container">
          <div className="section-header">
            <h3>Personal Information</h3>
          </div>

          <div className="info-row">
            <div className="info-item">
              <label>First Name</label>
              <input type="text" placeholder="Ex. Juan" />
            </div>
            <div className="info-item">
              <label>Last Name</label>
              <input type="text" placeholder="Ex. Dela Cruz" />
            </div>
            <div className="info-item">
              <label>Suffix</label>
              <input type="text" placeholder="Suffix (optional)" />
            </div>
          </div>

          <div className="info-row">
            <div className="info-item">
              <label>Email Address</label>
              <input type="email" placeholder="sample@gmail.com" />
            </div>
            <button className="secondary-btn verify-btn">
              <i className="fa-solid fa-check" style={{ marginRight: '6px' }}></i>
              Verify Email
            </button>
          </div>

          <div className="info-row">
            <div className="info-item">
              <label>Phone Number</label>
              <input type="text" placeholder="09XX-XXX-XXXX" />
            </div>
            <button className="secondary-btn verify-btn">
              <i className="fa-solid fa-check" style={{ marginRight: '6px' }}></i>
              Verify Number
            </button>
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
            <button className="primary-btn save-btn">
              <i className="fa-solid fa-floppy-disk" style={{ marginRight: '6px' }}></i>
              Save Changes
            </button>
          </div>
        </div>

        {/* 3️⃣ Your Data */}
        <div className="your-data-container">
          <div className="section-header">
            <h3>Your Data</h3>
            <p>Download a copy of your account data.</p>
          </div>
          <div className="button-row">
            <button className="secondary-btn">
              <i className="fa-solid fa-download" style={{ marginRight: '6px' }}></i>
              Download My Data
            </button>
          </div>
        </div>

        {/* 4️⃣ Account Deletion */}
        <div className="account-deletion-container">
          <div className="section-header">
            <h3>Account Deletion</h3>
            <p>
              Deleting your account is permanent and cannot be undone. All your data will be
              permanently removed.
            </p>
          </div>
          <div className="button-row">
            <button className="delete-btn">
              <i className="fa-solid fa-trash" style={{ marginRight: '6px' }}></i>
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountSettings;
