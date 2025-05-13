import axios from 'axios';
import { useState, useEffect } from 'react';
import './address-setup.scss';
import { blueFlower } from '../../assets/images.js';
import { useNavigate } from 'react-router-dom';

const AddressSetup = () => {
  const navigate = useNavigate();

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

  // Stores text input values for the street address and zip code
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [zipCode, setZipCode] = useState('');

  // Fetch regions on mount
  useEffect(() => {
    axios.get('/the_coche-events/regions.php')
      .then(response => setRegions(response.data))
      .catch(error => console.error('Error fetching regions:', error));
  }, []);

  // Fetch provinces when a region is selected
  useEffect(() => {
    if (selectedRegion) {
      axios.get(`/the_coche-events/provinces.php?region_id=${selectedRegion}`)
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
      axios.get(`/the_coche-events/cities.php?province_id=${selectedProvince}`)
        .then(response => setCities(response.data))
        .catch(error => console.error('Error fetching cities:', error));
      setBarangays([]);
      setSelectedCity('');
    }
  }, [selectedProvince]);

  // Fetch barangays when a city is selected
  useEffect(() => {
    if (selectedCity) {
      axios.get(`/the_coche-events/barangays.php?city_id=${selectedCity}`)
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
      const response = await axios.post("/the_coche-events/save_address.php", payload);
      if (response.data.success) {
        alert("Address saved successfully!");
        navigate("/setup"); // Redirect after saving address
      } else {
        alert(response.data.error || "Failed to save address.");
      }
    } catch (err) {
      console.error("Error saving address:", err);
      alert("Server error.");
    }
  };

  return (
    <div className="addresssetup-container">
      {/* Side Content */}
      <div className="side-content">
        <div className="circle">
          <img src={blueFlower} alt="Blue Flower" />
        </div>
      </div>

      <div className='addressform-container'>
        <div className="address-form">
          <h1>Set Address</h1>
          <form onSubmit={handleSubmit}>

            {/* Region Dropdown */}
            <div className="form-group">
              <label>Region <span className="required">*</span></label>
              <select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)}>
                <option value="">Select Region</option>
                {regions.map(region => (
                  <option key={region.id} value={region.id}>{region.name}</option>
                ))}
              </select>
              <i className="fa-solid fa-caret-down dropdown-icon"></i>
            </div>

            {/* Province Dropdown */}
            <div className="form-group">
              <label>Province <span className="required">*</span></label>
              <select value={selectedProvince} onChange={(e) => setSelectedProvince(e.target.value)} disabled={!provinces.length}>
                <option value="">Select Province</option>
                {provinces.map(province => (
                  <option key={province.id} value={province.id}>{province.name}</option>
                ))}
              </select>
              <i className="fa-solid fa-caret-down dropdown-icon"></i>
            </div>

            {/* City/Municipality Dropdown */}
            <div className="form-group">
              <label>City/Municipality <span className="required">*</span></label>
              <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} disabled={!cities.length}>
                <option value="">Select City/Municipality</option>
                {cities.map(city => (
                  <option key={city.id} value={city.id}>{city.name}</option>
                ))}
              </select>
              <i className="fa-solid fa-caret-down dropdown-icon"></i>
            </div>

            {/* Barangay Dropdown */}
            <div className="form-group">
              <label>Barangay <span className="required">*</span></label>
              <select onChange={(e) => setSelectedBarangay(e.target.value)} disabled={!barangays.length}>
                <option value="">Select Barangay</option>
                {barangays.map(barangay => (
                  <option key={barangay.id} value={barangay.id}>{barangay.name}</option>
                ))}
              </select>
              <i className="fa-solid fa-caret-down dropdown-icon"></i>
            </div>

            {/* Address Fields */}
            <div className="form-group">
              <label>House/Building No. / Street <span className="required">*</span></label>
              <input type="text" placeholder="Address Line 1" value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} />
              <input type="text" placeholder="Address Line 2" value={addressLine2} onChange={(e) => setAddressLine2(e.target.value)} />
            </div>

            {/* Zip Code */}
            <div className="form-group">
              <label>Zip Code <span className="required">*</span></label>
              <input type="text" placeholder="Enter Zip Code" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
            </div>

            {/* Buttons */}
            <div className="button-group">
              <i className="fa-solid fa-arrow-left" onClick={() => navigate(-1)}></i>
              <button type="submit" className="save-btn">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddressSetup;
