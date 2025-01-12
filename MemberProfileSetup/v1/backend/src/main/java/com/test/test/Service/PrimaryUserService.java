package com.test.test.Service;


import com.test.test.Entity.PrimaryUser;
import java.util.List;
import java.util.Optional;

public interface PrimaryUserService {
    PrimaryUser saveUser(PrimaryUser primaryUser);
    List<PrimaryUser> getAllUsers();
    Optional<PrimaryUser> getUserById(Long id);
    PrimaryUser updateUser(Long id, PrimaryUser primaryUser);
    void deleteUser(Long id);
    PrimaryUser getUserByMembershipId(String membershipId);
    public void saveOtpForUser(Long userId, String otp);
    public boolean verifyOtp(Long userId, String otp);
}
