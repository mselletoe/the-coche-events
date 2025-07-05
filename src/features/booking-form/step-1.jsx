import React, { useEffect, useState } from 'react';
import './booking-form.scss';
import './step-1.scss';

function Step1({
  selectedStyle,
  onNext,
  registerValidator,
  bannerMessage,
  setBannerMessage,
  lightboxMessage,
  setLightboxMessage,
  selectedColors,
  setSelectedColors,
  selectedAddons,
  setSelectedAddons,
  selectedAddonOptions,
  setSelectedAddonOptions
}) {
  const mapStyle = (style) => {
    switch (style?.toLowerCase()) {
      case 'birthday': return { key: 'birthday', label: 'Birthday' };
      case 'romantic': return { key: 'romantic setups', label: 'Romantic Setups' };
      case 'anniversary': return { key: 'anniversaries', label: 'Anniversaries' };
      case 'custom': return { key: 'custom', label: 'Custom' };
      default: return { key: 'custom', label: 'Custom' };
    }
  };

  const { key: normalizedStyle, label: displayLabel } = mapStyle(selectedStyle);
  const isCustom = normalizedStyle === 'custom';

  const predefinedMessages = {
    birthday: 'Happy Birthday',
    'romantic setups': 'I Love You',
    anniversaries: 'Happy Anniversary',
  };

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isCustom) {
      setBannerMessage(predefinedMessages[normalizedStyle] || '');
    }
  }, [normalizedStyle, isCustom]);

  useEffect(() => {
    if (registerValidator) {
      registerValidator(validateFields);
    }
  }, [bannerMessage, lightboxMessage, selectedColors]);

  const validateFields = () => {
    const newErrors = {};
    if (isCustom && !bannerMessage.trim()) {
      newErrors.bannerMessage = '* This field is required.';
    }
    if (!lightboxMessage.trim()) {
      newErrors.lightboxMessage = '* This field is required.';
    }
    if (selectedColors.length === 0) {
      newErrors.themeColor = '* Please select at least one theme color.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      validateFields();
    }
  };

  const toggleColor = (color) => {
    setSelectedColors(prev => {
      if (prev.includes(color)) {
        return prev.filter(c => c !== color);
      } else if (prev.length < 3) {
        return [...prev, color];
      }
      return prev;
    });
  };

  const addonOptions = {
    'Satin Bouquet': ['6pcs', '12pcs', 'Acetate'],
    'Fresh Flower': ['Medium', 'Large'],
    'Cake': ['Mary Grace (Mini)', 'Mary Grace (Whole)', "Conti's (Mango Bravo)", 'Red Ribbon', 'Goldilocks'],
    'Teddy Bear': ['2ft', '3ft']
  };

  return (
    <div className='step1-container'>
      <div className='themes'>
        <h3>Package Details</h3>
        <p className="subtitle">Add and specify the details of your setup</p>

        <div className="form-row">
          <div className="label-column">Theme Selected</div>
          <div className="input-column">
            <input type="text" value={displayLabel} disabled />
          </div>
        </div>

        <div className="form-row">
          <div className="label-column">Banner Message</div>
          <div className="input-column">
            <input
              type="text"
              value={bannerMessage}
              onChange={(e) => setBannerMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={!isCustom}
              placeholder={isCustom ? "Enter banner message" : ""}
            />
            {errors.bannerMessage && (
              <div className="error-text">{errors.bannerMessage}</div>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="label-column">Letter Light Box Message</div>
          <div className="input-column">
            <input
              type="text"
              value={lightboxMessage}
              onChange={(e) => setLightboxMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter a message"
            />
            {errors.lightboxMessage && (
              <div className="error-text">{errors.lightboxMessage}</div>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="label-column">Theme Color</div>
          <div className="input-column theme-color-grid">
            {['Gold', 'Purple', 'White', 'Pink', 'Green', 'Red', 'Black', 'Blue', 'Beige'].map((color) => (
              <button
                key={color}
                className={`color-pill ${color.toLowerCase()} ${selectedColors.includes(color) ? 'selected' : ''}`}
                type="button"
                onClick={() => toggleColor(color)}
              >
                {color}
                {selectedColors.includes(color) && <span className="remove">×</span>}
              </button>
            ))}
            {errors.themeColor && (
              <div className="error-text full-width">{errors.themeColor}</div>
            )}
          </div>
        </div>
      </div>

      <div className='addons'>
        <h3>Add-Ons</h3>
        <p className="addon-instructions">For Custom Package, select your add-ons</p>

        {[
          'Satin Bouquet',
          'Fresh Flower',
          'Cake',
          'Teddy Bear',
          'Polaroid Frame',
          'Polaroid Themed Pictures'
        ].map((item, index) => (
          <div className="addon-item" key={index}>
            <div className="addon-name">{item}</div>
            <div className="addon-checkbox">
              <input
                type="checkbox"
                checked={!!selectedAddons[index]}
                onChange={() => {
                  const updated = [...selectedAddons];
                  updated[index] = !updated[index];
                  setSelectedAddons(updated);
                }}
              />
            </div>
            <div className="addon-select-wrapper">
              {selectedAddons[index] && addonOptions[item] && (
                <select
                  className="addon-select"
                  value={selectedAddonOptions[item] || ''}
                  onChange={(e) => {
                    setSelectedAddonOptions(prev => ({ ...prev, [item]: e.target.value }));
                  }}
                >
                  <option value="">Select option</option>
                  {addonOptions[item].map((option, optIndex) => (
                    <option key={optIndex} value={option}>{option}</option>
                  ))}
                </select>
              )}
            </div>
          </div>
        ))}

        <p className="clarification-note">
          For more clarification, you can reach us by clicking the <span>Contact Us</span> button.
        </p>
      </div>
    </div>
  );
}

export default Step1;
