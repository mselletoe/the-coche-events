import React from 'react';
import './footer.scss';
import { cocheLogo } from '../../assets/images.js';
import { NavLink } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
        <div className='upperfooter'>
            <img id='coche-logo' src={cocheLogo} alt="coche"/>
            <div className='upperfooter-texts'>
                <div className='coche-contact-details'>
                    <p>Cavite, Philippines</p>
                    <p>+63912345678 </p>
                    <p>thecocheevents@gmail.com</p>
                </div>
                <div className='coche-agreements'>
                    <NavLink to="/privacy-policy">Privacy Policy</NavLink>
                    <NavLink to="/terms-and-conditions">Terms and Condition</NavLink>
                </div>
            </div>
        </div>
        <div className='lowerfooter'>
            <p>© 2025 The Coche Events. All rights reserved.</p>
        </div>
    </footer>
  );
}

export default Footer;