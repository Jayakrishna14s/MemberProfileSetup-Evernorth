import React, { useState, useEffect } from "react";
import {
  FaAddressCard,
  FaCreditCard,
  FaHome,
  FaHeartbeat,
  FaUsers,
  FaLock,
} from "react-icons/fa";
import styles from "./UserDB.module.css";
import Headern from "../landing/Headern";
import Footer from "../login/Footer";
import ContactForm from "./ContactForm";
import PaymentForm from "./PaymentForm";
import DeliveryAddressForm from "./DeliveryAddressForm";
import HealthConditionForm from "./HealthConditionForm";
import DependentsForm from "./DependentsForm";
import SecuritySettings from "./SecuritySettings";
import EditContactForm from "./ContactFormEdit";
import Headernn from "../landing/Headernn";
import Headerno from "../landing/Headerno";
import Headernox from "../landing/Headernox";
import { BACKEND_URL } from "../config";

const UserDB = () => {
  const initialSections = [
    {
      id: 1,
      title: "Contact Information",
      description: "Update your personal contact information.",
      icon: <FaAddressCard />,
      completed:
        JSON.parse(localStorage.getItem("contactinformation")) || false,
    },
    {
      id: 2,
      title: "Payment Methods",
      description: "Manage your saved payment methods securely.",
      icon: <FaCreditCard />,
      completed:
        JSON.parse(localStorage.getItem("paymentinformation")) || false,
    },
    {
      id: 3,
      title: "Delivery Address",
      description: "Set up your preferred delivery locations.",
      icon: <FaHome />,
      completed:
        JSON.parse(localStorage.getItem("deliveryinformation")) || false,
    },
    {
      id: 4,
      title: "Health Conditions",
      description: "Update your health profile and relevant information.",
      icon: <FaHeartbeat />,
      completed:
        JSON.parse(localStorage.getItem("healthconditionsinformation")) ||
        false,
    },
    {
      id: 5,
      title: "Add Dependents",
      description: "Add dependents who are linked to your account.",
      icon: <FaUsers />,
      completed:
        JSON.parse(localStorage.getItem("dependentsinformation")) || false,
    },
    {
      id: 6,
      title: "Security Settings",
      description: "Manage your account passwords including 2FA.",
      icon: <FaLock />,
      completed:
        JSON.parse(localStorage.getItem("securityinformation")) || false,
    },
  ];

  const [sections, setSections] = useState(initialSections);
  const [selectedTab, setSelectedTab] = useState(initialSections[0].id); // Track the selected tab

  // Callback function for updating section completion status
  const markSectionAsCompleted = (id) => {
    let updatedSections = sections.map((section) => {
      if (section.id === id) {
        section.completed = true;
        // Update localStorage only when the section is marked as completed
        switch (id) {
          case 1:
            localStorage.setItem("contactinformation", "true");
            break;
          case 2:
            localStorage.setItem("paymentinformation", "true");
            break;
          case 3:
            localStorage.setItem("deliveryinformation", "true");
            break;
          case 4:
            localStorage.setItem("healthconditionsinformation", "true");
            break;
          case 5:
            localStorage.setItem("dependentsinformation", "true");
            break;
          case 6:
            localStorage.setItem("securityinformation", "true");
            break;
          default:
            break;
        }
      }
      return section;
    });
    setSections(updatedSections); // Ensure state is updated immediately
  };

  const renderForm = () => {
    switch (selectedTab) {
      case 1:
        if (sections[0].completed) {
          return <EditContactForm />;
        }
        return (
          <ContactForm markAsCompleted={() => markSectionAsCompleted(1)} />
        );
      case 2:
        return (
          <PaymentForm markAsCompleted={() => markSectionAsCompleted(2)} />
        );
      case 3:
        return (
          <DeliveryAddressForm
            markAsCompleted={() => markSectionAsCompleted(3)}
          />
        );
      case 4:
        return (
          <HealthConditionForm
            markAsCompleted={() => markSectionAsCompleted(4)}
          />
        );
      case 5:
        return (
          <DependentsForm markAsCompleted={() => markSectionAsCompleted(5)} />
        );
      case 6:
        return (
          <SecuritySettings markAsCompleted={() => markSectionAsCompleted(6)} />
        );
      default:
        return (
          <ContactForm markAsCompleted={() => markSectionAsCompleted(1)} />
        );
    }
  };

  return (
    <>
      <Headernox />
      <div className={styles.dbcontainer}>
        <h2 className={styles.dbheader}>Member Profile Setup Page</h2>
        <p className={styles.description}>
          Complete each section to ensure your profile is up-to-date.
        </p>
        <div className={styles.tabsContainer}>
          <div className={styles.tabsColumn}>
            {sections.map((section) => (
              <div
                key={section.id}
                className={`${styles.tab} ${
                  selectedTab === section.id ? styles.selectedTab : ""
                }`}
                onClick={() => setSelectedTab(section.id)}
              >
                <div className={styles.iconContainer}>{section.icon}</div>
                <h3>{section.title}</h3>
                <p>{section.description}</p>
                <p className={styles.status}>
                  Status:{" "}
                  <span
                    className={
                      section.completed
                        ? styles.statusCompleted
                        : styles.statusUncompleted
                    }
                  >
                    {section.completed ? "Completed" : "Uncompleted"}
                  </span>
                </p>
                <button
                  onClick={() => setSelectedTab(section.id)}
                  className={styles.dbbutton}
                >
                  {section.completed ? "Edit Section" : "Complete Section"}
                </button>
              </div>
            ))}
          </div>

          <div className={styles.formContainer}>
            {/* Render the corresponding form based on the selected tab */}
            {renderForm()}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserDB;
