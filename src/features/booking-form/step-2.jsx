import React, { useState, useEffect } from 'react';
import api from '../../api';
import './booking-form.scss';
import Calendar from '../calendar/calendar'
import './step-2.scss';

function Step2({ formData, setFormData, registerValidator }) {
  const [occupiedTimes, setOccupiedTimes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);
  const [fullyBookedDates, setFullyBookedDates] = useState([]);

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

  const [errors, setErrors] = useState({
    selectedRegion: '',
    province: '',
    municipality: '',
    barangay: '',
    address: '',
    zip: '',
    selectedDate: '',
    selectedTime: '',
  });

  // Initialize form data from existing formData (when returning to step)
  useEffect(() => {
    if (formData.selectedRegion) {
      setSelectedRegion(formData.selectedRegion);
    }
    if (formData.province) {
      setSelectedProvince(formData.province);
    }
    if (formData.municipality) {
      setSelectedCity(formData.municipality);
    }
    if (formData.barangay) {
      setSelectedBarangay(formData.barangay);
    }
    if (formData.address) {
      setAddressLine1(formData.address);
    }
    if (formData.zip) {
      setZipCode(formData.zip);
    }
  }, []);

  // Initialize component with existing data
  useEffect(() => {
    const initializeComponent = async () => {
      try {
        const regionsRes = await api.get('/regions.php');
        setRegions(regionsRes.data || []);

        if (!formData.selectedRegion) {
          const user = JSON.parse(localStorage.getItem('user'));
          if (user?.id) {
            try {
              const userAddressRes = await api.get(`/get_address.php?user_id=${user.id}`);
              if (userAddressRes.data?.address) {
                const addr = userAddressRes.data.address;
                setIsEditing(true);
                setSelectedRegion(addr.region_id);
                setAddressLine1(addr.address_line_1 || '');
                setZipCode(addr.zip_code || '');
                
                // Load provinces
                if (addr.region_id) {
                  const provRes = await api.get(`/provinces.php?region_id=${addr.region_id}`);
                  setProvinces(provRes.data || []);
                  
                  if (addr.province_id) {
                    setSelectedProvince(addr.province_id);

                    // Load cities
                    const cityRes = await api.get(`/cities.php?province_id=${addr.province_id}`);
                    setCities(cityRes.data || []);
                    
                    if (addr.city_id) {
                      setSelectedCity(addr.city_id);

                      // Load barangays
                      const brgyRes = await api.get(`/barangays.php?city_id=${addr.city_id}`);
                      setBarangays(brgyRes.data || []);
                      
                      if (addr.barangay_id) {
                        setSelectedBarangay(addr.barangay_id);
                      }
                    }
                  }
                }
              }
            } catch (err) {
              console.error("Failed to fetch user address", err);
            }
          }
        } else {
          const loadDependentData = async () => {
            if (formData.selectedRegion) {
              const provRes = await api.get(`/provinces.php?region_id=${formData.selectedRegion}`);
              setProvinces(provRes.data || []);
              
              if (formData.province) {
                const cityRes = await api.get(`/cities.php?province_id=${formData.province}`);
                setCities(cityRes.data || []);
                
                if (formData.municipality) {
                  const brgyRes = await api.get(`/barangays.php?city_id=${formData.municipality}`);
                  setBarangays(brgyRes.data || []);
                }
              }
            }
          };
          
          await loadDependentData();
        }
      } catch (error) {
        console.error('Error initializing component:', error);
      } finally {
        setIsInitialLoad(false);
      }
    };

    initializeComponent();
  }, []);

  useEffect(() => {
    const fetchBookedDates = async () => {
      try {
        const res = await api.get('/booked_dates.php');
        if (res.data?.success) {
          setBookedDates(res.data.bookedDates || []);
          setFullyBookedDates(res.data.fullyBookedDates || []);
        }
      } catch (err) {
        console.error("Failed to fetch booked dates:", err);
      }
    };

    fetchBookedDates();
  }, []);

  // Handle region change
  useEffect(() => {
    if (!isInitialLoad && selectedRegion) {
      api.get(`/provinces.php?region_id=${selectedRegion}`)
        .then(response => {
          setProvinces(response.data || []);
          if (selectedRegion !== formData.selectedRegion) {
            setCities([]);
            setBarangays([]);
            setSelectedProvince('');
            setSelectedCity('');
            setSelectedBarangay('');
          }
        })
        .catch(error => console.error('Error fetching provinces:', error));
    }
  }, [selectedRegion, isInitialLoad]);

  // Handle province change
  useEffect(() => {
    if (!isInitialLoad && selectedProvince) {
      api.get(`/cities.php?province_id=${selectedProvince}`)
        .then(response => {
          setCities(response.data || []);
          if (selectedProvince !== formData.province) {
            setBarangays([]);
            setSelectedCity('');
            setSelectedBarangay('');
          }
        })
        .catch(error => console.error('Error fetching cities:', error));
    }
  }, [selectedProvince, isInitialLoad]);

  // Handle city change
  useEffect(() => {
    if (!isInitialLoad && selectedCity) {
      api.get(`/barangays.php?city_id=${selectedCity}`)
        .then(response => {
          setBarangays(response.data || []);
          if (selectedCity !== formData.municipality) {
            setSelectedBarangay('');
          }
        })
        .catch(error => console.error('Error fetching barangays:', error));
    }
  }, [selectedCity, isInitialLoad]);

  // Update formData when local state changes
  useEffect(() => {
    const getNameById = (list, id) => {
      const item = list.find(i => i.id === id);
      return item ? item.name : '';
    };

    setFormData(prev => ({
      ...prev,
      selectedRegion,
      selectedRegionName: getNameById(regions, selectedRegion),
      province: selectedProvince,
      provinceName: getNameById(provinces, selectedProvince),
      municipality: selectedCity,
      municipalityName: getNameById(cities, selectedCity),
      barangay: selectedBarangay,
      barangayName: getNameById(barangays, selectedBarangay),
      address: addressLine1,
      zip: zipCode
    }));
  }, [selectedRegion, selectedProvince, selectedCity, selectedBarangay, addressLine1, zipCode, setFormData]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prevErrors => ({ ...prevErrors, [field]: '' }));
  };

  const validate = () => {
    let newErrors = {};

    if (!selectedRegion) newErrors.selectedRegion = '* This field is required';
    if (!selectedProvince) newErrors.province = '* This field is required';
    if (!selectedCity) newErrors.municipality = '* This field is required';
    if (!selectedBarangay) newErrors.barangay = '* This field is required';
    if (!addressLine1.trim()) newErrors.address = '* This field is required';
    if (!zipCode.trim()) newErrors.zip = '* This field is required';
    if (!formData.selectedDate || !formData.selectedDate.toString().trim()) {
      newErrors.selectedDate = '* This field is required';
    }
    if (!formData.selectedTime.trim()) newErrors.selectedTime = '* This field is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (registerValidator) {
      registerValidator(validate);
    }
  }, [formData, selectedRegion, selectedProvince, selectedCity, selectedBarangay, addressLine1, zipCode, registerValidator]);

  return (
    <div className="step2-container">
      <div className="booking-form">

        {/* Location Section */}
        <div className="section two-column">
          <div className="section-label">
            <h3>Location</h3>
          </div>
          <div className="section-content location-fields">

            {/* First Row */}
            <div className="field-row">

              {/* Region */}
              <div className="field-container">
                <select
                  value={selectedRegion}
                  onChange={e => setSelectedRegion(e.target.value)}
                >
                  <option value="">Select Region</option>
                  {regions.map(region => (
                    <option key={region.id} value={region.id}>{region.name}</option>
                  ))}
                </select>
                {errors.selectedRegion && <span className="error-message">{errors.selectedRegion}</span>}
              </div>

              {/* Province */}
              <div className="field-container">
                <select
                  value={selectedProvince}
                  onChange={e => setSelectedProvince(e.target.value)}
                  disabled={!provinces.length}
                >
                  <option value="">Select Province</option>
                  {provinces.map(province => (
                    <option key={province.id} value={province.id}>{province.name}</option>
                  ))}
                </select>
                {errors.province && <span className="error-message">{errors.province}</span>}
              </div>
            </div>

            {/* Second Row */}
            <div className="field-row">

              {/* City */}
              <div className="field-container">
                <select
                  value={selectedCity}
                  onChange={e => setSelectedCity(e.target.value)}
                  disabled={!cities.length}
                >
                  <option value="">Select City / Municipality</option>
                  {cities.map(city => (
                    <option key={city.id} value={city.id}>{city.name}</option>
                  ))}
                </select>
                {errors.municipality && <span className="error-message">{errors.municipality}</span>}
              </div>

              {/* Barangay */}
              <div className="field-container">
                <select
                  value={selectedBarangay}
                  onChange={e => setSelectedBarangay(e.target.value)}
                  disabled={!barangays.length}
                >
                  <option value="">Select Barangay</option>
                  {barangays.map(barangay => (
                    <option key={barangay.id} value={barangay.id}>{barangay.name}</option>
                  ))}
                </select>
                {errors.barangay && <span className="error-message">{errors.barangay}</span>}
              </div>
            </div>

            {/* Third Row */}
            <div className="field-row">

              {/* Address Line */}
              <div className="field-container">
                <input
                  type="text"
                  placeholder="Address"
                  value={addressLine1}
                  onChange={e => setAddressLine1(e.target.value)}
                />
                {errors.address && <span className="error-message">{errors.address}</span>}
              </div>

              {/* Zip Code */}
              <div className="field-container">
                <input
                  type="text"
                  placeholder="Zip Code"
                  value={zipCode}
                  onChange={e => setZipCode(e.target.value)}
                />
                {errors.zip && <span className="error-message">{errors.zip}</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Schedule Section */}
        <div className="section two-column schedule-section">
          <div className="section-label">
            <h3>Schedule</h3>

            {/* Legend */}
            <div className="legend">
              <h4>Legend</h4>
              <div className="legend-item">
                <span className="legend-box chosen-date"></span> Chosen date
              </div>
              <div className="legend-item">
                <span className="legend-box not-booked"></span> Not fully booked
              </div>
              <div className="legend-item">
                <span className="legend-box booked"></span> Fully booked
              </div>
            </div>
          </div>

          <div className="section-content schedule-fields">
            <div className="field-row">
              <div className="field-container">
              <Calendar
                bookedDates={bookedDates}
                fullyBookedDates={fullyBookedDates}
                currentDate={new Date()}
                selectedDate={formData.selectedDate ? new Date(formData.selectedDate) : null}
                onDateClick={async (date) => {
                  const isoDate = date.toISOString().split('T')[0];
                  handleChange('selectedDate', isoDate);

                  try {
                    const res = await api.get(`/occupied_times.php?date=${isoDate}`);
                    if (res.data?.occupied_times) {
                      setOccupiedTimes(res.data.occupied_times);
                    } else {
                      setOccupiedTimes([]);
                    }
                  } catch (error) {
                    console.error('Failed to fetch occupied times:', error);
                    setOccupiedTimes([]);
                  }
                }}
              />
              </div>

              <div className="field-container">
                {errors.selectedTime && <span className="error-message">{errors.selectedTime}</span>}

                <div className="time-grid">
                  {["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM"].map(time => {
                    const isOccupied = occupiedTimes.includes(time);
                    const isSelected = formData.selectedTime === time;

                    return (
                      <button
                        key={time}
                        className={`${isSelected ? 'selected' : ''} ${isOccupied ? 'occupied' : ''}`}
                        onClick={() => !isOccupied && handleChange('selectedTime', time)}
                        disabled={isOccupied}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Message/Note Section */}
        <div className="section two-column">
          <div className="section-label">
            <h3>Message/Note</h3>
          </div>
          <textarea
            placeholder="Add notes here."
            value={formData.note}
            onChange={e => handleChange('note', e.target.value)}
          ></textarea>
        </div>

      </div>
    </div>
  );
}

export default Step2;