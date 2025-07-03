import React from 'react';
import './booking-form.scss';
import './step-3.scss';

function Step3() {
    return (
        <div className='step3-container'>
            <form className='step3-form'>

                {/* Full Name */}
                <div className='form-row'>
                    <div className='form-label'>Full Name</div>
                    <div className='form-inputs'>
                        <input type='text' placeholder='First Name' />
                        <input type='text' placeholder='Last Name' />
                        <input type='text' placeholder='Suffix (Optional)' />
                    </div>
                </div>

                {/* Contact Details */}
                <div className='form-row'>
                    <div className='form-label'>Contact Details</div>
                    <div className='form-inputs'>
                        <input type='email' placeholder='Email' />
                        <input type='text' placeholder='Phone Number' />
                    </div>
                </div>

                {/* Social Media */}
                <div className='form-row'>
                    <div className='form-label'>Social Media</div>
                    <div className='form-inputs'>
                        <select>
                            <option>Select Platform</option>
                            <option>Facebook</option>
                            <option>Instagram</option>
                            <option>Twitter</option>
                        </select>
                        <input type='text' placeholder='Account Link' />
                    </div>
                </div>

            </form>
        </div>
    );
}

export default Step3;
