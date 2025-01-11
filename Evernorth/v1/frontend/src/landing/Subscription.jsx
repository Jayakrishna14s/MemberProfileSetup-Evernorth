import { useState } from 'react';
import axios from 'axios';
import styles from './Subscription.module.css';

const Subscription = () => {
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubscribe = async () => {
        if (!email || !mobile) {
            setError('Both email and mobile number are required.');
            setSuccess('');
            return;
        }

        // Clear any previous error messages
        setError('');

        try {
            // Prepare data object to be sent to the backend (without membershipId)
            const data = { email, phone: mobile };

            // Send data to backend API (POST request)
            const response = await axios.post('http://localhost:8081/api/auth/users', data);

            if (response.status === 200) {
                setSuccess('Subscription successful! Please check your email for further steps.');
                setEmail('');
                setMobile('');
            }
        } catch (error) {
            setError('Failed to subscribe. Please try again.');
        }
    };

    return (
        <section className={styles.subscription}>
            <h2>Join our subscription service</h2>
            <input
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.emailInput}
            />
            <input
                placeholder="Enter your mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className={styles.emailInput}
            />
            <br/>
            <button onClick={handleSubscribe} className={styles.subscribeButton}>Subscribe</button>
            {error && <p className={styles.error}>{error}</p>}
            {success && <p className={styles.success}>{success}</p>}
        </section>
    );
};

export default Subscription;
