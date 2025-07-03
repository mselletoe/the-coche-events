import React, { useState } from 'react';
import './booking-form.scss';
import './step-2.scss';
import Calendar from './calendar.jsx'; // ✅ Corrected import
import './calendar.scss';

function Step2() {
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [note, setNote] = useState('');
  const occupiedTimes = ["10:00 AM", "2:00 PM"]; // Example occupied times

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
              <select value={selectedRegion} onChange={e => setSelectedRegion(e.target.value)}>
                <option value="">Region III</option>
                {/* Add more region options here */}
              </select>
              <input type="text" placeholder="Province" />
            </div>
            <div className="field-row">
              <input type="text" placeholder="Municipality" />
              <input type="text" placeholder="Barangay" />
            </div>
            <div className="field-row">
              <input type="text" placeholder="Address" />
              <input type="text" placeholder="Zip Code" />
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
              <Calendar onDateChange={setSelectedDate} selectedDate={selectedDate} />
              <div className="time-input-group">
                <input
                  type="text"
                  placeholder="Select your preferred time"
                  value={selectedTime || ""}
                  readOnly
                />
                <div className="time-grid">
                  {["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM"].map(time => {
                    const isOccupied = occupiedTimes.includes(time);
                    const isSelected = selectedTime === time;

                    return (
                      <button
                        key={time}
                        className={`${isSelected ? 'selected' : ''} ${isOccupied ? 'occupied' : ''}`}
                        onClick={() => !isOccupied && setSelectedTime(time)}
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
            value={note}
            onChange={e => setNote(e.target.value)}
          ></textarea>
        </div>

      </div>
    </div>
  );
}

export default Step2;
