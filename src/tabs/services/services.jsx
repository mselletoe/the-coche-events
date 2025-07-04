import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import Pending from '../../features/pending/pending';
import BookingForm from '../../features/booking-form/booking-form';
import { Option1, Option2, Option3, Option4 } from '../../assets/images.js';
import './services.scss';

function Services() {
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const options = [
    { id: 'birthday', label: 'Birthday', image: Option1 },
    { id: 'romantic', label: 'Romantic Setups', image: Option2 },
    { id: 'anniversary', label: 'Anniversaries', image: Option3 },
    { id: 'custom', label: 'Custom', image: Option4 },
  ];

  // ✅ New: Clear the selected option from localStorage on page load
  useEffect(() => {
    localStorage.removeItem('selectedOption');
  }, []);

  // ✅ Load selection from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('selectedOption');
    if (stored) {
      setSelectedOption(stored);
    }
  }, []);

  // ✅ Store selection in both state and localStorage
  const handleOptionClick = (id) => {
    setSelectedOption(id);
    localStorage.setItem('selectedOption', id);
  };

  const handleBookNow = () => {
    if (selectedOption) {
      navigate(`/services/book/${selectedOption}`);
    }
  };

  return (
    <div className='services-container fade-in' key={location.key}>
      <div className='services-headings'>
        <p>
          Every celebration deserves a <span>twist</span>—and<br />
          we deliver it straight from a car trunk.
        </p>
        <h4>
          Explore our curated surprises crafted to create joy, connection, and unforgettable memories.
        </h4>
      </div>

      <div className='services-selections'>
        <div className='styles-text'>
          <p>Styles</p>
          <h4>
            Select the kind of <br />
            surprise you'd love us<br />
            to set up.
          </h4>
        </div>

        <div className='services-options'>
          {options.map((option) => (
            <div
              key={option.id}
              className={`optionX ${selectedOption === option.id ? 'selected' : ''}`}
              onClick={() => handleOptionClick(option.id)}
            >
              <img src={option.image} alt={option.label} />
              <div className="caption">{option.label}</div>
            </div>
          ))}
        </div>
      </div>

      <button
        className='book-now'
        onClick={handleBookNow}
        disabled={!selectedOption}
      >
        Book Now
      </button>
      
      <Outlet />
      <Pending />
    </div>
  );
}

export default Services;
