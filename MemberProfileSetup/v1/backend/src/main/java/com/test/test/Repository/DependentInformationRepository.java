package com.test.test.Repository;

import com.test.test.Entity.DependentInformation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DependentInformationRepository extends JpaRepository<DependentInformation, Long> {
    // Additional custom queries can go here if needed
}
