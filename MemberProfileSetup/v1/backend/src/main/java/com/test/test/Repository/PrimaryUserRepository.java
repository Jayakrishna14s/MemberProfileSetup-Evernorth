package com.test.test.Repository;

import com.test.test.Entity.PrimaryUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PrimaryUserRepository extends JpaRepository<PrimaryUser, Long> {
    // Additional custom query methods (if needed) can be added here
    Optional<PrimaryUser> findByMembershipId(String membershipId);
}
