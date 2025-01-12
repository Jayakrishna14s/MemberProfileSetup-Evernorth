package com.test.test.Service;

import com.test.test.Entity.ContactInformation;
import com.test.test.Entity.Customer;
import com.test.test.Repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;  // Add this for password hashing

    public Customer registerCustomer(Customer customer) {
        // Generate membership ID dynamically
        long customerCount = customerRepository.count();
        String membershipId = "ENCG" + (customerCount + 1);
        customer.setMembershipId(membershipId);

        // Hash the password before saving
        String hashedPassword = bCryptPasswordEncoder.encode(customer.getPassword());
        customer.setPassword(hashedPassword);

        // Save the customer to the database
        return customerRepository.save(customer);
    }
}
