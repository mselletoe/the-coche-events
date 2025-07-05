import React, { useEffect, useState } from 'react';
import './booking-form.scss';
import './step-3.scss';
import api from '../../api';

function Step3({
  registerValidator,
  clientInfo,
  setClientInfo,
  useAccountDetails,
  setUseAccountDetails,
  accountInfo
}) {
  const [useAccountInfo, setUseAccountInfo] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [userFirstName, setUserFirstName] = useState('');
const [userLastName, setUserLastName] = useState('');
const [userEmail, setUserEmail] = useState('');
const [userPhone, setUserPhone] = useState('');

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    socialPlatform: '',
    accountLink: ''
  });

  const [manualClientInfo, setManualClientInfo] = useState(clientInfo);

  useEffect(() => {
    if (registerValidator) {
      registerValidator(validate);
    }
  }, [registerValidator, clientInfo, accountInfo]); // ✅ add accountInfo

  useEffect(() => {
    if (useAccountDetails) {
      if (accountInfo) {
        setClientInfo({
          firstName: accountInfo.first_name ?? '',
          lastName: accountInfo.last_name ?? '',
          email: accountInfo.email ?? '',
          phoneNumber: accountInfo.phone ?? '',
          socialPlatform: '',
          accountLink: '',
        });
      }
    } else {
      setClientInfo(manualClientInfo); // restore manual input
    }
  }, [useAccountDetails, accountInfo]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user?.id) return;

    // Optionally fetch from API, or just use saved info:
    api.get('/fetch_users.php')
      .then((res) => {
        const users = Array.isArray(res.data) ? res.data : res.data.users;
        const u = users.find(usr => usr.id == user.id);
        if (u) {
          setUserFirstName(u.first_name || '');
          setUserLastName(u.last_name || '');
          setUserEmail(u.email || '');
          setUserPhone(u.phone || '');
        }
      })
      .catch(err => console.error("Error loading user info:", err));
  }, []);

  const handleChange = (field, value) => {
    const updated = {
      ...clientInfo,
      [field]: value
    };
    setClientInfo(updated);

    if (!useAccountDetails) {
      setManualClientInfo(updated); // keep manual input safe
    }
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
          <label>
            <input
              type="checkbox"
              checked={useAccountInfo}
              onChange={(e) => {
              const checked = e.target.checked;
              setUseAccountInfo(checked);

                if (checked) {
                  const updated = {
                    ...clientInfo,
                    firstName: userFirstName,
                    lastName: userLastName,
                    email: userEmail,
                    phoneNumber: userPhone,
                  };
                  setClientInfo(updated);
                } else {
                  const updated = {
                    ...clientInfo,
                    firstName: '',
                    lastName: '',
                    email: '',
                    phoneNumber: '',
                  };
                  setClientInfo(updated);
                }
              }}
              />
              Use my account details
          </label>
        </div>

        <div className="form-row">
          <div className="form-label">Full Name</div>
          <div className="form-inputs">
            <div className="field-container">
              <input
                type="text"
                placeholder="First Name"
                value={clientInfo.firstName ?? ''}
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
                value={clientInfo.lastName ?? ''}
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
                value={clientInfo.suffix ?? ''}
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
                value={clientInfo.email ?? ''}
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
