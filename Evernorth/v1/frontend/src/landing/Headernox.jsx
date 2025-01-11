import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdAccountCircle } from 'react-icons/md'; // Importing the Material Design account_circle icon from React Icons

function Headernox() {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLoginClick = () => {
    navigate('/loginpage');
  };

  const handleSignupClick = () => {
    navigate('/signuppage');
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
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
          onClick={handleLogout} 
          onMouseOver={() => (styles.button.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={() => (styles.button.backgroundColor = '#1fb5a0')}
        >
          Logout
        </button>

        {/* User Icon with Dropdown */}
        <div style={styles.userIconContainer}>
          <button onClick={toggleDropdown} style={styles.userIconButton}>
            <MdAccountCircle style={styles.userIcon} /> {/* Using the MdAccountCircle icon from React Icons */}
          </button>
          {dropdownOpen && (
            <div style={styles.dropdownMenu}>
              <button style={styles.dropdownItem} onClick={() => navigate('/profile')}>My Profile</button>
              <button style={styles.dropdownItem} onClick={() => navigate('/subscriptions')}>My Subscriptions</button>
              <button style={styles.dropdownItem} onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
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
  userIconContainer: {
    position: 'relative',
    marginLeft: '15px',
  },
  userIconButton: {
    background: 'transparent',
    border: 'none',
    color: 'white',
    fontSize: '1.5em',
    cursor: 'pointer',
  },
  userIcon: {
    color: 'white', // Ensuring the icon is white
    fontSize: '2em',
  },
  dropdownMenu: {
    position: 'absolute',
    top: '40px', // Adjust to your needs
    right: '0',
    backgroundColor: '#004d57',
    borderRadius: '4px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    zIndex: 100,
  },
  dropdownItem: {
    backgroundColor: '#004d57',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    textAlign: 'left',
    width: '200px',
    cursor: 'pointer',
    fontSize: '1em',
  },
  dropdownItemHover: {
    backgroundColor: '#1fb5a0',
  },
};

export default Headernox;
