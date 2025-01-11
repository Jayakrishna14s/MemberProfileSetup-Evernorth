import React, { useState, useRef } from 'react';
import './chatbot.css'; // Assuming your CSS file is named chatbot.css

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentStep, setCurrentStep] = useState(null);
    const [selectedPolicyType, setSelectedPolicyType] = useState(null);
    const [selectedOperation, setSelectedOperation] = useState(null);
    const chatBodyRef = useRef(null);
    const [chatVisible, setChatVisible] = useState(false); // State to manage chat visibility

    const submitQuery = () => {
        const trimmedInput = userInput.trim();
        if (trimmedInput === "") return;

        setMessages((prevMessages) => [
            ...prevMessages,
            { text: trimmedInput, type: 'user' }
        ]);

        if (trimmedInput.toLowerCase() === 'back') {
            restartConversation();
            return;
        }

        let botResponse = "";

        if (isLoggedIn) {
            switch (currentStep) {
                case null:
                    botResponse = "Hello there!, Please enter your MembershipId for the better communication!!";
                    setCurrentStep("insuranceType");
                    break;

                case "insuranceType":
                    botResponse = "Here are your policy details!";
                    displayPolicyDetails();
                    setCurrentStep("operation");
                default:
                    break;
            }
        } else {
            botResponse = "Please login first to discuss.";
            openLoginPopup(); // Open login popup
        }

        setMessages((prevMessages) => [
            ...prevMessages,
            { text: botResponse, type: 'bot' }
        ]);

        setUserInput("");
        scrollToBottom();
    };

    const validatePolicyID = (policyID) => {
        return policyID.length === 5 && policyID.startsWith('HP');
    };

    const displayPolicyDetails = () => {
        const policyDetails = `
            Username : Uday<br>
            User Email : makineni.uday@gmail.com <br>
            User Contact : 9391653036<br>
        `;
        addBotMessage(policyDetails);
    };

    const displayFullPolicyDetails = () => {
        const fullDetails = `
            Policy Status: Active<br>
            Policy Type: ${capitalizeFirstLetter(selectedPolicyType)}<br>
            Coverage Amount: $100,000<br>
            Claim Limit: $20,000<br>
            Start Date: 01-Jan-2022<br>
            End Date: 01-Jan-2027<br>
            Agent ID: 12345<br>
            Agent Email: agent@example.com<br>
            Mobile Number: 9876543210<br>
            Payment Frequency: Monthly<br>
            Sub Policy Type: Individual<br>
            User Email: user@example.com
        `;
        addBotMessage(fullDetails);
    };

    const displayUpdatedPolicyDetails = (newValue) => {
        const updatedDetails = `
            Policy Status: Active<br>
            Policy Type: ${capitalizeFirstLetter(selectedPolicyType)}<br>
            Coverage Amount: $100,000<br>
            Claim Limit: $20,000<br>
            Start Date: 01-Jan-2022<br>
            End Date: 01-Jan-2027<br>
            Agent ID: 12345<br>
            Agent Email: john@gmail.com (Updated)<br>
            Mobile Number: 9876543210<br>
            Payment Frequency: Monthly<br>
            Sub Policy Type: Individual<br>
            User Email: user@example.com
        `;
        addBotMessage(updatedDetails);
    };

    const restartConversation = () => {
        addBotMessage("Please select your insurance type: Health, Life, Motor, Travel");
        setCurrentStep("insuranceType");
        setSelectedPolicyType(null);
        setSelectedOperation(null);
        setUserInput(""); // Clear input
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };

    const addBotMessage = (message) => {
        setMessages((prevMessages) => [
            ...prevMessages,
            { text: message, type: 'bot' }
        ]);
        scrollToBottom();
    };

    const scrollToBottom = () => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    };

    const handleInputChange = (e) => {
        setUserInput(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            submitQuery();
        }
    };

    const [loginVisible, setLoginVisible] = useState(false);

    const openLoginPopup = () => {
        setLoginVisible(true);
    };

    const closeLoginPopup = () => {
        setLoginVisible(false);
    };

    const login = () => {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username.trim()==="user" && password.trim()==="user") {
            setIsLoggedIn(true);
            closeLoginPopup();
            addBotMessage("Login successful. You may now continue your query.");
            setCurrentStep(null); // Reset to start flow
            submitQuery(); // Start from the first step (insurance type)
        } else {
            alert('Please enter valid username and password.');
        }
    };

    return (
        <div className="chatbot-wrapper">
            {/* Chatbot icon */}
            <div className="chatbot-icon" onClick={() => setChatVisible(!chatVisible)}>
                💬
            </div>

            {/* Chat container */}
            {chatVisible && (
            
            <div className="chat-container">
            <div className="chat-header">
                 MutualBot
                <button 
                    className="close-btn" 
                    onClick={() => setChatVisible(false)} 
                    aria-label="Close chat"
                >
                    ✖
                </button>
            </div>
            <div className="chat-body" ref={chatBodyRef}>
                {messages.map((msg, index) => (
                    <div key={index} className={`${msg.type}-message`}>
                        <div dangerouslySetInnerHTML={{ __html: msg.text }} />
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    value={userInput}
                    placeholder="Type your query..."
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                />
                <button onClick={submitQuery}>Send</button>
            </div>
        </div>
        
            )
            }

            {/* Login Popup */}
            {loginVisible && (
                <div className="login-popup">
                    <div className="login-content">
                        <h2>Login</h2>
                        <input type="text" id="username" placeholder="Username" />
                        <input type="password" id="password" placeholder="Password" />
                        <button onClick={login}>Login</button>
                        <button onClick={closeLoginPopup}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;