package com.test.test.Controller;

import com.test.test.DTO.AuthResponse;
import com.test.test.DTO.LoginRequest;
import com.test.test.DTO.RegisterRequest;
import com.test.test.Entity.Customer;
import com.test.test.Entity.Role;
import com.test.test.Entity.SecurityInformation;
import com.test.test.Entity.User;
import com.test.test.Repository.CustomerRepository;
import com.test.test.Repository.SecurityInformationRepository;
import com.test.test.Repository.UserRepository;
import com.test.test.Service.CustomerService;
import com.test.test.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private SecurityInformationRepository repository;

    @Autowired
    private CustomerService customerService;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;  // Add this for password hashing

    @GetMapping("/login")
    public ResponseEntity<String> login(
            @RequestParam("membershipId") String membershipId,
            @RequestParam("password") String password) {

        System.out.println("Received login request");
        System.out.println("Membership ID: " + membershipId);

        // Find the customer by membership ID
        Optional<Customer> optionalCustomer = customerRepository.findByMembershipId(membershipId);

        if (optionalCustomer.isPresent()) {
            Customer customer = optionalCustomer.get();
            System.out.println("Stored password in DB: " + customer.getPassword());

            // Compare hashed passwords
            if (bCryptPasswordEncoder.matches(password, customer.getPassword())) {
                System.out.println("Login successful");
                return ResponseEntity.ok("Login successful");
            } else {
                System.out.println("Password does not match");
                return ResponseEntity.status(401).body("Invalid password");
            }
        } else {
            System.out.println("No user found with the given Membership ID");
            return ResponseEntity.status(401).body("Invalid Membership ID");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerCustomer(@RequestBody Customer customer) {
        try {
            Customer savedCustomer = customerService.registerCustomer(customer);
            return ResponseEntity.ok("User registered successfully with Membership ID: " + savedCustomer.getMembershipId());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }
}
