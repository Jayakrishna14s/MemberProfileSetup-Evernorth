import React, { useState } from 'react';
import axios from 'axios';
import styles from './DependentsForm.module.css';
import Footer from '../login/Footer';
import Headern from '../landing/Headern';

const DependentsForm = () => {
    const [dependent, setDependent] = useState({
        name: '',
        relationship: '',
        age: '',
        address: '',
        healthCondition: '',
        chronicIllness: '',
        chronicIllnessDetails: '',
        allergies: '',
        medications: '',
        emergencyContactName: '',
        emergencyContactPhone: ''
    });

    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDependent({
            ...dependent,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const membershipId = localStorage.getItem('membershipId'); // Assuming membershipId is stored in localStorage

        try {
            // Send dependent data along with membershipId
            const response = await axios.post('http://localhost:8081/api/auth/dependent-information', { ...dependent, membershipId });

            if (response.status === 200) {
                alert('Dependent information submitted successfully!');
                setAlertType('success');
                localStorage.setItem('dependentsinformation', true);
                
                // Clear form fields after successful submission
                setDependent({
                    name: '',
                    relationship: '',
                    age: '',
                    address: '',
                    healthCondition: '',
                    chronicIllness: '',
                    chronicIllnessDetails: '',
                    allergies: '',
                    medications: '',
                    emergencyContactName: '',
                    emergencyContactPhone: ''
                });
            }
        } catch (error) {
            setAlertMessage('Error submitting dependent information. Please try again!');
            setAlertType('error');
        }
    };

    return (
      <>
      <div className={styles.pageContainer}>
          <form onSubmit={handleSubmit} className={styles.dependentsForm}>
              <h2>Dependents Information</h2>

              {alertMessage && (
                  <div className={`${styles.alert} ${alertType === 'success' ? styles.success : styles.error}`}>
                      {alertMessage}
                  </div>
              )}

              <div className={styles.formGroup}>
                  <label>Name:</label>
                  <input
                      type="text"
                      name="name"
                      value={dependent.name}
                      onChange={handleChange}
                      required
                  />
              </div>

              <div className={styles.formGroup}>
                  <label>Relationship:</label>
                  <input
                      type="text"
                      name="relationship"
                      value={dependent.relationship}
                      onChange={handleChange}
                      required
                  />
              </div>

              <div className={styles.formGroup}>
                  <label>Age:</label>
                  <input
                      type="number"
                      name="age"
                      value={dependent.age}
                      onChange={handleChange}
                      required
                  />
              </div>

              <h4>Address Information</h4>
              <div className={styles.formGroup}>
                  <label>Address:</label>
                  <input
                      type="text"
                      name="address"
                      value={dependent.address}
                      onChange={handleChange}
                      required
                  />
              </div>

              <h4>Health Information</h4>
              <div className={styles.formGroup}>
                  <label>Do they have any chronic illness?</label>
                  <select
                      name="chronicIllness"
                      value={dependent.chronicIllness}
                      onChange={handleChange}
                      required
                  >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                  </select>
              </div>

              {dependent.chronicIllness === 'Yes' && (
                  <div className={styles.formGroup}>
                      <label>Details of Chronic Illness:</label>
                      <textarea
                          name="chronicIllnessDetails"
                          value={dependent.chronicIllnessDetails}
                          onChange={handleChange}
                          required
                      />
                  </div>
              )}

              <div className={styles.formGroup}>
                  <label>Any allergies?</label>
                  <textarea
                      name="allergies"
                      value={dependent.allergies}
                      onChange={handleChange}
                      required
                  />
              </div>

              <div className={styles.formGroup}>
                  <label>Current Medications:</label>
                  <textarea
                      name="medications"
                      value={dependent.medications}
                      onChange={handleChange}
                      required
                  />
              </div>

              <h4>Emergency Contact</h4>
              <div className={styles.formGroup}>
                  <label>Emergency Contact Name:</label>
                  <input
                      type="text"
                      name="emergencyContactName"
                      value={dependent.emergencyContactName}
                      onChange={handleChange}
                      required
                  />
              </div>

              <div className={styles.formGroup}>
                  <label>Emergency Contact Phone:</label>
                  <input
                      type="tel"
                      name="emergencyContactPhone"
                      value={dependent.emergencyContactPhone}
                      onChange={handleChange}
                      required
                  />
              </div>

              <button type="submit" className={styles.submitButton}>
                  Submit Dependents Information
              </button>
          </form>
      </div>
      </>
    );
};

export default DependentsForm;
