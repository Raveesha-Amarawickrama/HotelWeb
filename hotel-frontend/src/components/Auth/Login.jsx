import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import backgroundImage from '../../assets/login.jpg';

const Login = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Generate random background circles on mount
  const [backgroundCircles, setBackgroundCircles] = useState([]);
  
  useEffect(() => {
    const circles = [];
    for (let i = 0; i < 10; i++) {
      circles.push({
        width: Math.random() * 400 + 100,
        height: Math.random() * 400 + 100,
        top: Math.random() * 100,
        left: Math.random() * 100,
        opacity: Math.random() * 0.4
      });
    }
    setBackgroundCircles(circles);
  }, []);

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 10) {
      setPhoneNumber(value);
      setError('');
    }
  };

  const handleOtpChange = (index, e) => {
    const value = e.target.value.replace(/\D/g, '');
    
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      // Auto-focus next input if current input is filled
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-input-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    // If backspace is pressed and current field is empty, focus previous field
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleSendOtp = (e) => {
    if (e) e.preventDefault();
    
    if (phoneNumber.length !== 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    setIsLoading(true);

    // Simulate OTP sending with delay
    setTimeout(() => {
      setOtpSent(true);
      setIsLoading(false);
      setError('');
    }, 1500);
  };

  const handleVerifyOtp = (e) => {
    if (e) e.preventDefault();
    
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setIsLoading(true);

    // Simulate OTP verification with delay
    setTimeout(() => {
      setIsLoading(false);
      // In a real app, you would redirect here after successful verification
      alert('Login successful!');
    }, 1500);
  };

  const handleGoogleSignIn = () => {
    // Google sign-in implementation would go here
    alert('Google sign-in clicked');
  };

  const handleResendOtp = () => {
    setIsLoading(true);
    
    // Simulate OTP resending with delay
    setTimeout(() => {
      setIsLoading(false);
      alert('OTP resent successfully!');
    }, 1500);
  };

  // New function to handle redirect to SignUp page
  const handleSignUpRedirect = () => {
    navigate('/signup'); // Navigate to the SignUp route
  };

  return (
    <div className="login-container">
      {/* Background Pattern */}
      <div className="login-background">
        <div 
          className="login-background-image" 
          style={{ backgroundImage: `url(${backgroundImage})` }}
        ></div>
        <div className="login-background-gradient"></div>
        {backgroundCircles.map((circle, i) => (
          <div 
            key={i}
            className="login-background-circle" 
            style={{
              width: `${circle.width}px`,
              height: `${circle.height}px`,
              top: `${circle.top}%`,
              left: `${circle.left}%`,
              opacity: circle.opacity
            }}
          />
        ))}
      </div>
      
      <div className="login-card">
        <h1 className="login-title">
          Welcome Back
        </h1>
        
        {!otpSent ? (
          <>
            <div className="input-group">
              <label className="input-label">Phone Number</label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                className="phone-input"
                maxLength={10}
              />
            </div>
              
            {error && <p className="error-message">{error}</p>}
              
            <button 
              onClick={handleSendOtp}
              className="primary-button"
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Send OTP'}
            </button>

            <div className="divider">
              <span className="divider-text">or</span>
            </div>

            <button 
              className="google-button"
              onClick={handleGoogleSignIn}
            >
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"></path>
                <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"></path>
                <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"></path>
                <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"></path>
              </svg>
              Continue with Google
            </button>
          </>
        ) : (
          <>
            <div className="input-group">
              <div className="otp-header">
                <label className="input-label">Verify OTP</label>
                <span className="otp-phone-display">Sent to {phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')}</span>
              </div>
              <div className="otp-container">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-input-${index}`}
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="otp-input"
                  />
                ))}
              </div>
            </div>
              
            {error && <p className="error-message">{error}</p>}
              
            <button 
              onClick={handleVerifyOtp}
              className="primary-button"
              disabled={isLoading}
            >
              {isLoading ? 'Verifying...' : 'Verify & Login'}
            </button>
              
            <div className="input-group" style={{ textAlign: 'center', marginTop: '1rem' }}>
              <button 
                type="button"
                onClick={handleResendOtp} 
                className="text-button"
                disabled={isLoading}
              >
                Didn&apos;t receive the code? Resend
              </button>
            </div>
              
            <div className="input-group" style={{ textAlign: 'center' }}>
              <button 
                type="button"
                onClick={() => setOtpSent(false)} 
                className="back-button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="back-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Phone Number
              </button>
            </div>
          </>
        )}
        
        <div className="signup-prompt">
          <p>
            Don&apos;t have an account? 
            <span className="signup-link" onClick={handleSignUpRedirect}>
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;