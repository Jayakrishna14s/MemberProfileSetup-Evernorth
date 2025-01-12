package com.test.test.Entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "dependent_information")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DependentInformation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;  // Auto-generated id

    private String name;
    private String relationship;
    private Integer age;
    private String address;
    private String healthCondition;
    private String chronicIllness;
    private String chronicIllnessDetails;
    private String allergies;
    private String medications;
    private String emergencyContactName;
    private String emergencyContactPhone;

    private String membershipId; // This is the reference to the membership
}
