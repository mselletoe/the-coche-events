import React from 'react';
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
  accountInfo
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
    'Polaroid Frame': { default: 400 }, // ✅ Fixed
    'Polaroid Themed Pictures': { default: 350 } // ✅ Fixed
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

  const displayDate = new Intl.DateTimeFormat('en-PH', {
    timeZone: 'Asia/Manila',
    dateStyle: 'long',
  }).format(new Date(`${step2FormData.selectedDate}T00:00:00`));

  return (
    <div className="step4-container">
      <div className="left-column receiver">
        <div className="box">
          <h3>Receiver’s Details</h3>
          <p>{finalClient.firstName} {finalClient.lastName} {finalClient.suffix}</p>
          <p>{finalClient.email}</p>
          <p>{finalClient.phoneNumber}</p>
          <p className="link">{finalClient.accountLink}</p>

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
          <p><strong>Theme:</strong> {style || 'Custom'}</p>

          <p><strong>Inclusions:</strong></p>
          <ul>
            <li>Balloons</li>
            <li>Confetti Balloons</li>
            <li>Message Card</li>
            <li>Ribbons</li>
            <li>Occasion Banner</li>
            <li>Letter Light Box</li>
            <li>Fairy Lights</li>
            <li>Soft Copy of Photo and Video Documentation</li>
          </ul>

          <p><strong>Banner:</strong> {bannerMessage}</p>
          <p><strong>Light Box:</strong> {lightboxMessage}</p>
          <p><strong>Colors:</strong> {selectedColors.join(', ')}</p>

          <p className="price"><strong>Base Rate:</strong> ₱ {baseRate.toLocaleString()}</p>

          {addonList.length > 0 && (
            <>
              <p className="price"><strong>Add-Ons</strong></p>
              {addonList.map(({ name, option, price }) => (
                <p key={name} className="price">
                  {name}{option !== 'default' ? ` (${option})` : ''} - ₱ {price.toLocaleString()}
                </p>
              ))}
            </>
          )}

          <p className="total">Total: ₱ {total.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}

export default Step4;
