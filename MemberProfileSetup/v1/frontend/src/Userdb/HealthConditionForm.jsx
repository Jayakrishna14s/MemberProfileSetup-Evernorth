import React, { useState } from "react";
import axios from "axios";
import styles from "./HealthConditionForm.module.css";
import Footer from "../login/Footer";
import Headernn from "../landing/Headernn";
import { BACKEND_URL } from "../config";

const HealthConditionForm = () => {
  const [healthData, setHealthData] = useState({
    hasChronicIllness: "",
    chronicIllnessDetails: "",
    allergies: "",
    currentMedications: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHealthData({ ...healthData, [name]: value });
  };

  const handleValidation = () => {
    let formErrors = {};
    if (healthData.hasChronicIllness === "")
      formErrors.hasChronicIllness =
        "Please specify if you have a chronic illness";
    if (
      healthData.hasChronicIllness === "Yes" &&
      !healthData.chronicIllnessDetails
    )
      formErrors.chronicIllnessDetails =
        "Please provide details about your chronic illness";
    if (!healthData.allergies)
      formErrors.allergies = "Please list any allergies";
    if (!healthData.currentMedications)
      formErrors.currentMedications = "Please list any current medications";
    if (!healthData.emergencyContactName)
      formErrors.emergencyContactName = "Emergency contact name is required";
    if (!healthData.emergencyContactPhone)
      formErrors.emergencyContactPhone = "Emergency contact phone is required";
    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = handleValidation();
    if (Object.keys(formErrors).length === 0) {
      try {
        const membershipId = localStorage.getItem("membershipId");
        const response = await axios.post(
          BACKEND_URL + "/api/auth/health-information",
          {
            membershipId,
            ...healthData,
          }
        );

        if (response.status === 200) {
          alert("Health information submitted successfully!");
          localStorage.setItem("healthconditionsinformation", true);
          // Reset form fields after successful submission
          setHealthData({
            hasChronicIllness: "",
            chronicIllnessDetails: "",
            allergies: "",
            currentMedications: "",
            emergencyContactName: "",
            emergencyContactPhone: "",
          });
        }
      } catch (error) {
        setSuccessMessage(
          "Failed to submit health information. Please try again."
        );
      }
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <>
      <div className={styles.pageContainer}>
        <form onSubmit={handleSubmit} className={styles.healthForm}>
          <h2>Health Condition Information</h2>
          {successMessage && (
            <p className={styles.successMessage}>{successMessage}</p>
          )}
          <div className={styles.formGroup}>
            <label>Do you have any chronic illness?</label>
            <select
              name="hasChronicIllness"
              value={healthData.hasChronicIllness}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            {errors.hasChronicIllness && (
              <span className={styles.error}>{errors.hasChronicIllness}</span>
            )}
          </div>

          {healthData.hasChronicIllness === "Yes" && (
            <div className={styles.formGroup}>
              <label>Details of Chronic Illness:</label>
              <textarea
                name="chronicIllnessDetails"
                value={healthData.chronicIllnessDetails}
                onChange={handleChange}
                required
              />
              {errors.chronicIllnessDetails && (
                <span className={styles.error}>
                  {errors.chronicIllnessDetails}
                </span>
              )}
            </div>
          )}

          <div className={styles.formGroup}>
            <label>Do you have any allergies?</label>
            <textarea
              name="allergies"
              value={healthData.allergies}
              onChange={handleChange}
              required
            />
            {errors.allergies && (
              <span className={styles.error}>{errors.allergies}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label>Are you currently taking any medications?</label>
            <textarea
              name="currentMedications"
              value={healthData.currentMedications}
              onChange={handleChange}
              required
            />
            {errors.currentMedications && (
              <span className={styles.error}>{errors.currentMedications}</span>
            )}
          </div>

          <h3>Emergency Contact</h3>
          <div className={styles.formGroup}>
            <label>Emergency Contact Name:</label>
            <input
              type="text"
              name="emergencyContactName"
              value={healthData.emergencyContactName}
              onChange={handleChange}
              required
            />
            {errors.emergencyContactName && (
              <span className={styles.error}>
                {errors.emergencyContactName}
              </span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label>Emergency Contact Phone:</label>
            <input
              type="tel"
              name="emergencyContactPhone"
              value={healthData.emergencyContactPhone}
              onChange={handleChange}
              required
            />
            {errors.emergencyContactPhone && (
              <span className={styles.error}>
                {errors.emergencyContactPhone}
              </span>
            )}
          </div>

          <button type="submit" className={styles.submitButton}>
            Submit Health Information
          </button>
        </form>
      </div>
    </>
  );
};

export default HealthConditionForm;
