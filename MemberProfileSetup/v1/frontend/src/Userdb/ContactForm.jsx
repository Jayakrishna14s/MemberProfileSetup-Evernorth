import React, { useState } from "react";
import styles from "./ContactForm.module.css";
import axios from "axios";
import Headern from "../landing/Headern";
import Headernn from "../landing/Headernn";
import Footer from "../login/Footer";
import { BACKEND_URL } from "../config";

// const BACKEND_URL = `${import.meta.env.VITE_BACKEND_URL}`;

const ContactForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
  });

  const [alertMessage, setAlertMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const membershipId = localStorage.getItem("membershipId");

    try {
      const response = await axios.post(BACKEND_URL + "/api/auth/contact", {
        ...formData,
        membershipId,
      });
      if (response.status === 200) {
        alert("form submitted successfully!!");
        localStorage.setItem("contactinformation", true);
        onSubmit(); // Update the status after form submission
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          address: "",
          city: "",
          state: "",
          zip: "",
          country: "",
          emergencyContactName: "",
          emergencyContactPhone: "",
        });
      }
    } catch (error) {
      setAlertMessage("Error submitting form. Please try again.");
    }
  };

  return (
    <>
      <div className={styles.pageContainer}>
        <form onSubmit={handleSubmit} className={styles.contactForm}>
          <h2>Contact Information</h2>
          <div className={styles.formGroup}>
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Phone Number:</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>City:</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>State/Province:</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>ZIP/Postal Code:</label>
            <input
              type="text"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Country:</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </div>
          <h3>Emergency Contact</h3>
          <div className={styles.formGroup}>
            <label>Emergency Contact Name:</label>
            <input
              type="text"
              name="emergencyContactName"
              value={formData.emergencyContactName}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Emergency Contact Phone:</label>
            <input
              type="tel"
              name="emergencyContactPhone"
              value={formData.emergencyContactPhone}
              onChange={handleChange}
              required
            />
          </div>

          {alertMessage && (
            <div className={styles.errorMessage}>{alertMessage}</div>
          )}
          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default ContactForm;
