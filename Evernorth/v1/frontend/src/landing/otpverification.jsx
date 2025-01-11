import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import styles from './OtpVerification.module.css';
import Headernn from './Headernn';


const OtpVerification = () => {
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');
    const [isOtpRequested, setIsOtpRequested] = useState(false);
    const [searchParams] = useSearchParams();
    const membershipId = searchParams.get("membershipid");

    const navigate = useNavigate(); // Initialize useNavigate hook

    useEffect(() => {
        const requestOtp = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/api/auth/account-creation?membershipid=${membershipId}`);
                if (response.status === 200) {
                    setMessage(`An OTP has been sent to your registered email.`);
                    setIsOtpRequested(true);
                }
            } catch (error) {
                setMessage('Failed to request OTP. Please try again.');
            }
        };
        requestOtp();
    }, [membershipId]);

    const handleOtpSubmit = async () => {
        try {
            const response = await axios.post(
                `http://localhost:8081/api/auth/verify-otp?membershipId=${membershipId}&otp=${otp}`
            );
            if (response.status === 200) {
                setMessage('OTP verified successfully! Proceed with profile setup.');
    
                // Store membershipId and other information in localStorage
                localStorage.setItem('membershipId', membershipId);
                localStorage.setItem('contactinformation', false);
                localStorage.setItem('paymentinformation', false);
                localStorage.setItem('deliveryinformation', false);
                localStorage.setItem('healthconditionsinformation', false);
                localStorage.setItem('dependentsinformation', false);
                localStorage.setItem('securityinformation', false);
    
                // Navigate to /user-db upon successful OTP verification
                navigate('/user-db');
            } else {
                setMessage('Invalid OTP. Please try again.');
            }
        } catch (error) {
            setMessage('OTP verification failed. Please try again.');
        }
    };
    

    return (
        <>
        <Headernn/>
        <div className={styles.container}>
            <div className={styles.card}>
                <h2 className={styles.header}>OTP Verification</h2>
                <p className={styles.message}>{message}</p>
                {isOtpRequested && (
                    <>
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter OTP"
                            className={styles.input}
                        />
                        <button onClick={handleOtpSubmit} className={styles.button}>Verify OTP</button>
                    </>
                )}
            </div>
        </div>
        </>
    );
};

export default OtpVerification;
