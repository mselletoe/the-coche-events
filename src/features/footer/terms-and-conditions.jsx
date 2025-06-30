import React from 'react';
import './footer.scss';

function TermsAndConditions(){
    return (
        <div className='coche-agreements-container'>
            <p className='page-title'>Terms and Conditions</p>
            <hr/>
            <div className='agreement-heading'>
                <p>By accessing or booking a service through The Coche Events, you agree to be bound by these Terms and Conditions. These terms apply to all users of the site and services, including customers, browsers, and contributors.</p>
            </div>
            <div className='agreement-content'>
                <h1>Booking & Payment</h1>
                <ul>
                    <li>A 50% down payment is required to confirm your booking. The balance is due on the event date.</li>
                    <li>Payment can be made via [bank transfer, GCash, PayPal, etc.].</li>
                    <li>Bookings are only confirmed upon receipt of the down payment and a signed agreement.</li>
                </ul>
            </div>

            <div className='agreement-content'>
                <h1>Cancellations & Refunds</h1>
                <ul>
                    <li>Cancellations made 30 days before the event date are eligible for a 50% refund of the down payment.</li>
                    <li>Cancellations made less than 30 days before the event are non-refundable.</li>
                    <li>Rescheduling is allowed once, subject to availability and must be made at least 14 days before the original event date.</li>
                </ul>
            </div>

            <div className='agreement-content'>
                <h1>Event Day Policies</h1>
                <ul>
                    <li>Clients must ensure punctuality. Any delays caused by the client may affect service quality and are not refundable.</li>
                    <li>Our team will arrive 10 mins before the scheduled time for setup or preparation.</li>
                    <li>Any extension beyond agreed hours may incur additional charges.</li>
                </ul>
            </div>

            <div className='agreement-content'>
                <h1>Client Responsibilities</h1>
                <ul>
                    <li>Clients are responsible for securing necessary permits if required (e.g. for public spaces or vehicles).</li>
                    <li>Ensure the safety of our team and property during the event. Any damage caused by guests will be charged accordingly.</li>
                </ul>
            </div>

            <div className='agreement-content'>
                <h1>Force Majeure</h1>
                <p>The Coche Events is not liable for cancellations or disruptions due to unforeseen events such as natural disasters, accidents, or emergencies. We will work with you to reschedule when possible.</p>
            </div>

            <div className='agreement-content'>
                <h1>Photo & Video Consent</h1>
                <p>By booking with Coche Events, you agree to allow us to use event photos/videos for promotional purposes unless otherwise stated in writing.</p>
            </div>

            <div className='agreement-content'>
                <h1>Liability</h1>
                <p>Coche Events is not liable for personal injury, loss, or damage to personal property during the event.</p>
            </div>

            <div className='agreement-content'>
                <h1>Modifications</h1>
                <p>Any changes to services or arrangements must be made in writing and agreed upon by both parties at least 7 days before the event.</p>
            </div>
        </div>
    );
}

export default TermsAndConditions