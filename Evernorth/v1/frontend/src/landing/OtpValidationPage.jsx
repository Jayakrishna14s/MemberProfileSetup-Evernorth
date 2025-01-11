import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './OtpValidationPage.module.css';
import { useNavigate } from 'react-router-dom';
import Headerno from './Headerno';
import Footer from '../login/Footer';

const ValidateOtpPage = () => {
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Fetch the email from localStorage
  useEffect(() => {
    const storedEmail = localStorage.getItem('email'); // Fetch email from localStorage
    if (storedEmail) {
      setEmail(storedEmail); // Set email state if found
    } else {
      setError('Email not found. Please make sure you are logged in.');
    }
  }, []);

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
    setError(''); // Clear errors on input change
  };

  const handleValidateOtp = async () => {
    if (!otp) {
      setError('OTP is required.');
      return;
    }

    try {
      // Send OTP and email to backend for validation
      const response = await axios.post('http://localhost:8081/api/auth/validate-otp', {
        email: email.trim(),
        otp: otp.trim(),
      });

      if (response.status === 200) {
        localStorage.setItem('contactinformation', false);
        localStorage.setItem('paymentinformation', false);
        localStorage.setItem('deliveryinformation', false);
        localStorage.setItem('healthconditionsinformation', false);
        localStorage.setItem('dependentsinformation', false);
        localStorage.setItem('securityinformation', false);
        setSuccess('OTP validated successfully!');
        setTimeout(() => navigate('/user-db'), 2000); // Redirect to dashboard after success
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred while validating OTP. Please try again.');
    }
  };

  return (
    <>
    <Headerno/>
    <div className={styles.validateOtpContainer}>
      <div className={styles.validateOtpBox}>
        <h1>Validate OTP</h1>
        <p>We have sent an OTP to your registered email address: <strong>{email}</strong></p>
        <p>Please enter the OTP to proceed.</p>

        {/* OTP input field */}
        <input
          type="text"
          value={otp}
          onChange={handleOtpChange}
          placeholder="Enter OTP"
          className={styles.otpInput}
        />

        <button onClick={handleValidateOtp} className={styles.validateBtn}>Validate</button>

        {/* Error and Success messages */}
        {error && <p className={styles.errorMessage}>{error}</p>}
        {success && <p className={styles.successMessage}>{success}</p>}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default ValidateOtpPage;
