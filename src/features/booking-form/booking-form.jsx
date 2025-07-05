import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './booking-form.scss';
import { carIcon } from '../../assets/images.js';
import Step1 from './step-1.jsx';
import Step2 from './step-2.jsx';
import Step3 from './step-3.jsx';
import Step4 from './step-4.jsx';

function BookingForm() {
  const totalSteps = 4;
  const [currentStep, setCurrentStep] = useState(1);
  const pointRefs = useRef([]);
  const [carX, setCarX] = useState(0);
  const navigate = useNavigate();
  const step1Validator = useRef(null);
  const step2Validator = useRef(null);
  const step3Validator = useRef(null);

  const { style } = useParams();

  useEffect(() => {
    if (style) {
      localStorage.setItem('selectedOption', style);
    }
  }, [style]);

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [bannerMessage, setBannerMessage] = useState('');
  const [lightboxMessage, setLightboxMessage] = useState('');
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedAddons, setSelectedAddons] = useState(Array(6).fill(false));
  const [selectedAddonOptions, setSelectedAddonOptions] = useState({});

  // Step 2 form data (booking details only)
  const [step2FormData, setStep2FormData] = useState({
    selectedRegion: '',
    province: '',
    municipality: '',
    barangay: '',
    address: '',
    zip: '',
    selectedDate: '',
    selectedTime: '',
    note: ''
  });

  // Dedicated client info state
  const [clientInfo, setClientInfo] = useState({
    firstName: '',
    lastName: '',
    suffix: '',
    email: '',
    phoneNumber: '',
    socialPlatform: '',
    accountLink: ''
  });

  const [useAccountDetails, setUseAccountDetails] = useState(false);

  const accountInfo = {
    firstName: 'Alleah Marie',
    lastName: 'Bayas',
    suffix: '',
    email: 'alleahmarie87@gmail.com',
    phoneNumber: '1234567890',
    socialPlatform: 'Facebook',
    accountLink: 'facebook.com/alleahbayas'
  };

  const handleNext = () => {
    if (currentStep === 1 && step1Validator.current) {
      const isValid = step1Validator.current();
      if (!isValid) return;
    }

    if (currentStep === 2 && step2Validator.current) {
      const isValid = step2Validator.current();
      if (!isValid) return;
    }

    if (currentStep === 3 && step3Validator.current) {
      const isValid = step3Validator.current();
      if (!isValid) return;
    }

    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    } else {
      setShowConfirmModal(true);
    }
  };

  useEffect(() => {
    if (pointRefs.current[currentStep - 1]) {
      const point = pointRefs.current[currentStep - 1];
      const pointRect = point.getBoundingClientRect();
      const containerRect = point.parentNode.getBoundingClientRect();
      const centerX = pointRect.left - containerRect.left + pointRect.width / 2 - 15;
      setCarX(centerX);
    }
  }, [currentStep]);

  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  const stepTitles = {
    1: { title: "Package Details", subtitle: "Add and specify the details of your setup" },
    2: { title: "Booking Details", subtitle: "Fill in the required booking details" },
    3: { title: "Client Information", subtitle: "Enter the receiver’s details" },
    4: { title: "Review & Confirm", subtitle: "Kindly review the information provided before proceeding" }
  };

  return (
    <div className="bookingform-container">
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div>
        <img
          src={carIcon}
          alt="car"
          className="progress-car"
          style={{ transform: `translateX(${carX}px)` }}
        />
        <div className="progress-points">
          {[...Array(totalSteps)].map((_, index) => (
            <div
              key={index}
              ref={el => (pointRefs.current[index] = el)}
              className={`progress-circle ${index < currentStep - 1 ? 'past' : index === currentStep - 1 ? 'active' : ''}`}
            />
          ))}
        </div>
      </div>

      <div className='booking-form'>
        <div className='form-header'>
          <div className='title'>
            <h1>{stepTitles[currentStep].title}</h1>
            <p>{stepTitles[currentStep].subtitle}</p>
          </div>
          <div className="progress-buttons">
            <button className="progress-button back" onClick={handleBack}>Back</button>
            <button className="progress-button next" onClick={handleNext} disabled={currentStep === totalSteps}>Next</button>
          </div>
        </div>

        <div className='form-card'>
          {currentStep === 1 && (
            <Step1
              selectedStyle={style}
              onNext={handleNext}
              registerValidator={fn => (step1Validator.current = fn)}
              bannerMessage={bannerMessage}
              setBannerMessage={setBannerMessage}
              lightboxMessage={lightboxMessage}
              setLightboxMessage={setLightboxMessage}
              selectedColors={selectedColors}
              setSelectedColors={setSelectedColors}
              selectedAddons={selectedAddons}
              setSelectedAddons={setSelectedAddons}
              selectedAddonOptions={selectedAddonOptions}
              setSelectedAddonOptions={setSelectedAddonOptions}
            />
          )}
          {currentStep === 2 && (
            <Step2
              formData={step2FormData}
              setFormData={setStep2FormData}
              registerValidator={fn => (step2Validator.current = fn)}
            />
          )}
          {currentStep === 3 && (
            <Step3
              registerValidator={fn => (step3Validator.current = fn)}
              clientInfo={clientInfo}
              setClientInfo={setClientInfo}
              useAccountDetails={useAccountDetails}
              setUseAccountDetails={setUseAccountDetails}
              accountInfo={accountInfo}
            />
          )}
          {currentStep === 4 && (
            <Step4
              style={style}
              bannerMessage={bannerMessage}
              lightboxMessage={lightboxMessage}
              selectedColors={selectedColors}
              selectedAddons={selectedAddons}
              selectedAddonOptions={selectedAddonOptions}
              step2FormData={step2FormData}
              clientInfo={clientInfo}
              useAccountDetails={useAccountDetails}
              accountInfo={accountInfo}
              onBack={handleBack}
            />
          )}
        </div>
      </div>

      {showConfirmModal && (
        <div className="custom-modal-overlay fade-in">
          <div className="custom-modal">
            <h3>Return to Style Selection?</h3>
            <p>Are you sure you want to go back? <br /> All progress will be lost.</p>
            <div className="modal-buttons">
              <button onClick={() => setShowConfirmModal(false)}>Cancel</button>
              <button
                className="danger"
                onClick={() => {
                  localStorage.removeItem('selectedOption');
                  navigate('/services');
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookingForm;
