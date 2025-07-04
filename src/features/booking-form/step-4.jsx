import React from 'react';
import './booking-form.scss';
import './step-4.scss';

function Step4() {
  return (
    <div className="step4-container">
      <div className="left-column receiver">
        <div className="box">
          <h3>Receiver’s Details</h3>
          <p>Sanya Lopez</p>
          <p>sanyalopez@gmail.com</p>
          <p>09123456789</p>
          <p className="link">Social Media Link</p>

          <h3>Booking Details</h3>
          <p>Barangay 123, Metro Manila, Manila 6203</p>
          <p>June 19, 2025</p>
          <p>2:00 PM</p>
          <p>Note: “I’m a hot Maria Clara”</p>

          <h3>Payment Details</h3>
          <p className="note">Select your payment method and fill in the required details</p>

          <div className="input-group">
            <label>Account Name</label>
            <input type="text" />
          </div>
          <div className="input-group">
            <label>Account Number</label>
            <input type="text" />
          </div>
        </div>
      </div>

      <div className="right-column billing">
        <div className="box">
          <h3>Billing Details</h3>
          <p><strong>Theme:</strong> Custom</p>

          <p><strong>Inclusions:</strong></p>
          <ul>
            <li>Balloons</li>
            <li>Confetti Balloons</li>
            <li>Message Card</li>
            <li>Ribbons</li>
            <li>Occasion Banner</li>
            <li>Letter Light Box</li>
            <li>Fairy Lights</li>
            <li>Soft Copy of Photo and Video Documentation</li>
          </ul>

          <p><strong>Banner:</strong> Custom</p>
          <p><strong>Light Box:</strong> Custom</p>
          <p><strong>Colors:</strong> Custom</p>

          <p className="price"><strong>Base Rate:</strong> ₱ 2,499</p>

          <p className="price"><strong>Add-Ons</strong></p>
          <p className="price">Fresh Flower (Medium) - ₱ 1,700</p>
          <p className="price">Cake (Mary Grace - Mini) - ₱ 1,000</p>
          <p className="price">Teddy Bear (2FT) - ₱ 1,800</p>

          <p className="total">Total: ₱ 6,999</p>
        </div>
      </div>
    </div>
  );
}

export default Step4;
