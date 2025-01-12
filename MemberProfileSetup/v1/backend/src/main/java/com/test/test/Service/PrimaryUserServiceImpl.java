package com.test.test.Service;

import com.test.test.Entity.PrimaryUser;
import com.test.test.Repository.PrimaryUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PrimaryUserServiceImpl implements PrimaryUserService {

    @Autowired
    private PrimaryUserRepository primaryUserRepository;

    @Override
    public PrimaryUser saveUser(PrimaryUser primaryUser) {
        // Generate a new membershipId by counting the total users and adding 1
        long userCount = primaryUserRepository.count();
        String generatedMembershipId = "M" + (userCount + 1);
        primaryUser.setMembershipId(generatedMembershipId);

        // Save the user to the database
        return primaryUserRepository.save(primaryUser);
    }

    @Override
    public List<PrimaryUser> getAllUsers() {
        return primaryUserRepository.findAll();
    }

    @Override
    public Optional<PrimaryUser> getUserById(Long id) {
        return primaryUserRepository.findById(id);
    }

    @Override
    public PrimaryUser updateUser(Long id, PrimaryUser primaryUser) {
        return primaryUserRepository.findById(id)
                .map(existingUser -> {
                    existingUser.setEmail(primaryUser.getEmail());
                    existingUser.setPhone(primaryUser.getPhone());
                    return primaryUserRepository.save(existingUser);
                })
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }

    @Override
    public void deleteUser(Long id) {
        primaryUserRepository.deleteById(id);
    }

    public PrimaryUser getUserByMembershipId(String membershipId) {
        Optional<PrimaryUser> user = primaryUserRepository.findByMembershipId(membershipId);
        return user.orElse(null);
    }

    // Method to save OTP for user (implementation depends on where you're saving OTPs)
    public void saveOtpForUser(Long userId, String otp) {
        // Example: Save OTP to database or temporary storage
        // Could involve updating user record, storing OTP in cache, etc.
    }

    // Method to verify OTP (adjust logic based on your storage strategy)
    public boolean verifyOtp(Long userId, String otp) {
        // Check if OTP is correct for the user
        // Logic here depends on your OTP storage implementation
        return true; // Replace with actual verification
    }
}
