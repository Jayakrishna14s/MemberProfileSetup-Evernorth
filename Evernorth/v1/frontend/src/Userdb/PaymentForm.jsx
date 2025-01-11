import React, { useState } from 'react';
import styles from './PaymentForm.module.css';
import axios from 'axios';
import Headernn from '../landing/Headernn';
import Footer from '../login/Footer';

const PaymentForm = () => {
    const [paymentData, setPaymentData] = useState({
        cardHolderName: '',
        cardNumber: '',
        expirationDate: '',
        cvv: '',
        debitCardNumber: '',
        debitCardHolderName: '',
        upiId: ''
    });

    const [message, setMessage] = useState('');
    
    // Get membership ID from local storage
    const membershipId = localStorage.getItem('membershipId');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPaymentData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!membershipId) {
            setMessage('No membership ID found. Please log in again.');
            return;
        }

        const paymentInfo = {
            ...paymentData,
            membershipId // Attach the membership ID to the payment data
        };

        try {
            const response = await axios.post('http://localhost:8081/api/auth/payment-information', paymentInfo);
            if (response.status === 200) {
                alert('Payment information submitted successfully!');
                localStorage.setItem('paymentinformation', true);
                // Clear the form
                setPaymentData({
                    cardHolderName: '',
                    cardNumber: '',
                    expirationDate: '',
                    cvv: '',
                    debitCardNumber: '',
                    debitCardHolderName: '',
                    upiId: ''
                });
            } else {
                setMessage('Error submitting payment information. Please try again.');
            }
        } catch (error) {
            setMessage('Error submitting payment information. Please try again.');
        }
    };

    return (
        <>
        <div className={styles.pageContainer}>
            <form onSubmit={handleSubmit} className={styles.paymentForm}>
                <h2>Payment Methods</h2>
                <p>{message}</p>
                
                <div className={styles.formGroup}>
                    <label>Cardholder Name (Credit Card):</label>
                    <input type="text" name="cardHolderName" value={paymentData.cardHolderName} onChange={handleChange} required />
                </div>
                <div className={styles.formGroup}>
                    <label>Card Number (Credit Card):</label>
                    <input type="text" name="cardNumber" value={paymentData.cardNumber} onChange={handleChange} required />
                </div>
                <div className={styles.formGroup}>
                    <label>Expiration Date (Credit Card):</label>
                    <input type="month" name="expirationDate" value={paymentData.expirationDate} onChange={handleChange} required />
                </div>
                <div className={styles.formGroup}>
                    <label>CVV (Credit Card):</label>
                    <input type="text" name="cvv" value={paymentData.cvv} onChange={handleChange} required />
                </div>

                <h3>Debit Card Information</h3>
                <div className={styles.formGroup}>
                    <label>Cardholder Name (Debit Card):</label>
                    <input type="text" name="debitCardHolderName" value={paymentData.debitCardHolderName} onChange={handleChange} required />
                </div>
                <div className={styles.formGroup}>
                    <label>Card Number (Debit Card):</label>
                    <input type="text" name="debitCardNumber" value={paymentData.debitCardNumber} onChange={handleChange} required />
                </div>

                <h3>UPI Information</h3>
                <div className={styles.formGroup}>
                    <label>UPI ID:</label>
                    <input type="text" name="upiId" value={paymentData.upiId} onChange={handleChange} required />
                </div>

                <button type="submit" className={styles.submitButton}>Submit Payment</button>
            </form>
        </div>
        </>
    );
};

export default PaymentForm;
