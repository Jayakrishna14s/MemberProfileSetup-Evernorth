package com.test.test.Entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "payment_information")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentInformation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Auto-generated ID

    private String membershipId; // The membershipId that links to the user or account
    private String cardHolderName;
    private String cardNumber;
    private String expirationDate;
    private String cvv;
    private String debitCardHolderName;
    private String debitCardNumber;
    private String upiId;
}
