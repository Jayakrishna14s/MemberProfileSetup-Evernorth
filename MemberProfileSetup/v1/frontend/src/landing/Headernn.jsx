import React from "react";
import { BACKEND_URL } from "../config";

function Headernn() {
  return (
    <header style={styles.header}>
      <div style={styles.logo}>
        <span style={styles.logoText}>EVERNORTH</span> Care Group
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
    padding: "10px 20px",
    color: "white",
    fontFamily: "Arial, sans-serif",
    position: "fixed", // Makes header fixed
    top: 0, // Positions at the top
    width: "100%", // Full width of the viewport
    zIndex: 1000, // Ensures it stays above other content
  },
  logo: {
    fontWeight: "bold",
    fontSize: "1.2em",
  },
  logoText: {
    color: "#1fb5a0", // Adjusted color for brand design
  },
  nav: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  button: {
    backgroundColor: "#1fb5a0",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background-color 0.3s", // Smooth hover transition
  },
  buttonHover: {
    backgroundColor: "#17a08f", // Darker shade on hover
  },
};

export default Headernn;
