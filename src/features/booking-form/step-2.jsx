import React, { useState, useEffect } from 'react';
import './booking-form.scss';
import './step-2.scss';

function Step2({ formData, setFormData, registerValidator }) {
  const occupiedTimes = ["10:00 AM", "2:00 PM"];

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

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Clear error on change
    setErrors(prevErrors => ({ ...prevErrors, [field]: '' }));
  };

  const validate = () => {
    let newErrors = {};

    if (formData.selectedRegion.trim() === '') newErrors.selectedRegion = '* This field is required';
    if (formData.province.trim() === '') newErrors.province = '* This field is required';
    if (formData.municipality.trim() === '') newErrors.municipality = '* This field is required';
    if (formData.barangay.trim() === '') newErrors.barangay = '* This field is required';
    if (formData.address.trim() === '') newErrors.address = '* This field is required';
    if (formData.zip.trim() === '') newErrors.zip = '* This field is required';
    if (formData.selectedDate.trim() === '') newErrors.selectedDate = '* This field is required';
    if (formData.selectedTime.trim() === '') newErrors.selectedTime = '* This field is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (registerValidator) {
      registerValidator(validate);
    }
  }, [formData, registerValidator]);

  return (
    <div className="step2-container">
      <div className="booking-form">

        {/* Location Section */}
        <div className="section two-column">
          <div className="section-label">
            <h3>Location</h3>
          </div>
          <div className="section-content location-fields">
            <div className="field-row">
              <div className="field-container">
                <select
                  value={formData.selectedRegion}
                  onChange={e => handleChange('selectedRegion', e.target.value)}
                >
                  <option value=""> Select Region </option>
                  <option value="Region III">Region III</option>
                  {/* You can add more region options here */}
                </select>
                {errors.selectedRegion && <span className="error-message">{errors.selectedRegion}</span>}
              </div>


              <div className="field-container">
                <input
                  type="text"
                  placeholder="Province"
                  value={formData.province}
                  onChange={e => handleChange('province', e.target.value)}
                />
                {errors.province && <span className="error-message">{errors.province}</span>}
              </div>
            </div>

            <div className="field-row">
              <div className="field-container">
                <input
                  type="text"
                  placeholder="Municipality"
                  value={formData.municipality}
                  onChange={e => handleChange('municipality', e.target.value)}
                />
                {errors.municipality && <span className="error-message">{errors.municipality}</span>}
              </div>

              <div className="field-container">
                <input
                  type="text"
                  placeholder="Barangay"
                  value={formData.barangay}
                  onChange={e => handleChange('barangay', e.target.value)}
                />
                {errors.barangay && <span className="error-message">{errors.barangay}</span>}
              </div>
            </div>

            <div className="field-row">
              <div className="field-container">
                <input
                  type="text"
                  placeholder="Address"
                  value={formData.address}
                  onChange={e => handleChange('address', e.target.value)}
                />
                {errors.address && <span className="error-message">{errors.address}</span>}
              </div>

              <div className="field-container">
                <input
                  type="text"
                  placeholder="Zip Code"
                  value={formData.zip}
                  onChange={e => handleChange('zip', e.target.value)}
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
                <input
                  type="date"
                  value={formData.selectedDate}
                  onChange={e => handleChange('selectedDate', e.target.value)}
                />
                {errors.selectedDate && <span className="error-message">{errors.selectedDate}</span>}
              </div>

              <div className="field-container">
                <input
                  type="text"
                  placeholder="Select your preferred time"
                  value={formData.selectedTime}
                  readOnly
                />
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
