// Headern.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

function Headern() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/loginpage"); // Navigate to "/loginpage" when button is clicked
  };

  const handleSignupClick = () => {
    navigate("/signuppage");
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
          onClick={handleSignupClick}
          onMouseOver={() =>
            (styles.button.backgroundColor = styles.buttonHover.backgroundColor)
          }
          onMouseOut={() => (styles.button.backgroundColor = "#1fb5a0")}
        >
          SignUp
        </button>
        <button
          style={styles.button}
          onClick={handleLoginClick}
          onMouseOver={() =>
            (styles.button.backgroundColor = styles.buttonHover.backgroundColor)
          }
          onMouseOut={() => (styles.button.backgroundColor = "#1fb5a0")}
        >
          Login
        </button>
      </div>
    </header>
  );
}

const styles = {
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#004d57",
    padding: "8px 20px", // Reduced padding to decrease header height
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    color: "white",
    fontFamily: "Arial, sans-serif",
    position: "fixed",
    top: 0,
    width: "100%",
    zIndex: 1000,
    height: "70px", // Set specific height to make header compact
  },
  logoContainer: {
    display: "flex",
    alignItems: "center", // Align logo and subtitle vertically
    gap: "6px",
  },
  logoText: {
    color: "#1fb5a0",
    fontSize: "1.3em",
    fontWeight: "bold",
  },
  logoSubtitle: {
    fontSize: "1em",
    color: "#ffffff",
    opacity: 0.85,
  },
  nav: {
    display: "flex",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#1fb5a0",
    color: "#ffffff",
    border: "none",
    cursor: "pointer",
    height: "40px",
    fontWeight: "bold",
    transition: "background-color 0.2s ease, transform 0.2s ease",
    display: "flex",
    flexdirection: "column",
    justifyContent: "center",
    marginbottom: "20px",
    margin: "20px",
  },
  buttonHover: {
    backgroundColor: "#17a08f",
  },
};

export default Headern;
