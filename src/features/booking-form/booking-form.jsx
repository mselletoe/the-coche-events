import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import './booking-form.scss';
import { carIcon } from '../../assets/images.js';
import Step1 from './step-1.jsx';
import Step2 from './step-2.jsx';
import Step3 from './step-3.jsx';
import Step4 from './step-4.jsx';
import api from '../../api';

function BookingForm() {
  const totalSteps = 4;
  const [currentStep, setCurrentStep] = useState(1);
  const pointRefs = useRef([]);
  const [carX, setCarX] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const step1Validator = useRef(null);
  const step2Validator = useRef(null);
  const step3Validator = useRef(null);

  const { style } = useParams();

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showFinalBookingModal, setShowFinalBookingModal] = useState(false);
  const [showNavigationWarningModal, setShowNavigationWarningModal] = useState(false);
  const [targetPath, setTargetPath] = useState(null);

  const [hasAgreed, setHasAgreed] = useState(false);
  const bookButtonRef = useRef(null);

  const [bannerMessage, setBannerMessage] = useState('');
  const [lightboxMessage, setLightboxMessage] = useState('');
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedAddons, setSelectedAddons] = useState(Array(6).fill(false));
  const [selectedAddonOptions, setSelectedAddonOptions] = useState({});

  const [addonsFromDB, setAddonsFromDB] = useState([]);

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

  const [clientInfo, setClientInfo] = useState({
    firstName: '',
    lastName: '',
    suffix: '',
    email: '',
    phoneNumber: '',
    socialPlatform: '',
    accountLink: ''
  });

  const [manualClientInfo, setManualClientInfo] = useState(clientInfo);
  const [useAccountDetails, setUseAccountDetails] = useState(false);
  const [accountInfo, setAccountInfo] = useState(null);
  
  const [paymentDetails, setPaymentDetails] = useState({
    method: '',
    accountName: '',
    accountNumber: ''
  });

  const [fullTotalRate, setFullTotalRate] = useState(0);

  const submitBooking = async () => {
    const finalClient = useAccountDetails ? accountInfo : clientInfo;

    const addonList = Object.entries(selectedAddons)
      .filter(([id, isSelected]) => isSelected)
      .map(([id]) => {
        const addon = addonsFromDB.find(a => String(a.id) === String(id));
        if (!addon) return null;

        const optionValue = selectedAddonOptions[id] || '';
        let price = 0;

        if (addon.dropdownOptions?.length > 0) {
          const matchedOption = addon.dropdownOptions.find(opt => opt.value === optionValue);
          price = Number(matchedOption?.price) || 0;
        } else {
          price = Number(addon.price) || 0;
        }

        return {
          name: addon.label,
          option: optionValue,
          price,
        };
      })
      .filter(Boolean);

      console.log("Add-on list before submission:", addonList);
      console.log("addonsFromDB:", addonsFromDB);
      console.log("selectedAddons:", selectedAddons);
      console.log("selectedAddonOptions:", selectedAddonOptions);

    const totalRate = addonList.reduce((sum, item) => sum + Number(item.price || 0), 0);

    const payload = {
      user_id: finalClient.id || 0,
      first_name: finalClient.firstName,
      last_name: finalClient.lastName,
      suffix: finalClient.suffix,
      email: finalClient.email,
      phone_number: finalClient.phoneNumber,
      social_media_link: finalClient.accountLink,
      location: step2FormData.finalLocationName,
      schedule_date: step2FormData.selectedDate,
      schedule_time: step2FormData.selectedTime,
      note: step2FormData.note,
      theme: style,
      banner_message: bannerMessage,
      lightbox_message: lightboxMessage,
      colors: selectedColors.join(', '),
      addons: addonList,
      mode_of_payment: paymentDetails.method,
      account_name: paymentDetails.accountName,
      account_number: paymentDetails.accountNumber,
      total_rate: fullTotalRate,
      status: 'pending'
    };

    // 🔍 LOG THE PAYLOAD TO THE CONSOLE
    console.log("Submitting booking with payload:", payload);

    try {
      const response = await api.post('/submit_booking.php', payload);

      console.log("Server response:", response.data); // 🔍 Log server response

      if (response.data.success) {
        setShowFinalBookingModal(true);
      } else {
        alert("Booking failed: " + (response.data.message || 'Unknown error.'));
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("Error submitting booking. Please try again.");
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsed = JSON.parse(userData);
      setAccountInfo(parsed);
      setClientInfo(prev => ({
        ...prev,
        ...parsed
      }));
    }
  }, []);

  useEffect(() => {
    api.get('/get_addons.php')
      .then(res => {
        if (Array.isArray(res.data)) {
          setAddonsFromDB(res.data);
        }
      })
      .catch(err => {
        console.error("Error fetching add-ons", err);
      });
  }, []);

  useEffect(() => {
    if (style) {
      localStorage.setItem('selectedOption', style);
    }
  }, [style]);

  useEffect(() => {
    if (useAccountDetails && accountInfo) {
      setClientInfo({ ...accountInfo });
    } else if (!useAccountDetails) {
      setClientInfo({ ...manualClientInfo });
    }
  }, [useAccountDetails, accountInfo, manualClientInfo]);

  const handleSetClientInfo = (info) => {
    setClientInfo(info);
    if (!useAccountDetails) {
      setManualClientInfo(info);
    }
  };

  const handleNext = () => {
    if (currentStep === 1 && step1Validator.current && !step1Validator.current()) return;
    if (currentStep === 2 && step2Validator.current && !step2Validator.current()) return;
    if (currentStep === 3 && step3Validator.current && !step3Validator.current()) return;

    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else if (hasAgreed) {
      setShowFinalBookingModal(true);
      submitBooking();
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

  const handleInterceptNavigation = (event) => {
    const tag = event.target.closest('a');
    if (!tag) return;

    const href = tag.getAttribute('href');
    if (!href || href === location.pathname) return;

    if (href === '/services') {
      // Prevent navigation and no modal for services tab
      event.preventDefault();
      return; // user stays on page, no modal
    }

    // For other tabs, show modal
    event.preventDefault();
    setTargetPath(href);
    setShowNavigationWarningModal(true);
  };

  useEffect(() => {
    const navRoot = document.querySelector('nav');
    if (navRoot) {
      navRoot.addEventListener('click', handleInterceptNavigation);
    }
    return () => {
      if (navRoot) {
        navRoot.removeEventListener('click', handleInterceptNavigation);
      }
    };
  }, [location.pathname]);

  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  const stepTitles = {
    1: { title: "Package Details", subtitle: "Add and specify the details of your setup" },
    2: { title: "Booking Details", subtitle: "Fill in the required booking details" },
    3: { title: "Client Information", subtitle: "Enter the receiver’s details" },
    4: { title: "Review & Confirm", subtitle: "Kindly review the information provided before proceeding" }
  };

  return (
    <div className="bookingform-container">
      {/* Progress Bar */}
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progressPercentage}%` }} />
        <img src={carIcon} alt="car" className="progress-car" style={{ transform: `translateX(${carX}px)` }} />
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

      {/* Main Form */}
      <div className="booking-form">
        <div className="form-header">
          <div className="title">
            <h1>{stepTitles[currentStep].title}</h1>
            <p>{stepTitles[currentStep].subtitle}</p>
          </div>
          <div className="progress-buttons">
            <button className="progress-button back" onClick={handleBack}>Back</button>
            <button
              ref={bookButtonRef}
              className="progress-button next"
              onClick={handleNext}
              disabled={currentStep === totalSteps && !hasAgreed}
            >
              {currentStep === totalSteps ? 'Book' : 'Next'}
            </button>
          </div>
        </div>

        <div className="form-card">
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
              addonsFromDB={addonsFromDB}
            />
          )}
          {currentStep === 2 && (
            <Step2 formData={step2FormData} setFormData={setStep2FormData} registerValidator={fn => (step2Validator.current = fn)} />
          )}
          {currentStep === 3 && (
            <Step3
              registerValidator={fn => (step3Validator.current = fn)}
              clientInfo={clientInfo}
              setClientInfo={handleSetClientInfo}
              useAccountDetails={useAccountDetails}
              setUseAccountDetails={setUseAccountDetails}
              accountInfo={accountInfo}
            />
          )}
          {currentStep === 4 && (
            <Step4
              style={style}
              setFullTotalRate={setFullTotalRate}
              paymentDetails={paymentDetails}
              setPaymentDetails={setPaymentDetails}
              addonsFromDB={addonsFromDB}
              bannerMessage={bannerMessage}
              lightboxMessage={lightboxMessage}
              selectedColors={selectedColors}
              selectedAddons={selectedAddons}
              selectedAddonOptions={selectedAddonOptions}
              step2FormData={step2FormData}
              clientInfo={clientInfo}
              useAccountDetails={useAccountDetails}
              accountInfo={accountInfo}
              hasAgreed={hasAgreed}
              setHasAgreed={(value) => {
                setHasAgreed(value);
                if (value && bookButtonRef.current) {
                  setTimeout(() => {
                    bookButtonRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }, 100);
                }
              }}
              setFinalLocationName={(location) => setStep2FormData(prev => ({ ...prev, finalLocationName: location }))}
            />
          )}
        </div>
      </div>

      {/* Confirm Return Modal */}
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

      {/* Final Booking Modal */}
      {showFinalBookingModal && (
        <div className="custom-modal-overlay fade-in">
          <div className="custom-modal">
            <h3>Booking Confirmed</h3>
            <p>Thank you for booking with us!</p>
            <div className="modal-buttons">
              <button
                onClick={() => {
                  setShowFinalBookingModal(false);
                  navigate('/');
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Intercept Modal */}
      {showNavigationWarningModal && (
        <div className="custom-modal-overlay fade-in">
          <div className="custom-modal">
            <h3>Leave Booking?</h3>
            <p>You’ll lose all current progress if you leave this page.</p>
            <div className="modal-buttons">
              <button onClick={() => setShowNavigationWarningModal(false)}>Cancel</button>
              <button
                className="danger"
                onClick={() => {
                  localStorage.removeItem('selectedOption');
                  setShowNavigationWarningModal(false);
                  navigate('/services');
                }}
              >
                Leave Page
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookingForm;