import React from 'react';
import { useNavigate } from 'react-router-dom';

function Headerno() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/loginpage'); // Navigate to "/loginpage" when button is clicked
  };

  const handleSignupClick = () => {
    navigate('/signuppage');
  };

  const handleLogout = () => {
    localStorage.clear(); // Clear all data in localStorage
    navigate('/'); // Navigate to the homepage after logout
  };

  return (
    <header style={styles.header}>
      <div style={styles.logoContainer}>
        <span style={styles.logoText}>EVERNORTH</span>
        <span style={styles.logoSubtitle}>Care Group</span>
      </div>
      <div style={styles.nav}>
        <button 
          style={styles.button} 
          onClick={handleLogout} // Handle the logout on click
          onMouseOver={() => (styles.button.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={() => (styles.button.backgroundColor = '#1fb5a0')}
        >
          Logout
        </button>
      </div>
    </header>
  );
}

const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#004d57',
    padding: '8px 20px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    color: 'white',
    fontFamily: 'Arial, sans-serif',
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 1000,
    height: '70px',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  logoText: {
    color: '#1fb5a0',
    fontSize: '1.3em',
    fontWeight: 'bold',
  },
  logoSubtitle: {
    fontSize: '1em',
    color: '#ffffff',
    opacity: 0.85,
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'red',
    color: '#ffffff',
    border: 'none',
    cursor: 'pointer',
    height: '40px',
    fontWeight: 'bold',
    transition: 'background-color 0.2s ease, transform 0.2s ease',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: '20px',
    margin: '20px',
  },
  buttonHover: {
    backgroundColor: '#17a08f',
  },
};

export default Headerno;
