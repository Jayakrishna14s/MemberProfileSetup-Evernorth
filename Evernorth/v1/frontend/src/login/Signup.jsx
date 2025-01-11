import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Headernn from '../landing/Headernn.jsx';
import Footer from './Footer.jsx';
import styles from './Signup.module.css';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        const signupData = {
            name: name,
            email,
            phone,
            password
        };

        axios.post('http://localhost:8081/api/auth/register', signupData)
            .then((response) => {
                if (response.status === 200) {
                    alert('Signup successful: ' + JSON.stringify(response.data));
                    console.log('Signup successful:', response.data);
                    navigate('/loginpage');
                } else {
                    setError('Signup failed. Please try again.');
                }
            })
            .catch((error) => {
                console.error('Error during signup:', error);
                setError('An error occurred during signup. Please try again later.');
            });
    };

    return (
        <>
            <Headernn />
            <div className={styles.signupContainer}>
                <div className={styles.signupCard}>
                    <h2 className={styles.signupHeader}>Create an Account</h2>
                    <form onSubmit={handleSignup} className={styles.signupForm}>
                        <label className={styles.label}>Name</label>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label className={styles.label}>Email</label>
                        <input
                            type="email"
                            className={styles.input}
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label className={styles.label}>Phone Number</label>
                        <input
                            type="tel"
                            className={styles.input}
                            placeholder="Phone Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <label className={styles.label}>Password</label>
                        <input
                            type="password"
                            className={styles.input}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label className={styles.label}>Confirm Password</label>
                        <input
                            type="password"
                            className={styles.input}
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {error && <p className={styles.errorMessage}>{error}</p>}
                        <button type="submit" className={styles.signupButton}>Sign Up</button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Signup;
