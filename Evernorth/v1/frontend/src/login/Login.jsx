import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Headernn from '../landing/Headernn';
import Footer from './Footer';
import axios from 'axios';

export default function LoginForm() {
  const [memberId, setMemberId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true); // Set loading state to true

    try {
      const response = await axios.get('http://localhost:8081/api/auth/login', {
        params: {
          membershipId: memberId,
          password: password,
        },
      });

      if (response.status === 200) {
        localStorage.setItem("membershipId", memberId);
        navigate('/usersection'); // Redirect to user section on successful login
      }
    } catch (err) {
      console.error('Login error:', err); // Log the error for debugging
      setError(err.response?.data?.message || 'Invalid Member ID or Password');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <>
      <Headernn />
      <div style={styles.outerContainer}>
        <div style={styles.container}>
          <h2>Login</h2>
          <form onSubmit={handleLogin} style={styles.form}>
            <div style={styles.inputGroup}>
              <label>Member ID:</label>
              <input
                type="text"
                value={memberId}
                onChange={(e) => setMemberId(e.target.value)}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={styles.input}
              />
            </div>
            {error && <p style={styles.error}>{error}</p>}
            <button type="submit" style={styles.button} disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

const styles = {
  outerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '93vh',
    backgroundColor: 'white',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '30px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    maxWidth: '500px',
    width: '90%',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    width: '100%',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  input: {
    padding: '12px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '100%',
    boxSizing: 'border-box',
  },
  button: {
    padding: '12px',
    backgroundColor: '#004d57',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '16px',
    width: '100%',
  },
  error: {
    color: 'red',
    fontSize: '0.9em',
    textAlign: 'center',
  },
};
