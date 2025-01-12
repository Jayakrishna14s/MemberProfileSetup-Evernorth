import React, { useState, useEffect } from "react";
import styles from "./UserPage.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Headernox from "./Headernox";
import Footer from "../login/Footer";
import Locate from "../Userdb/Locate";
import { BACKEND_URL } from "../config";

const UserSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [locations, setLocations] = useState([]); // State for search results
  const navigate = useNavigate();

  // Fetch profile details as soon as the component mounts
  useEffect(() => {
    const storedName = localStorage.getItem("name");
    const storedEmail = localStorage.getItem("email");
    const storedPhone = localStorage.getItem("phone");

    if (storedName && storedEmail && storedPhone) {
      setName(storedName);
      setEmail(storedEmail);
      setMobile(storedPhone);
    } else {
      // Call the API to fetch details if not found in local storage
      const membershipId = localStorage.getItem("membershipId");
      if (membershipId) {
        fetchProfileDetails(membershipId);
      } else {
        setError("Membership ID is missing");
      }
    }

    // Set default locations (maps will display by default)
    setLocations([
      { lat: 28.6139, lng: 77.209, name: "Delhi" }, // Sample location
      { lat: 22.5726, lng: 88.3639, name: "Kolkata" }, // Another sample location
    ]);
  }, []);

  // Function to fetch profile details
  const fetchProfileDetails = async (membershipId) => {
    if (!membershipId) {
      setError("Membership ID is required.");
      return;
    }

    try {
      const response = await axios.get(
        BACKEND_URL + "/api/auth/customer-details",
        {
          params: { membershipId },
        }
      );

      console.log("API Response:", response.data);

      if (response.status === 200) {
        const customer = response.data;

        // Set state with API response or fallback values
        setName(customer.name || "Unknown User");
        setEmail(customer.email || "Unknown Email");
        setMobile(customer.phone || "Unknown Phone");
        setSuccess("Profile fetched successfully.");

        // Store data in local storage
        localStorage.setItem("name", customer.name || "Unknown User");
        localStorage.setItem("email", customer.email || "Unknown Email");
        localStorage.setItem("phone", customer.phone || "Unknown Phone");

        console.log("Stored in Local Storage:", {
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
        });
      } else {
        setError("Failed to fetch profile: Invalid response status.");
      }
    } catch (err) {
      setError("Error fetching profile. Please check the API.");
      console.error("Error:", err.message || err);
    }
  };

  // Function to simulate searching for medicines, hospitals, and diagnostic centers
  const handleSearch = async () => {
    // Placeholder logic for search, based on user input (this can be an API call)
    if (searchQuery.toLowerCase() === "dolo650") {
      setLocations([{ lat: 28.6139, lng: 77.209, name: "Dolo650 Location" }]); // Sample coordinates for Dolo650
    } else if (searchQuery.toLowerCase() === "hospital") {
      setLocations([{ lat: 22.5726, lng: 88.3639, name: "Care Hospital" }]); // Sample coordinates for Hospital
    } else {
      setLocations([]); // Reset if no matches
    }
  };

  const sendOtp = async () => {
    try {
      // Get email from local storage
      const storedEmail = localStorage.getItem("email");

      if (!storedEmail) {
        setError("No email found in local storage");
        return; // Stop execution if no email is found
      }

      // Send OTP only after clicking "My Profile" button
      await axios.post(BACKEND_URL + "/api/auth/send-otp", {
        email: storedEmail,
      }); // Use email from localStorage
      navigate("/validate-otp");
    } catch (err) {
      setError("Error sending OTP. Please try again.");
      console.error("Error:", err.message || err);
    }
  };

  return (
    <>
      <Headernox />
      <div className={styles.PageContainer}>
        <div className={styles.userPageContainer}>
          <div className={styles.userHeader}>
            <h1>Hello, {name || "User"}</h1>{" "}
            {/* Greet the user with dynamic name */}
            <p>Welcome to your Dashboard</p>
          </div>

          <div className={styles.userActions}>
            <button onClick={sendOtp} className={styles.profileBtn}>
              My Profile
            </button>
          </div>
        </div>

        {/* Search Inputs */}
        <div className={styles.searchSection}>
          <input
            type="text"
            placeholder="Enter medicine, hospital, or diagnostic center"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update the query
            className={styles.searchInput}
          />
          <button onClick={handleSearch} className={styles.searchButton}>
            Search
          </button>
        </div>

        {/* Display the search results below */}
        {locations.length > 0 && (
          <div className={styles.mapSection}>
            {/* Display the Locate component, pass locations as props */}
            <div className={styles.maps}>
              <Locate locations={locations} />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default UserSection;
