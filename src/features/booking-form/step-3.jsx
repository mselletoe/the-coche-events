import React, { useEffect, useState } from 'react';
import './booking-form.scss';
import './step-3.scss';

function Step3({ registerValidator, formData, setFormData, useAccountDetails, setUseAccountDetails, accountInfo, manualClientInfo, setManualClientInfo }) {
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        accountLink: ''
    });

    useEffect(() => {
        if (registerValidator) {
            registerValidator(validate);
        }
    }, [registerValidator, formData, useAccountDetails]);

    useEffect(() => {
        if (useAccountDetails && accountInfo) {
            // Save current form data before overwriting
            setManualClientInfo({
                firstName: formData.firstName,
                lastName: formData.lastName,
                suffix: formData.suffix,
                email: formData.email,
                phoneNumber: formData.phoneNumber,
                socialPlatform: formData.socialPlatform,
                accountLink: formData.accountLink
            });

            // Apply account info
            setFormData(prev => ({
                ...prev,
                firstName: accountInfo.firstName || '',
                lastName: accountInfo.lastName || '',
                suffix: accountInfo.suffix || '',
                email: accountInfo.email || '',
                phoneNumber: accountInfo.phoneNumber || '',
                socialPlatform: accountInfo.socialPlatform || '',
                accountLink: accountInfo.accountLink || ''
            }));
            setErrors({
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: '',
                accountLink: ''
            });
        } 
        else if (!useAccountDetails) {
            // Restore manual client info
            setFormData(prev => ({
                ...prev,
                firstName: manualClientInfo.firstName,
                lastName: manualClientInfo.lastName,
                suffix: manualClientInfo.suffix,
                email: manualClientInfo.email,
                phoneNumber: manualClientInfo.phoneNumber,
                socialPlatform: manualClientInfo.socialPlatform,
                accountLink: manualClientInfo.accountLink
            }));
        }
    }, [useAccountDetails, accountInfo]);

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const validate = () => {
        let newErrors = { firstName: '', lastName: '', email: '', phoneNumber: '', accountLink: '' };
        let isValid = true;

        if (formData.firstName.trim() === '') {
            newErrors.firstName = '* This field is required';
            isValid = false;
        }
        if (formData.lastName.trim() === '') {
            newErrors.lastName = '* This field is required';
            isValid = false;
        }
        if (formData.email.trim() === '') {
            newErrors.email = '* This field is required';
            isValid = false;
        }
        if (formData.phoneNumber.trim() === '') {
            newErrors.phoneNumber = '* This field is required';
            isValid = false;
        }
        if (formData.accountLink.trim() === '') {
            newErrors.accountLink = '* This field is required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    return (
        <div className='step3-container'>
            <form className='step3-form'>

                <div className='checkbox-row'>
                    <input
                        type='checkbox'
                        id='useAccountDetails'
                        checked={useAccountDetails}
                        onChange={() => setUseAccountDetails(!useAccountDetails)}
                        disabled={!accountInfo}
                    />
                    <span className="checkmark"></span>
                    <label htmlFor='useAccountDetails'>Use my account details</label>
                </div>

                <div className='form-row'>
                    <div className='form-label'>Full Name</div>
                    <div className='form-inputs'>
                        <div className='field-container'>
                            <input
                                type='text'
                                placeholder='First Name'
                                value={formData.firstName}
                                onChange={e => handleChange('firstName', e.target.value)}
                                disabled={useAccountDetails}
                            />
                            <span className='error-message'>
                                {errors.firstName ? errors.firstName : '\u00A0'}
                            </span>
                        </div>
                        <div className='field-container'>
                            <input
                                type='text'
                                placeholder='Last Name'
                                value={formData.lastName}
                                onChange={e => handleChange('lastName', e.target.value)}
                                disabled={useAccountDetails}
                            />
                            <span className='error-message'>
                                {errors.lastName ? errors.lastName : '\u00A0'}
                            </span>
                        </div>
                        <div className='field-container'>
                            <input
                                type='text'
                                placeholder='Suffix (Optional)'
                                value={formData.suffix}
                                onChange={e => handleChange('suffix', e.target.value)}
                                disabled={useAccountDetails}
                            />
                            <span className='error-message'>&nbsp;</span>
                        </div>
                    </div>
                </div>

                <div className='form-row'>
                    <div className='form-label'>Contact Details</div>
                    <div className='form-inputs'>
                        <div className='field-container'>
                            <input
                                type='email'
                                placeholder='Email'
                                value={formData.email}
                                onChange={e => handleChange('email', e.target.value)}
                                disabled={useAccountDetails}
                            />
                            <span className='error-message'>
                                {errors.email ? errors.email : '\u00A0'}
                            </span>
                        </div>
                        <div className='field-container'>
                            <input
                                type='text'
                                placeholder='Phone Number'
                                value={formData.phoneNumber}
                                onChange={e => handleChange('phoneNumber', e.target.value)}
                                disabled={useAccountDetails}
                            />
                            <span className='error-message'>
                                {errors.phoneNumber ? errors.phoneNumber : '\u00A0'}
                            </span>
                        </div>
                    </div>
                </div>

                <div className='form-row'>
                    <div className='form-label'>Social Media</div>
                    <div className='form-inputs'>
                        <div className='field-container'>
                            <select
                                value={formData.socialPlatform}
                                onChange={e => handleChange('socialPlatform', e.target.value)}
                                disabled={useAccountDetails}
                            >
                                <option>Select Platform</option>
                                <option>Facebook</option>
                                <option>Instagram</option>
                                <option>Twitter</option>
                            </select>
                            <span className='error-message'>&nbsp;</span>
                        </div>
                        <div className='field-container'>
                            <input
                                type='text'
                                placeholder='Account Link'
                                value={formData.accountLink}
                                onChange={e => handleChange('accountLink', e.target.value)}
                                disabled={useAccountDetails}
                            />
                            <span className='error-message'>
                                {errors.accountLink ? errors.accountLink : '\u00A0'}
                            </span>
                        </div>
                    </div>
                </div>

            </form>
        </div>
    );
}

export default Step3;
