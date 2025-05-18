import React, { useState } from "react";
import "./SignUp.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    emailAddress: "",
    country: "",
    phoneNumber: "",
    password: "",
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!acceptedTerms) {
      setError("You must accept the terms and conditions");
      return;
    }
    setError("");
    // Handle registration logic here
  };

  return (
    <div className="signup-container">
      <div className="signup-form-wrapper">
        <div className="signup-content">
          <h1>Register Now</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="email"
                name="emailAddress"
                placeholder="Email Address"
                value={formData.emailAddress}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Enter your T.P"
                value={formData.phoneNumber}
                onChange={handleChange}
                maxLength={10}
                required
              />
            </div>
            
          <div className="terms-checkbox">
            <div className="checkbox-wrapper">
              <input
                type="checkbox"
                id="terms"
                checked={acceptedTerms}
                onChange={() => setAcceptedTerms(!acceptedTerms)}
              />
            </div>
            <div className="terms-text">
              <label htmlFor="terms">I agree to the Terms and Conditions</label>
            </div>
          </div>

            {error && <p className="error-message">{error}</p>}

            <button type="submit" className="register-button">
              Register
            </button>
          </form>

          <div className="divider">
            <span>or</span>
          </div>

          <button className="google-button">
            <img src="https://cdn.cdnlogo.com/logos/g/35/google-icon.svg" alt="Google" className="google-icon" />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;