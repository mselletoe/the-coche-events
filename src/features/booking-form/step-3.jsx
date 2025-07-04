import React, { useEffect, useState } from 'react';
import './booking-form.scss';
import './step-3.scss';

function Step3({
  registerValidator,
  clientInfo,
  setClientInfo,
  useAccountDetails,
  setUseAccountDetails,
  accountInfo
}) {
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    socialPlatform: '',
    accountLink: ''
  });

  useEffect(() => {
    if (registerValidator) {
      registerValidator(validate);
    }
  }, [registerValidator, clientInfo]);

  useEffect(() => {
    if (useAccountDetails) {
      setClientInfo({
        firstName: accountInfo.firstName || '',
        lastName: accountInfo.lastName || '',
        suffix: accountInfo.suffix || '',
        email: accountInfo.email || '',
        phoneNumber: accountInfo.phoneNumber || '',
        socialPlatform: accountInfo.socialPlatform || '',
        accountLink: accountInfo.accountLink || ''
      });
    } else {
      const cleared = {
        firstName: '',
        lastName: '',
        suffix: '',
        email: '',
        phoneNumber: '',
        socialPlatform: '',
        accountLink: ''
      };
      setClientInfo(cleared);
    }
  }, [useAccountDetails]);

  const handleChange = (field, value) => {
    setClientInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validate = () => {
    let newErrors = {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      socialPlatform: '',
      accountLink: ''
    };
    let isValid = true;

    if (clientInfo.firstName.trim() === '') {
      newErrors.firstName = '* This field is required';
      isValid = false;
    }
    if (clientInfo.lastName.trim() === '') {
      newErrors.lastName = '* This field is required';
      isValid = false;
    }
    if (clientInfo.email.trim() === '') {
      newErrors.email = '* This field is required';
      isValid = false;
    }
    if (clientInfo.phoneNumber.trim() === '') {
      newErrors.phoneNumber = '* This field is required';
      isValid = false;
    }
    if (clientInfo.socialPlatform.trim() === '') {
      newErrors.socialPlatform = '* This field is required';
      isValid = false;
    }
    if (clientInfo.accountLink.trim() === '') {
      newErrors.accountLink = '* This field is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  return (
    <div className="step3-container">
      <form className="step3-form">
        <div className="checkbox-row">
          <input
            type="checkbox"
            id="useAccountDetails"
            checked={useAccountDetails}
            onChange={() => setUseAccountDetails(prev => !prev)}
          />
          <span className="checkmark"></span>
          <label htmlFor="useAccountDetails">Use my account details</label>
        </div>

        <div className="form-row">
          <div className="form-label">Full Name</div>
          <div className="form-inputs">
            <div className="field-container">
              <input
                type="text"
                placeholder="First Name"
                value={clientInfo.firstName}
                onChange={e => handleChange('firstName', e.target.value)}
                disabled={useAccountDetails}
                className={useAccountDetails ? 'disabled-input' : ''}
              />
              <span className="error-message">{errors.firstName || '\u00A0'}</span>
            </div>

            <div className="field-container">
              <input
                type="text"
                placeholder="Last Name"
                value={clientInfo.lastName}
                onChange={e => handleChange('lastName', e.target.value)}
                disabled={useAccountDetails}
                className={useAccountDetails ? 'disabled-input' : ''}
              />
              <span className="error-message">{errors.lastName || '\u00A0'}</span>
            </div>

            <div className="field-container">
              <input
                type="text"
                placeholder="Suffix (Optional)"
                value={clientInfo.suffix}
                onChange={e => handleChange('suffix', e.target.value)}
                disabled={useAccountDetails}
                className={useAccountDetails ? 'disabled-input' : ''}
              />
              <span className="error-message">&nbsp;</span>
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-label">Contact Details</div>
          <div className="form-inputs">
            <div className="field-container">
              <input
                type="email"
                placeholder="Email"
                value={clientInfo.email}
                onChange={e => handleChange('email', e.target.value)}
                disabled={useAccountDetails}
                className={useAccountDetails ? 'disabled-input' : ''}
              />
              <span className="error-message">{errors.email || '\u00A0'}</span>
            </div>

            <div className="field-container">
              <input
                type="text"
                placeholder="Phone Number"
                value={clientInfo.phoneNumber}
                onChange={e => handleChange('phoneNumber', e.target.value)}
                disabled={useAccountDetails}
                className={useAccountDetails ? 'disabled-input' : ''}
              />
              <span className="error-message">{errors.phoneNumber || '\u00A0'}</span>
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-label">Social Media</div>
          <div className="form-inputs">
            <div className="field-container">
              <select
                value={clientInfo.socialPlatform}
                onChange={e => handleChange('socialPlatform', e.target.value)}
                disabled={useAccountDetails}
                className={useAccountDetails ? 'disabled-input' : ''}
              >
                <option value="">Select Platform</option>
                <option value="Facebook">Facebook</option>
                <option value="Instagram">Instagram</option>
                <option value="Twitter">Twitter</option>
              </select>
              <span className="error-message">{errors.socialPlatform || '\u00A0'}</span>
            </div>

            <div className="field-container">
              <input
                type="text"
                placeholder="Account Link"
                value={clientInfo.accountLink}
                onChange={e => handleChange('accountLink', e.target.value)}
                disabled={useAccountDetails}
                className={useAccountDetails ? 'disabled-input' : ''}
              />
              <span className="error-message">{errors.accountLink || '\u00A0'}</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Step3;
