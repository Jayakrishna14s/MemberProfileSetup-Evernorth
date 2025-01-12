package com.test.test.Repository;

import com.test.test.Entity.PaymentInformation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentInformationRepository extends JpaRepository<PaymentInformation, Long> {
    // This will work with Long as the primary key (id)
}
