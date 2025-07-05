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
  setHasAgreed
}) {
  const baseRate = 2499;

  const addonPrices = {
    'Satin Bouquet': { '6pcs': 300, '12pcs': 620, 'Acetate': 1000 },
    'Fresh Flower': { 'Medium': 1700, 'Large': 2800 },
    'Cake': {
      'Mary Grace (Mini)': 1000,
      'Mary Grace (Whole)': 3500,
      "Conti's (Mango Bravo)": 2200,
      'Red Ribbon': 850,
      'Goldilocks': 900
    },
    'Teddy Bear': { '2ft': 1800, '3ft': 2000 },
    'Polaroid Frame': { default: 400 },
    'Polaroid Themed Pictures': { default: 350 }
  };

  const addonLabels = Object.keys(addonPrices);

  const addonList = selectedAddons
    .map((checked, index) => {
      if (!checked) return null;
      const name = addonLabels[index];
      const option = selectedAddonOptions[name] || 'default';
      const price = addonPrices[name]?.[option] || 0;
      return { name, option, price };
    })
    .filter(Boolean);

  const totalAddons = addonList.reduce((sum, item) => sum + item.price, 0);
  const total = baseRate + totalAddons;

  const finalClient = useAccountDetails ? accountInfo : clientInfo;

  // ✅ Scroll to Book button smoothly when checkbox is checked
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

  return (
    <div className="step4-wrapper">
      <div className="step4-container">
        <div className="left-column receiver">
          <div className="box">
            <h3>Receiver’s Details</h3>
            <p>{finalClient.firstName} {finalClient.lastName} {finalClient.suffix}</p>
            <p>{finalClient.email}</p>
            <p>{finalClient.phoneNumber}</p>
            <p className="link">{finalClient.accountLink}</p>

            <h3>Booking Details</h3>
            <p>{step2FormData.address}</p>
            <p>{step2FormData.selectedDate}</p>
            <p>{step2FormData.selectedTime}</p>
            <p>Note: “{step2FormData.note}”</p>
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

            <h3>Payment Details</h3>
            <p className="note">Select your payment method and fill in the required details</p>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
              <label><input type="radio" name="payment" /> Cash</label>
              <label><input type="radio" name="payment" /> Bank Transfer</label>
              <label><input type="radio" name="payment" /> e-Wallet</label>
            </div>

            <div className="input-group">
              <label>Account Name</label>
              <input type="text" />
            </div>
            <div className="input-group">
              <label>Account Number</label>
              <input type="text" />
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
                {addonList.map(({ name, option, price }) => (
                  <div key={name} className="line-item">
                    <span className="label">
                      {name}{option !== 'default' ? ` (${option})` : ''}
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
