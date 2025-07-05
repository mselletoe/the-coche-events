import React, { useEffect, useState } from 'react';
import './booking-form.scss';
import './step-1.scss';
import api from '../../api';

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
  const [addonsFromDB, setAddonsFromDB] = useState([]);
  const [loadingAddons, setLoadingAddons] = useState(true);
  const [addonError, setAddonError] = useState(null);
  const [errors, setErrors] = useState({});

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

  useEffect(() => {
    setLoadingAddons(true);
    api.get('/get_addons.php')
      .then(res => {
        if (Array.isArray(res.data)) {
          setAddonsFromDB(res.data);
          setAddonError(null);
        } else {
          setAddonError("Invalid data format received.");
        }
      })
      .catch(() => {
        setAddonError("Unable to fetch add-ons.");
      })
      .finally(() => {
        setLoadingAddons(false);
      });
  }, []);

  const predefinedMessages = {
    birthday: 'Happy Birthday',
    'romantic setups': 'I Love You',
    anniversaries: 'Happy Anniversary',
  };

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

        {loadingAddons ? (
          <p>Loading add-ons...</p>
        ) : addonError ? (
          <p className="error-text">{addonError}</p>
        ) : (
          addonsFromDB.map((addon, index) => (
            <div className="addon-item" key={addon.id}>
              <div className="addon-name">{addon.label}</div>
              <div className="addon-checkbox">
                <input
                  type="checkbox"
                  checked={!!selectedAddons[addon.id]}
                  onChange={() => {
                    const updated = { ...selectedAddons };
                    updated[addon.id] = !updated[addon.id];
                    setSelectedAddons(updated);
                  }}
                />
              </div>
              <div className="addon-select-wrapper">
                {selectedAddons[addon.id] && addon.dropdownOptions && addon.dropdownOptions.length > 0 && (
                  <select
                    className="addon-select"
                    value={selectedAddonOptions[addon.id] || ''}
                    onChange={(e) => {
                      setSelectedAddonOptions(prev => ({
                        ...prev,
                        [addon.id]: e.target.value
                      }));
                    }}
                  >
                    <option value="">Select option</option>
                    {addon.dropdownOptions.map((option, optIndex) => (
                      <option key={optIndex} value={option.value}>
                        {option.value}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
          ))
        )}

        <p className="clarification-note">
          For more clarification, you can reach us by clicking the <span>Contact Us</span> button.
        </p>
      </div>
    </div>
  );
}

export default Step1;
