import React, { useState } from 'react';
import './booking-form.scss';

function BookingForm(){
    const totalSteps = 4;
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;
    return (
    <div className="progress-container">
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div>

        <div className="progress-points">
          {[...Array(totalSteps)].map((_, index) => (
            <div
              key={index}
              className={`circle ${index < currentStep ? 'active' : ''}`}
            ></div>
          ))}
        </div>
      </div>

      <div className="progress-buttons">
        <button onClick={handleBack} disabled={currentStep === 1}>
          Back
        </button>
        <button onClick={handleNext} disabled={currentStep === totalSteps}>
          Next
        </button>
      </div>
    </div>
    );
}

export default BookingForm