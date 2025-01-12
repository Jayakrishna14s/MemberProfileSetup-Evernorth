package com.test.test.Repository;

import com.test.test.Entity.DeliveryAddressInformation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeliveryAddressRepository extends JpaRepository<DeliveryAddressInformation, Long> {
    // You can add custom queries here if needed
}

