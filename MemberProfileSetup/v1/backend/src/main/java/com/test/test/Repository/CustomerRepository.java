package com.test.test.Repository;

import com.test.test.Entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    long count(); // Returns the count of customers in the table
    Optional<Customer> findByMembershipId(String membershipId);
    Optional<Customer> findByEmail(String email);
}
