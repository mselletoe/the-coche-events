import { useState, useEffect } from 'react';
import api from '../../api';
import './account-settings.scss';

function AccountSettings() {
  const [currentUserName, setCurrentUserName] = useState('');
  const [isEditing, setIsEditing] = useState(false); // true if address exists
  
  // Store options for dropdowns
  const [regions, setRegions] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [barangays, setBarangays] = useState([]);

  // Stores the user's selected options from each dropdown
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedBarangay, setSelectedBarangay] = useState('');

  // Stores text input values
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [suffix, setSuffix] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [zipCode, setZipCode] = useState('');

  // load user data
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user?.id) return;

    api.get(`/get_address.php?user_id=${user.id}`)
      .then(res => {
        if (res.data?.address) {
          const addr = res.data.address;
          setIsEditing(true);
          setAddressLine1(addr.address_line_1);
          setAddressLine2(addr.address_line_2);
          setZipCode(addr.zip_code);
          setSelectedRegion(addr.region_id);
          setSelectedProvince(addr.province_id);
          setSelectedCity(addr.city_id);
          setSelectedBarangay(addr.barangay_id);
        }
      })
      .catch(err => {
        console.error("Failed to fetch address", err);
      });

    api.get('/fetch_users.php')
      .then(res => {
        const users = Array.isArray(res.data) ? res.data : res.data.users;
        const userData = users?.find(u => u.id == user.id);
        console.log("Fetched user data:", userData);
        if (userData) {
          setFirstName(userData.first_name || '');
          setLastName(userData.last_name || '');
          setSuffix(userData.suffix || '');
          setEmail(userData.email || '');
          setPhone(userData.phone || '');
          setCurrentUserName(`${userData.first_name} ${userData.last_name}`);
        }
      })
      .catch(err => {
        console.error("Failed to fetch user data", err);
      });
  }, []);

  // Fetch regions on mount
  useEffect(() => {
    api.get('/regions.php')
      .then(response => setRegions(response.data))
      .catch(error => console.error('Error fetching regions:', error));
  }, []);

  // Fetch provinces when a region is selected
  useEffect(() => {
    if (selectedRegion) {
      api.get(`/provinces.php?region_id=${selectedRegion}`)
        .then(response => setProvinces(response.data))
        .catch(error => console.error('Error fetching provinces:', error));
      setCities([]);
      setBarangays([]);
      setSelectedProvince('');
      setSelectedCity('');
    }
  }, [selectedRegion]);

  // Fetch cities when a province is selected
  useEffect(() => {
    if (selectedProvince) {
      api.get(`/cities.php?province_id=${selectedProvince}`)
        .then(response => setCities(response.data))
        .catch(error => console.error('Error fetching cities:', error));
      setBarangays([]);
      setSelectedCity('');
    }
  }, [selectedProvince]);

  // Fetch barangays when a city is selected
  useEffect(() => {
    if (selectedCity) {
      api.get(`/barangays.php?city_id=${selectedCity}`)
        .then(response => setBarangays(response.data))
        .catch(error => console.error('Error fetching barangays:', error));
    }
  }, [selectedCity]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.id) {
      alert("User not logged in.");
      navigate("/auth/login");
      return;
    }

    // Prepare the payload to send to backend
    const payload = {
      user_id: user.id,
      first_name: firstName,
      last_name: lastName,
      suffix,
      email,
      phone,
      region_name: selectedRegion ? regions.find(region => region.id === selectedRegion)?.name : '', 
      province_name: selectedProvince ? provinces.find(province => province.id === selectedProvince)?.name : '', 
      city_name: selectedCity ? cities.find(city => city.id === selectedCity)?.name : '', 
      barangay_name: selectedBarangay ? barangays.find(barangay => barangay.id === selectedBarangay)?.name : '', 
      address_line_1: addressLine1,
      address_line_2: addressLine2,
      zip_code: zipCode
    };

    // Sends payload to backend sand save
    try {
      const response = await api.post("/save_user_profile.php", payload);
      if (response.data.success) {
        alert("Profile & address updated successfully!");
      } else {
        alert(response.data.error || "Failed to update.");
      }
    } catch (err) {
      console.error("Error saving profile:", err);
      alert("Server error.");
    }
  };

  return (
    <div className='accountsettings-container'>
      <p className='page-title'>Account</p>
      <hr />

      <div className='main-container'>

        {/* Profile Picture */}
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

        {/* Personal & Address Information */}
        <div className='information-container'>

          {/* Personal Information */}
          <div className="section-header">
            <h3>Personal Information</h3>
          </div>

          <div className="info-row">
            <div className="info-item">
              <label>First Name</label>
              <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div className="info-item">
              <label>Last Name</label>
              <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
            <div className="info-item">
              <label>Suffix</label>
              <input type="text" value={suffix} onChange={(e) => setSuffix(e.target.value)} />
            </div>
          </div>

          <div className="info-row">
            <div className="info-item">
              <label>Email Address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <button className="secondary-btn verify-btn">Verify Email</button>
          </div>

          <div className="info-row">
            <div className="info-item">
              <label>Phone Number</label>
              <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <button className="secondary-btn verify-btn">Verify Number</button>
          </div>

          {/* Address Information */}
          <div className="section-header">
            <h3>Address Information</h3>
          </div>

          <div className="info-row">
            <div className="info-item">
              <label>Region</label>
              <select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)}>
                <option value="">Select Region</option>
                {regions.map(region => (
                  <option key={region.id} value={region.id}>{region.name}</option>
                ))}
              </select>
            </div>
            <div className="info-item">
              <label>Province</label>
              <select value={selectedProvince} onChange={(e) => setSelectedProvince(e.target.value)}>
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
              <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
                <option value="">Select City</option>
                {cities.map(city => (
                  <option key={city.id} value={city.id}>{city.name}</option>
                ))}
              </select>
            </div>
            <div className="info-item">
              <label>Barangay</label>
              <select value={selectedBarangay} onChange={(e) => setSelectedBarangay(e.target.value)}>
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
              <input
                type="text"
                value={`${addressLine1} ${addressLine2}`.trim()}
                onChange={(e) => {
                  const parts = e.target.value.split(' ');
                  setAddressLine1(parts.slice(0, Math.ceil(parts.length / 2)).join(' '));
                  setAddressLine2(parts.slice(Math.ceil(parts.length / 2)).join(' '));
                }}
              />
            </div>
          </div>

          <div className="info-row">
            <div className="info-item">
              <label>Zip Code</label>
              <input type="text" value={zipCode} onChange={(e) => setZipCode(e.target.value)}/>
            </div>
          </div>

          <div className="button-row">
            <button className="primary-btn save-btn" onClick={handleSubmit}>Save Changes</button>
          </div>
        </div>

        {/* Your Data */}
        <div className='your-data-container'>
          <div className="section-header">
            <h3>Your Data</h3>
            <p>Download a copy of your account data.</p>
          </div>
          <div className="button-row">
            <button className="secondary-btn">Download My Data</button>
          </div>
        </div>

        {/* Account Deletion */}
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