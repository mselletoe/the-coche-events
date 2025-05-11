import axios from 'axios';
import { useState, useEffect } from 'react';
import './address-setup.scss';
import { blueFlower } from '../../assets/images.js';

const AddressSetup = () => {
  const [regions, setRegions] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [barangays, setBarangays] = useState([]);

  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  // Fetch regions on mount
  useEffect(() => {
    axios.get('http://localhost/the_coche-events/regions.php')
      .then(response => setRegions(response.data))
      .catch(error => console.error('Error fetching regions:', error));
  }, []);

  // Fetch provinces when a region is selected
  useEffect(() => {
    if (selectedRegion) {
      axios.get(`http://localhost/the_coche-events/provinces.php?region_id=${selectedRegion}`)
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
      axios.get(`http://localhost/the_coche-events/cities.php?province_id=${selectedProvince}`)
        .then(response => setCities(response.data))
        .catch(error => console.error('Error fetching cities:', error));
      setBarangays([]);
      setSelectedCity('');
    }
  }, [selectedProvince]);

  // Fetch barangays when a city is selected
  useEffect(() => {
    if (selectedCity) {
      axios.get(`http://localhost/the_coche-events/barangays.php?city_id=${selectedCity}`)
        .then(response => setBarangays(response.data))
        .catch(error => console.error('Error fetching barangays:', error));
    }
  }, [selectedCity]);

  return (
    <div className="address-page">
      <div className="left-circle">
        <img src={blueFlower} alt="Blue Flower" className="blue-flower" />
      </div>

      <div className="form-container">
        <h2>Set Address</h2>
        <form>
          {/* Region Dropdown */}
          <div className="form-group">
            <label>Region <span className="required">*</span></label>
            <select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)}>
              <option value="">Select Region</option>
              {regions.map(region => (
                <option key={region.id} value={region.id}>{region.name}</option>
              ))}
            </select>
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
          </div>

          {/* Barangay Dropdown */}
          <div className="form-group">
            <label>Barangay <span className="required">*</span></label>
            <select disabled={!barangays.length}>
              <option value="">Select Barangay</option>
              {barangays.map(barangay => (
                <option key={barangay.id} value={barangay.id}>{barangay.name}</option>
              ))}
            </select>
          </div>

          {/* Address Fields */}
          <div className="form-group">
            <label>House/Building No. / Street <span className="required">*</span></label>
            <input type="text" placeholder="Address Line 1" />
            <input type="text" placeholder="Address Line 2" />
          </div>

          {/* Zip Code */}
          <div className="form-group">
            <label>Zip Code <span className="required">*</span></label>
            <input type="text" placeholder="Enter Zip Code" />
          </div>

          {/* Buttons */}
          <div className="button-group">
            <button type="button" className="back-btn">← Back</button>
            <button type="submit" className="save-btn">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressSetup;
