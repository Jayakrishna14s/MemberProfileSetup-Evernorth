package com.test.test.Controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Random;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.test.test.DTO.CustomerDetailsResponse;
import com.test.test.Entity.ContactInformation;
import com.test.test.Entity.Customer;
import com.test.test.Entity.DeliveryAddressInformation;
import com.test.test.Entity.DependentInformation;
import com.test.test.Entity.HealthInformation;
import com.test.test.Entity.PaymentInformation;
import com.test.test.Entity.PrimaryUser;
import com.test.test.Entity.SecurityInformation;
import com.test.test.Repository.ContactInformationRepository;
import com.test.test.Repository.CustomerRepository;
import com.test.test.Service.ContactInformationService;
import com.test.test.Service.CustomerService;
import com.test.test.Service.DeliveryAddressService;
import com.test.test.Service.DependentInformationService;
import com.test.test.Service.EmailService;
import com.test.test.Service.HealthInformationService;
import com.test.test.Service.PaymentInformationService;
import com.test.test.Service.PrimaryUserService;
import com.test.test.Service.SecurityInformationService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class PrimaryUserController {

    @Autowired
    private PrimaryUserService primaryUserService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private ContactInformationService contactInformationService;

    @Autowired
    private ContactInformationRepository contactInformationRepository;

    @Autowired
    private DeliveryAddressService deliveryAddressService;

    @Autowired
    private HealthInformationService healthInformationService;

    @Autowired
    private PaymentInformationService paymentInformationService;

    @Autowired
    private SecurityInformationService securityInformationService;

    @Autowired
    private DependentInformationService dependentInformationService;

    @Autowired
    private CustomerService customerService;

    @Autowired
    private CustomerRepository customerRepository;

    @PostMapping("/dependent-information")
    public ResponseEntity<String> saveDependentInformation(@RequestBody DependentInformation dependentInformation) {
        try {
            // Save the dependent information to the database
            dependentInformationService.saveDependentInformation(dependentInformation);
            return ResponseEntity.ok("Dependent Information saved successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to save dependent information.");
        }
    }

    // Endpoint to save security information
    @PostMapping("/security-information")
    public String saveSecurityInformation(@RequestBody SecurityInformation securityInformation) {
        // Save the security information and hash the password
        SecurityInformation savedInfo = securityInformationService.saveSecurityInformation(securityInformation);

        // Return a success message
        return "Security information saved successfully!";
    }

    @PostMapping("/payment-information")
    public ResponseEntity<String> submitPaymentInformation(@RequestBody PaymentInformation paymentInformation) {
        try {
            // Save the payment information in the database
            paymentInformationService.savePaymentInformation(paymentInformation);
            return new ResponseEntity<>("Payment information submitted successfully!", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error submitting payment information.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/health-information")
    public String submitHealthInformation(@RequestBody HealthInformation healthInformation) {
        if (healthInformationService.saveHealthInformation(healthInformation)) {
            return "Health information submitted successfully!";
        } else {
            return "Failed to submit health information.";
        }
    }

    @PostMapping("/delivery-submit")
    public ResponseEntity<String> submitAddress(@RequestBody DeliveryAddressInformation deliveryAddress) {
        boolean isSaved = deliveryAddressService.saveDeliveryAddress(deliveryAddress);

        if (isSaved) {
            return ResponseEntity.ok("Address submitted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to submit address.");
        }
    }

    @PostMapping("/contact")
    public String submitContactForm(@RequestBody ContactInformation contactInformation) {
        contactInformationService.saveContactInfo(contactInformation);
        return "Contact information saved successfully!";
    }

    @GetMapping("/contact/{membershipId}")
    public ContactInformation getContactInfo(@PathVariable String membershipId) {
        return contactInformationService.getContactInfo(membershipId);
    }
    @PutMapping("/contact/{membershipId}")
    public ResponseEntity<ContactInformation> updateContactInformation(
            @PathVariable String membershipId,
            @RequestBody ContactInformation contactInformation) {

        // Find the contact information by membershipId
        Optional<ContactInformation> existingContact = Optional.ofNullable(contactInformationRepository.findByMembershipId(membershipId));

        if (existingContact.isPresent()) {
            ContactInformation updatedContact = existingContact.get();

            // Update the fields (assuming fields in your form match the entity)
            updatedContact.setFirstName(contactInformation.getFirstName());
            updatedContact.setLastName(contactInformation.getLastName());
            updatedContact.setEmail(contactInformation.getEmail());
            updatedContact.setPhone(contactInformation.getPhone());
            updatedContact.setAddress(contactInformation.getAddress());
            updatedContact.setCity(contactInformation.getCity());
            updatedContact.setState(contactInformation.getState());
            updatedContact.setZip(contactInformation.getZip());
            updatedContact.setCountry(contactInformation.getCountry());
            updatedContact.setEmergencyContactName(contactInformation.getEmergencyContactName());
            updatedContact.setEmergencyContactPhone(contactInformation.getEmergencyContactPhone());

            // Save the updated contact information
            ContactInformation savedContact = contactInformationRepository.save(updatedContact);

            return ResponseEntity.ok(savedContact);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    private final Map<String, String> otpStore = new HashMap<>();
    private static final Map<String, Long> otpExpiryStore = new HashMap<>();
    private static final long OTP_EXPIRY_TIME = TimeUnit.MINUTES.toMillis(5);

    @PostMapping("/users")
    public ResponseEntity<PrimaryUser> createUser(@RequestBody PrimaryUser primaryUser) {
        PrimaryUser savedUser = primaryUserService.saveUser(primaryUser);
        String membershipId = savedUser.getMembershipId();

        // Generate OTP and store it in otpStor

        // Send OTP email
        String profileSetupLink = System.getenv("FRONTEND_URL") + "/signuppage";
        String emailSubject = "Signup to Evernorth Health Services";
        String emailBody = "To initilaize your profile setup, visit the following link:\n" + profileSetupLink;

        // Send email
        emailService.sendEmail(primaryUser.getEmail(), emailSubject, emailBody);

        // Return the saved user and a message indicating OTP has been sent
        return ResponseEntity.ok(savedUser);
    }

    @PostMapping("/send-otp")
    public ResponseEntity<String> sendOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        try {
            // Generate OTP
            String otp = String.valueOf((int)(Math.random() * 9000) + 1000); // 4-digit OTP

            // Store OTP and expiry (5 minutes)
            otpStore.put(email, otp);
            otpExpiryStore.put(email, System.currentTimeMillis() + (5 * 60 * 1000));

            // Send OTP via email (use an email service here)
            emailService.sendEmail(email, "Your OTP Code", "Your OTP is: " + otp);

            return ResponseEntity.ok("OTP sent successfully to " + email);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error sending OTP: " + e.getMessage());
        }
    }


    @GetMapping("/account-creation")
    public ResponseEntity<String> requestOtp(@RequestParam String membershipid) {
        if (otpStore.containsKey(membershipid)) {
            return ResponseEntity.ok("OTP has been sent to your registered email.");
        }
        return ResponseEntity.badRequest().body("Invalid membership ID.");
    }

    @GetMapping("/customer-details")
    public ResponseEntity<?> getCustomerDetails(@RequestParam("membershipId") String membershipId) {
        try {
            Optional<Customer> customerOpt = customerRepository.findByMembershipId(membershipId);

            if (customerOpt.isPresent()) {
                Customer customer = customerOpt.get();
                // Return DTO with email and phone
                CustomerDetailsResponse response = new CustomerDetailsResponse(customer.getName(),customer.getEmail(), customer.getPhone());
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(404).body("Customer not found with Membership ID: " + membershipId);
            }

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<String> verifyOtp(@RequestParam("membershipId") String membershipId, @RequestParam("otp") String otp) {
        try {
            // Check if OTP exists and is within expiry time
            if (otpStore.containsKey(membershipId) && otpStore.get(membershipId).equals(otp)) {
                long expiryTime = otpExpiryStore.get(membershipId);
                if (System.currentTimeMillis() <= expiryTime) {
                    // OTP is valid, proceed to profile setup completion
                    otpStore.remove(membershipId);  // Remove OTP after successful verification
                    otpExpiryStore.remove(membershipId);
                    return ResponseEntity.ok("OTP verified successfully. Proceed to complete your profile.");
                } else {
                    return ResponseEntity.status(400).body("OTP has expired.");
                }
            } else {
                return ResponseEntity.status(400).body("Invalid OTP.");
            }
        } catch (Exception e) {
            // Error handling for verification
            return ResponseEntity.status(500).body("Error occurred during OTP verification: " + e.getMessage());
        }
    }

    @PostMapping("/validate-otp")
    public ResponseEntity<String> validateOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String otp = request.get("otp");
        try {
            if (otpStore.containsKey(email) && otpStore.get(email).equals(otp)) {
                long expiryTime = otpExpiryStore.get(email);
                if (System.currentTimeMillis() <= expiryTime) {
                    // OTP is valid
                    otpStore.remove(email); // Remove OTP after validation
                    otpExpiryStore.remove(email);
                    return ResponseEntity.ok("OTP validated successfully.");
                } else {
                    return ResponseEntity.status(400).body("OTP has expired.");
                }
            } else {
                return ResponseEntity.status(400).body("Invalid OTP.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error validating OTP: " + e.getMessage());
        }
    }


    private String generateOtp() {
        Random random = new Random();
        return String.format("%06d", random.nextInt(1000000));
    }

}

// Helper class for OTP verification request
class OtpRequest {
    private String membershipId;
    private String otp;

    // Getters and setters

    public String getMembershipId() {
        return membershipId;
    }

    public void setMembershipId(String membershipId) {
        this.membershipId = membershipId;
    }

    public String getOtp() {
        return otp;
    }

    public void setOtp(String otp) {
        this.otp = otp;
    }
}
