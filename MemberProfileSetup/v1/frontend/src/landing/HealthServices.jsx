import React from "react";
import { BACKEND_URL } from "../config";

const HealthServicesSection = () => {
  return (
    <div style={styles.container}>
      <div style={styles.headerContainer}>
        <div style={styles.headerLeft}>
          <h2 style={styles.headerTitle}>
            Reimagining health services to make the health care system work
            better and make your members healthier
          </h2>
        </div>
        <div style={styles.headerRight}>
          <p style={styles.headerDescription}>
            Our capabilities work seamlessly together to create innovative
            pharmacy, care and benefit solutions for today and tomorrow. We’ve
            designed them to work together in new and expanded ways to better
            anticipate and deliver what you need.
          </p>
        </div>
      </div>

      <div style={styles.servicesContainer}>
        <ServiceItem
          icon="💊" // Replace with the actual icon or use an <img> tag for an image
          title="Pharmacy"
          description="Get specialized solutions to treat general and complex conditions—personalized to you and meaningful to your members."
        />
        <ServiceItem
          icon="💲" // Replace with the actual icon or use an <img> tag for an image
          title="Benefits Management"
          description="Save costs with personalized pharmacy and medical solutions that are built to work with you and for you."
        />
        <ServiceItem
          icon="💚" // Replace with the actual icon or use an <img> tag for an image
          title="Care"
          description="Elevate employee productivity, quality of life, and whole-person health, with accessible behavioral and clinical care."
        />
      </div>
    </div>
  );
};

const ServiceItem = ({ icon, title, description }) => (
  <div style={styles.serviceItem}>
    <div style={styles.icon}>{icon}</div>
    <h3 style={styles.serviceTitle}>{title}</h3>
    <p style={styles.serviceDescription}>{description}</p>
  </div>
);

const styles = {
  container: {
    padding: "40px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f8f9fa",
  },
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "40px",
  },
  headerLeft: {
    flex: 1,
    paddingRight: "20px",
  },
  headerRight: {
    flex: 1,
    paddingLeft: "20px",
  },
  headerTitle: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#333",
    lineHeight: "1.2",
  },
  headerDescription: {
    fontSize: "1rem",
    color: "#555",
    lineHeight: "1.5",
  },
  servicesContainer: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "40px",
  },
  serviceItem: {
    flex: 1,
    textAlign: "center",
    padding: "20px",
  },
  icon: {
    fontSize: "3rem",
    color: "#00e8a0", // Adjust color as needed
    marginBottom: "10px",
  },
  serviceTitle: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "10px",
  },
  serviceDescription: {
    fontSize: "1rem",
    color: "#555",
    lineHeight: "1.5",
  },
};

export default HealthServicesSection;
