package com.test.test.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data
@Table(name = "dependents_information")
@AllArgsConstructor
@NoArgsConstructor
public class DependentsInformation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String relationship;
    private int age;
    private String address;
    private String healthCondition;
    private String chronicIllness;
    private String chronicIllnessDetails;
    private String allergies;
    private String medications;
    private String emergencyContactName;
    private String emergencyContactPhone;
    private String membershipId;
}
