import React, { useState, useEffect, useRef } from 'react';
import './account-settings.scss';
import axios from 'axios';

function AccountSettings() {
  const [currentUserName, setCurrentUserName] = useState(' ');
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

  const [regions, setRegions] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [barangays, setBarangays] = useState([]);

  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedBarangay, setSelectedBarangay] = useState('');

  // Fetch Regions on load
  useEffect(() => {
    axios.get('http://localhost/regions.php')
      .then(res => setRegions(res.data))
      .catch(err => console.error(err));
  }, []);

  // Fetch Provinces when Region changes
  useEffect(() => {
    if (selectedRegion) {
      axios.get(`http://localhost/provinces.php?region_id=${selectedRegion}`)
        .then(res => setProvinces(res.data))
        .catch(err => console.error(err));
    } else {
      setProvinces([]);
      setCities([]);
      setBarangays([]);
      setSelectedProvince('');
      setSelectedCity('');
      setSelectedBarangay('');
    }
  }, [selectedRegion]);

  // Fetch Cities when Province changes
  useEffect(() => {
    if (selectedProvince) {
      axios.get(`http://localhost/cities.php?province_id=${selectedProvince}`)
        .then(res => setCities(res.data))
        .catch(err => console.error(err));
    } else {
      setCities([]);
      setBarangays([]);
      setSelectedCity('');
      setSelectedBarangay('');
    }
  }, [selectedProvince]);

  // Fetch Barangays when City changes
  useEffect(() => {
    if (selectedCity) {
      axios.get(`http://localhost/barangays.php?city_id=${selectedCity}`)
        .then(res => setBarangays(res.data))
        .catch(err => console.error(err));
    } else {
      setBarangays([]);
      setSelectedBarangay('');
    }
  }, [selectedCity]);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
    fileInputRef.current.value = null;
  };

  return (
    <div className="accountsettings-container">
      <p className="page-title">Account</p>
      <hr />

      <div className="main-container">
        <div className="profile-picture-container">
          <div className="profile-content">
            <div className="profile-image">
              {profileImage ? (
                <img src={profileImage} alt="Profile" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
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
                  <i className="fa-solid fa-upload" style={{ marginRight: '6px' }}></i> Upload
                </button>
                <button className="secondary-btn" onClick={handleRemoveImage}>
                  <i className="fa-solid fa-trash" style={{ marginRight: '6px' }}></i> Remove
                </button>
                <input type="file" accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
              </div>
            </div>
          </div>
        </div>

        <div className="information-container">
          <div className="section-header"><h3>Personal Information</h3></div>

          <div className="info-row">
            <div className="info-item">
              <label>First Name</label>
              <input type="text" placeholder=" " />
            </div>
            <div className="info-item">
              <label>Last Name</label>
              <input type="text" placeholder=" " />
            </div>
            <div className="info-item">
              <label>Suffix</label>
              <input type="text" placeholder=" " />
            </div>
          </div>

          <div className="info-row">
            <div className="info-item">
              <label>Email Address</label>
              <input type="email" placeholder=" " />
            </div>
            <button className="secondary-btn verify-btn">
              <i className="fa-solid fa-check" style={{ marginRight: '6px' }}></i> Verify Email
            </button>
          </div>

          <div className="info-row">
            <div className="info-item">
              <label>Phone Number</label>
              <input type="text" placeholder=" " />
            </div>
            <button className="secondary-btn verify-btn">
              <i className="fa-solid fa-check" style={{ marginRight: '6px' }}></i> Verify Number
            </button>
          </div>

          <div className="section-header"><h3>Address Information</h3></div>

          <div className="info-row">
            <div className="info-item">
              <label>Region</label>
              <select value={selectedRegion} onChange={e => setSelectedRegion(e.target.value)}>
                <option value="">Select Region</option>
                {regions.map(region => (
                  <option key={region.id} value={region.id}>{region.name}</option>
                ))}
              </select>
            </div>

            <div className="info-item">
              <label>Province</label>
              <select value={selectedProvince} onChange={e => setSelectedProvince(e.target.value)} disabled={!provinces.length}>
                <option value="">Select Province</option>
                {provinces.map(province => (
                  <option key={province.id} value={province.id}>{province.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="info-row">
            <div className="info-item">
              <label>City/Municipality</label>
              <select value={selectedCity} onChange={e => setSelectedCity(e.target.value)} disabled={!cities.length}>
                <option value="">Select City/Municipality</option>
                {cities.map(city => (
                  <option key={city.id} value={city.id}>{city.name}</option>
                ))}
              </select>
            </div>

            <div className="info-item">
              <label>Barangay</label>
              <select value={selectedBarangay} onChange={e => setSelectedBarangay(e.target.value)} disabled={!barangays.length}>
                <option value="">Select Barangay</option>
                {barangays.map(barangay => (
                  <option key={barangay.id} value={barangay.id}>{barangay.name}</option>
                ))}
              </select>
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
              <i className="fa-solid fa-floppy-disk" style={{ marginRight: '6px' }}></i> Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountSettings;
