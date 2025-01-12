package com.test.test.Repository;

import com.test.test.Entity.SecurityInformation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SecurityInformationRepository extends JpaRepository<SecurityInformation, Long> {

    // You can add custom queries if needed (like finding by membershipId)
    SecurityInformation findByMembershipId(String membershipId);
    Optional<SecurityInformation> findByMembershipIdAndPassword(String membershipId, String password);
}

