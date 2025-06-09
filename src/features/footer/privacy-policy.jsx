import React from 'react';
import './footer.scss';

function PrivacyPolicy(){
    return (
        <div className='coche-agreements-container'>
            <p className='page-title'>Privacy Policy</p>
            <hr/>
            <div className='agreement-heading'>
                <p>Your privacy is important to us at The Coche Events. To ensure transparency and trust, this notice explains how we collect, use, and protect your personal information when you visit our website or use our services.</p>
            </div>
            <div className='agreement-content'>
                <h1>The Information We Collect</h1>
                <p>This policy applies to all personal data collected through our website, mobile services, and any affiliated platforms.</p>
                <p>On pages where you can book a service, we may collect the following types of information:</p>
                <ul>
                    <li>Name</li>
                    <li>Email address</li>
                    <li>Billing and shipping address</li>
                    <li>Payment information (e.g., credit/debit card or mobile payment details)</li>
                    <li>Preferred setup details or customization requests</li>
                </ul>
                <br/>
                <p>In cases where you submit information about someone else (such as a surprise recipient), we may collect:</p>
                <ul>
                    <li>Recipient’s name</li>
                    <li>Address or surprise location</li>
                    <li>Contact number</li>
                    <li>Occasion details (e.g., birthday, proposal, etc.)</li>
                </ul>
            </div>

            <div className='agreement-content'>
                <h1>How We Use Your Information</h1>
                <p>We use the information you provide to process and complete your bookings or orders. This includes:</p>
                <ul>
                    <li>Arranging delivery and setup of your surprise</li>
                    <li>Customizing your chosen package or service</li>
                    <li>Confirming transactions via email or phone</li>
                    <li>Responding to inquiries or service-related messages</li>
                    <li>Sending occasional updates or offers (only if you opt in)</li>
                </ul>
                <br/>
                <p>We do not share your personal information with external parties except as necessary to:</p>
                <ul>
                    <li>Complete your order (e.g., payment processors, delivery partners)</li>
                    <li>Comply with legal obligations</li>
                    <li>Improve service reliability and security</li>
                </ul>
                <br/>
                <p>Information you provide about someone else (e.g., a gift recipient) is used solely to deliver the product or service to that individual. We do not use such information for marketing or unrelated purposes.</p>
                <br/>
                <p>We may use non-identifying, aggregated data (such as the number of visitors to a page or overall user trends) for website improvement, marketing performance analysis, or customer experience enhancements. These statistics never include personally identifiable details.
                We do not use or share your information in ways unrelated to those described in this policy without first offering you the opportunity to opt out.</p>
            </div>

            <div className='agreement-content'>
                <h1>Our Commitment to Data Security</h1>
                <p>To protect your personal data, we maintain physical, digital, and administrative safeguards to prevent unauthorized access, maintain data accuracy, and ensure the secure handling of your information. We use secure encryption protocols for payment and data transmission. Access to your information is limited to authorized personnel only.</p>
            </div>

            <div className='agreement-content'>
                <h1>Accessing or Correcting Your Information</h1>
                <p>You may request access to your personally identifiable information and submit corrections if necessary. To protect your data, we will take reasonable steps to verify your identity before granting access or making changes.</p>
                <br/>
                <p>To update or correct your information, please contact us via our Contact Us page or email us at <span><a href="mailto:thecocheevents@gmail.com">thecocheevents@gmail.com</a></span> or message us on Facebook by clicking the Contact Us button above.</p>
            </div>

            <div className='agreement-content'>
                <h1>Policy Updates</h1>
                <p>We may update this Privacy Policy as needed to reflect changes in our services, technology, or legal requirements. When we make changes, the updated version will be posted on this page with a revised effective date.</p>
            </div>
        </div>
    );
}

export default PrivacyPolicy