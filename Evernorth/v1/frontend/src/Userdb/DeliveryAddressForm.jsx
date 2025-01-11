import React, { useState } from 'react';
import axios from 'axios';
import styles from './DeliveryAddressForm.module.css';
import Footer from '../login/Footer';
import Headernn from '../landing/Headernn';

const DeliveryAddressForm = () => {
    const [address, setAddress] = useState({
        homeNumber: '',
        street: '',
        city: '',
        state: '',
        pinCode: '',
        country: ''
    });

    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress({ ...address, [name]: value });
    };

    const handleValidation = () => {
        let formErrors = {};
        if (!address.homeNumber) formErrors.homeNumber = 'Home number is required';
        if (!address.street) formErrors.street = 'Street is required';
        if (!address.city) formErrors.city = 'City is required';
        if (!address.state) formErrors.state = 'State is required';
        if (!address.pinCode) formErrors.pinCode = 'Pin code is required';
        if (!address.country) formErrors.country = 'Country is required';
        return formErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = handleValidation();
        if (Object.keys(formErrors).length === 0) {
            try {
                // Get the membershipId from localStorage
                const membershipId = localStorage.getItem('membershipId');
                const addressData = { ...address, membershipId };

                // Post data to the backend
                const response = await axios.post('http://localhost:8081/api/auth/delivery-submit', addressData);

                if (response.status === 200) {
                    alert('Address submitted successfully.');
                    localStorage.setItem('deliveryinformation', true);
                    setAddress({
                        homeNumber: '',
                        street: '',
                        city: '',
                        state: '',
                        pinCode: '',
                        country: ''
                    });
                }
            } catch (error) {
                setMessage('Failed to submit address. Please try again.');
            }
        } else {
            setErrors(formErrors);
        }
    };

    return (
        <>
        <div className={styles.pageContainer}>
            <form onSubmit={handleSubmit} className={styles.deliveryForm}>
                <h2>Delivery Address</h2>
                <p className={styles.message}>{message}</p>

                <div className={styles.formGroup}>
                    <label>Home Number:</label>
                    <input
                        type="text"
                        name="homeNumber"
                        value={address.homeNumber}
                        onChange={handleChange}
                    />
                    {errors.homeNumber && <span className={styles.error}>{errors.homeNumber}</span>}
                </div>

                <div className={styles.formGroup}>
                    <label>Street Address:</label>
                    <input
                        type="text"
                        name="street"
                        value={address.street}
                        onChange={handleChange}
                    />
                    {errors.street && <span className={styles.error}>{errors.street}</span>}
                </div>

                <div className={styles.formGroup}>
                    <label>City:</label>
                    <input
                        type="text"
                        name="city"
                        value={address.city}
                        onChange={handleChange}
                    />
                    {errors.city && <span className={styles.error}>{errors.city}</span>}
                </div>

                <div className={styles.formGroup}>
                    <label>State/Province:</label>
                    <input
                        type="text"
                        name="state"
                        value={address.state}
                        onChange={handleChange}
                    />
                    {errors.state && <span className={styles.error}>{errors.state}</span>}
                </div>

                <div className={styles.formGroup}>
                    <label>Pin Code:</label>
                    <input
                        type="text"
                        name="pinCode"
                        value={address.pinCode}
                        onChange={handleChange}
                    />
                    {errors.pinCode && <span className={styles.error}>{errors.pinCode}</span>}
                </div>

                <div className={styles.formGroup}>
                    <label>Country:</label>
                    <input
                        type="text"
                        name="country"
                        value={address.country}
                        onChange={handleChange}
                    />
                    {errors.country && <span className={styles.error}>{errors.country}</span>}
                </div>

                <button type="submit" className={styles.submitButton}>Submit Address</button>
            </form>
        </div>
        </>
    );
};

export default DeliveryAddressForm;
