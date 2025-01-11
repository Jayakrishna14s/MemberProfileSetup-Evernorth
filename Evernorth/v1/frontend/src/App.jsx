import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Landing from './landing/Landing.jsx';
import OtpVerification from './landing/otpverification.jsx';
import UserDB from './Userdb/UserDB.jsx';
import ContactForm from './Userdb/ContactForm.jsx';
import PaymentForm from './Userdb/PaymentForm.jsx';
import DeliveryAddressForm from './Userdb/DeliveryAddressForm.jsx';
import HealthConditionForm from './Userdb/HealthConditionForm.jsx';
import DependentsForm from './Userdb/DependentsForm.jsx';
import SecuritySettings from './Userdb/SecuritySettings.jsx';
import LoginForm from './login/Login.jsx';
import Signup from './login/Signup.jsx';
import UserSection from './landing/usersection.jsx';
import OtpValidationPage from './landing/OtpValidationPage.jsx';
import ValidateOtpPage from './landing/OtpValidationPage.jsx';
import EditContactForm from './Userdb/ContactFormEdit.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/account-creation" element={<OtpVerification/>}/>
        <Route path="/user-db" element={<UserDB/>}/>
        <Route path="/contact-form" element={<ContactForm/>}/>
        <Route path="/edit-contact-form" element={<EditContactForm/>}/>
        <Route path="/payment-form" element={<PaymentForm/>}/>
        <Route path="/address-form" element={<DeliveryAddressForm/>}/>
        <Route path="/health-conditions-form" element={<HealthConditionForm/>}/>
        <Route path="/dependencies-form" element={<DependentsForm/>}/>
        <Route path="/security-settings-form" element={<SecuritySettings/>}/>
        <Route path="/loginpage" element={<LoginForm/>}/>
        <Route path="/signuppage" element={<Signup/>}/>
        <Route path="/usersection" element={<UserSection/>}/>
        <Route path="/validate-otp" element={<ValidateOtpPage/>}/>

      </Routes>
    </Router>
  );
}

export default App