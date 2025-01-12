package com.test.test.Repository;

import com.test.test.Entity.ContactInformation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactInformationRepository extends JpaRepository<ContactInformation, Long> {
    // You can add custom queries here if needed
    ContactInformation findByMembershipId(String membershipId);
}
