import React, { useEffect } from 'react';
import './booking-form.scss';
import './step-4.scss';

function Step4({
  style,
  bannerMessage,
  lightboxMessage,
  selectedColors,
  selectedAddons,
  selectedAddonOptions,
  step2FormData,
  clientInfo,
  useAccountDetails,
  accountInfo,
  hasAgreed,
  setHasAgreed,
  addonsFromDB,
  paymentDetails,
  setPaymentDetails,
  setFullTotalRate,
  setFinalLocationName
}) {
  const baseRate = 2499;
  const finalClient = useAccountDetails ? accountInfo : clientInfo;

  const addonList = addonsFromDB
    ? Object.entries(selectedAddons)
        .filter(([id, checked]) => checked)
        .map(([id]) => {
          const addon = addonsFromDB.find((a) => String(a.id) === String(id));
          if (!addon) return null;

          const optionValue = selectedAddonOptions[id] || '';
          let price = 0;

          if (addon.dropdownOptions && addon.dropdownOptions.length > 0) {
            const optionObj = addon.dropdownOptions.find(o => o.value === optionValue);
            price = Number(optionObj?.price) || 0;
          } else {
            price = Number(addon.price) || 0; // fallback to addon base price
          }

          return {
            name: addon.label,
            option: optionValue || '',
            price,
          };
        })
        .filter(Boolean)
    : [];

  const totalAddons = addonList.reduce((sum, item) => sum + item.price, 0);
  const total = baseRate + totalAddons;

  // Update full total to parent
  useEffect(() => {
    setFullTotalRate(total);
  }, [total, setFullTotalRate]);

  // Scroll to Book button smoothly when checkbox is checked
  useEffect(() => {
    if (hasAgreed) {
      const bookBtn = document.querySelector('.progress-button.next');
      if (bookBtn) {
        setTimeout(() => {
          bookBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      }
    }
  }, [hasAgreed]);

  const displayDate = new Intl.DateTimeFormat('en-PH', {
    timeZone: 'Asia/Manila',
    dateStyle: 'long',
  }).format(new Date(`${step2FormData.selectedDate}T00:00:00`));

  useEffect(() => {
    const {
      address,
      barangayName,
      municipalityName,
      provinceName,
      selectedRegionName,
      zip
    } = step2FormData;

    const locationString = `${address}, ${barangayName}, ${municipalityName}, ${provinceName}, ${selectedRegionName} ${zip}`;
    setFinalLocationName(locationString);
  }, [
    step2FormData.address,
    step2FormData.barangayName,
    step2FormData.municipalityName,
    step2FormData.provinceName,
    step2FormData.selectedRegionName,
    step2FormData.zip
  ]);

  return (
    <div className="step4-wrapper">
      <div className="step4-container">
        <div className="left-column receiver">
          <div className="box">

            {/* Receiver’s Details */}
            <h3>Receiver’s Details</h3>
            <p>{finalClient.firstName} {finalClient.lastName} {finalClient.suffix}</p>
            <p>{finalClient.email}</p>
            <p>{finalClient.phoneNumber}</p>
            <p className="link">{finalClient.accountLink}</p>

            {/* Booking Details */}
            <h3>Booking Details</h3>
            <p>
              {step2FormData.address},  
              {step2FormData.barangayName && `${step2FormData.barangayName}, `} 
              {step2FormData.municipalityName && `${step2FormData.municipalityName}, `}
              {step2FormData.provinceName && `${step2FormData.provinceName}, `}
              {step2FormData.selectedRegionName && `${step2FormData.selectedRegionName} `}
              {step2FormData.zip && step2FormData.zip}
            </p>

            <p>{displayDate}</p>

            <p>{step2FormData.selectedTime}</p>
            <p>Note: “{step2FormData.note}”</p>

            {/* Payment Details */}
            <h3>Payment Details</h3>
            <p className="note">Select your payment method and fill in the required details</p>
            <div className="payment-options">
              <label>
                <input
                  type="radio"
                  name="payment"
                  value="bank"
                  checked={paymentDetails.method === 'bank'}
                  onChange={(e) => setPaymentDetails(prev => ({ ...prev, method: e.target.value }))}
                /> Bank Transfer
              </label>
              <label>
                <input
                  type="radio"
                  name="payment"
                  value="ewallet"
                  checked={paymentDetails.method === 'ewallet'}
                  onChange={(e) => setPaymentDetails(prev => ({ ...prev, method: e.target.value }))}
                /> e-Wallet
              </label>
            </div>

            <div className="input-group">
              <label>Account Name</label>
              <input
                type="text"
                value={paymentDetails.accountName}
                onChange={(e) => setPaymentDetails(prev => ({ ...prev, accountName: e.target.value }))}
              />
            </div>

            <div className="input-group">
              <label>Account Number</label>
              <input
                type="text"
                value={paymentDetails.accountNumber}
                onChange={(e) => setPaymentDetails(prev => ({ ...prev, accountNumber: e.target.value }))}
              />
            </div>
          </div>
        </div>

        <div className="right-column billing">
          <div className="box">
            <h3>Billing Details</h3>

            <div className="line-item">
              <span className="label"><strong>Theme:</strong> {style || 'Custom'}</span>
            </div>

            <p className="price"><strong>Inclusions:</strong></p>
            <ul>
              <li><em>Balloons</em></li>
              <li><em>Confetti Balloons</em></li>
              <li><em>Message Card</em></li>
              <li><em>Ribbons</em></li>
              <li><em>Occasion Banner</em></li>
              <li><em>Letter Light Box</em></li>
              <li><em>Fairy Lights</em></li>
              <li><em>Soft Copy of Photo and Video Documentation</em></li>
            </ul>

            <div className="line-item">
              <span className="label"><strong>Banner:</strong> {bannerMessage}</span>
            </div>
            <div className="line-item">
              <span className="label"><strong>Light Box:</strong> {lightboxMessage}</span>
            </div>
            <div className="line-item">
              <span className="label"><strong>Colors:</strong> {selectedColors.join(', ')}</span>
            </div>

            <div className="line-item">
              <span className="label"><strong>Base Rate</strong></span>
              <span className="price">₱ {baseRate.toLocaleString()}</span>
            </div>

            {addonList.length > 0 && (
              <>
                <p className="price"><strong>Add-Ons</strong></p>
                {addonList.map(({ name, option, price }, index) => (
                  <div key={`${name}-${index}`} className="line-item">
                    <span className="label">
                      {name}{option ? ` (${option})` : ''}
                    </span>
                    <span className="price">₱ {price.toLocaleString()}</span>
                  </div>
                ))}
              </>
            )}

            <div className="total">
              <span>Total</span>
              <span>₱ {total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="note-box">
        <div className="note-label">Note:</div>
        <div className="note-description">
          Additional transportation fee depending on the receiver’s location. Kindly reach us first for queries
        </div>
      </div>

      <div className="agreement-section">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={hasAgreed}
            onChange={(e) => setHasAgreed(e.target.checked)}
          />
          <span>
            I have read and agree to the{' '}
            <a href="#terms-and-conditions" className="terms-link" target="_blank" rel="noopener noreferrer">
              Terms and Conditions
            </a>
            <span className="required-asterisk"> *</span>
          </span>
        </label>
      </div>
    </div>
  );
}

export default Step4;
