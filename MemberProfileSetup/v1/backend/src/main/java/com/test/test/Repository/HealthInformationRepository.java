package com.test.test.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HealthInformationRepository extends JpaRepository<com.test.test.Entity.HealthInformation, Long> {
}
