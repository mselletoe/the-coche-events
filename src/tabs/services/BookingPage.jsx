import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BookingForm from '../../features/booking-form/booking-form';

function BookingPage() {
  const { style } = useParams();
  const navigate = useNavigate();

  return (
    <div className="booking-form-container">
      <button className="back-button" onClick={handleBack}>
        ← Back
      </button>

      <h2>Booking for: {style}</h2>
      <BookingForm selectedStyle={style} />
    </div>
  );
}

export default BookingPage;
