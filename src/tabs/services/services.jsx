import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import Pending from '../../features/pending/pending';
import BookingForm from '../../features/booking-form/booking-form';
import { Option1, Option2, Option3, Option4 } from '../../assets/images.js';
import './services.scss';

function Services() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(25);
  const navigate = useNavigate();
  const location = useLocation();
  const optionsRef = useRef(null);

  const options = [
    { id: 'birthday', label: 'Birthday', image: Option1 },
    { id: 'romantic', label: 'Romantic Setups', image: Option2 },
    { id: 'anniversary', label: 'Anniversaries', image: Option3 },
    { id: 'custom', label: 'Custom', image: Option4 },
  ];

  useEffect(() => {
    localStorage.removeItem('selectedOption');
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('selectedOption');
    if (stored) {
      setSelectedOption(stored);
    }
  }, []);

  const handleOptionClick = (id) => {
    setSelectedOption(id);
    localStorage.setItem('selectedOption', id);
  };

  const handleBookNow = () => {
    if (selectedOption) {
      navigate(`/services/book/${selectedOption}`);
    }
  };

  useEffect(() => {
    const scrollEl = optionsRef.current;

    const handleScroll = () => {
      const scrollLeft = scrollEl.scrollLeft;
      const maxScrollLeft = scrollEl.scrollWidth - scrollEl.clientWidth;
      const progress = (scrollLeft / maxScrollLeft) * 100;
      setScrollProgress(progress || 0);
    };

    if (scrollEl) {
      scrollEl.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollEl) {
        scrollEl.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

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
            surprise you'd love us to set up.<br />
            
          </h4>
        </div>

        <div className='services-options' ref={optionsRef}>
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

        {/* 👇 Progress slider bar */}
        <div className="scroll-slider-wrapper">
          <div className="scroll-slider-track">
            <div
              className="scroll-slider-thumb"
              style={{ width: `${scrollProgress}%` }}
            ></div>
          </div>
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
