import React from 'react';
import BookingForm from '../../features/booking-form/booking-form';
import './services.scss'

function Services(){
    return (
        <div className='services-container'>
            <div className='services-headings'>
                <p>Every celebration deserves a <span>twist</span>—and<br></br>we deliver it straight from a car trunk.</p>
                <h4>Explore our curated surprises crafted to create joy, connection, and unforgettable memories.</h4>
            </div>

            <div className='services-selections'>
                <div className='styles-text'>
                    <p>Styles</p>
                    <h4>Select the kind of <br></br>surprise you'd love us<br></br> to set up.</h4>
                </div>
                
                <div className='services-options'>
                    <div className='optionX'>
                        Option 1
                    </div>
                    <div className='optionX'>
                        Option 2
                    </div>
                    <div className='optionX'>
                        Option 3
                    </div>
                    <div className='optionX'>
                        Option 4
                    </div>
                </div>
            </div>
            <button className='book-now'>Book Now</button>
            <BookingForm />
        </div>
        
    );
}

export default Services