package com.test.test.Service;

import com.test.test.DTO.RegisterRequest;
import com.test.test.Entity.Role;
import com.test.test.Entity.User;
import com.test.test.Enum.ERole;
import com.test.test.Repository.RoleRepository;
import com.test.test.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public String registerUser(RegisterRequest registerRequest) {
        // Check if the username already exists
        if (userRepository.findByUsername(registerRequest.getUsername()).isPresent()) {
            throw new RuntimeException("Username is already taken!");
        }

        // Create new user object
        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setEmail(registerRequest.getEmail());
        user.setPhone(registerRequest.getPhone());

        // Assign roles based on the provided role in the request
        Set<Role> roles = new HashSet<>();
        if (registerRequest.getRole().equals("ROLE_AGENT")) {
            Role agentRole = roleRepository.findByName(ERole.ROLE_AGENT)
                    .orElseThrow(() -> new RuntimeException("Role not found"));
            roles.add(agentRole);
        } else if (registerRequest.getRole().equals("ROLE_ADMIN")) {
            Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                    .orElseThrow(()-> new RuntimeException("Role not found"));
            roles.add(adminRole);
        } else {
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Role not found"));
            roles.add(userRole);
        }
        user.setRoles(roles);
        // Save the new user
        userRepository.save(user);
        return "User registered successfully!";
    }
}
