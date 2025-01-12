package com.test.test.Service;

import com.test.test.Entity.SecurityInformation;
import com.test.test.Repository.SecurityInformationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class SecurityInformationService {

    @Autowired
    private SecurityInformationRepository repository;

    // Create an instance of BCryptPasswordEncoder
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // Method to save security information and hash the password
    public SecurityInformation saveSecurityInformation(SecurityInformation securityInformation) {
        // Hash the password before saving
        String hashedPassword = passwordEncoder.encode(securityInformation.getPassword());
        securityInformation.setPassword(hashedPassword);

        // Save to the database
        return repository.save(securityInformation);
    }

    public boolean validateUser(String membershipId, String password) {
        return repository.findByMembershipIdAndPassword(membershipId, password).isPresent();
    }
}
