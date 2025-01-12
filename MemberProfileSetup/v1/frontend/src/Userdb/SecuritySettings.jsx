import React, { useState } from "react";
import styles from "./SecuritySettings.module.css"; // Add your styles
import axios from "axios";
import Footer from "../login/Footer";
import Headernn from "../landing/Headernn";
import { BACKEND_URL } from "../config";

const SecuritySettings = () => {
  const [securityData, setSecurityData] = useState({
    password: "",
    confirmPassword: "",
    securityQuestion: "",
    securityAnswer: "",
  });

  const [alertMessage, setAlertMessage] = useState("");
  const membershipId = localStorage.getItem("membershipId"); // Retrieve membership ID from local storage

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setSecurityData((prevData) => ({ ...prevData, [name]: checked }));
    } else {
      setSecurityData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (securityData.password !== securityData.confirmPassword) {
      setAlertMessage("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(
        BACKEND_URL + "/api/auth/security-information",
        {
          membershipId: membershipId,
          password: securityData.password,
          securityQuestion: securityData.securityQuestion,
          securityAnswer: securityData.securityAnswer,
        }
      );

      if (response.status === 200) {
        alert("Security information saved successfully!");
        localStorage.setItem("securityinformation", true);
        setSecurityData({
          password: "",
          confirmPassword: "",
          securityQuestion: "",
          securityAnswer: "",
        });
      }
    } catch (error) {
      setAlertMessage("Failed to save security information.");
    }
  };

  return (
    <>
      <div className={styles.pageContainer}>
        <form onSubmit={handleSubmit} className={styles.securityForm}>
          <h2>Account Security</h2>

          <div className={styles.formGroup}>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={securityData.password}
              onChange={handleChange}
              required
              placeholder="Enter your new password"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={securityData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm your new password"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Security Question (optional):</label>
            <input
              type="text"
              name="securityQuestion"
              value={securityData.securityQuestion}
              onChange={handleChange}
              placeholder="Set a security question"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Security Answer:</label>
            <input
              type="text"
              name="securityAnswer"
              value={securityData.securityAnswer}
              onChange={handleChange}
              placeholder="Provide an answer"
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            Save Security Settings
          </button>
        </form>

        {alertMessage && <div className={styles.alert}>{alertMessage}</div>}
      </div>
    </>
  );
};

export default SecuritySettings;
