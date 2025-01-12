package com.test.test.Service;

import com.test.test.Entity.ContactInformation;
import com.test.test.Repository.ContactInformationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContactInformationService {

    @Autowired
    private ContactInformationRepository contactInformationRepository;

    public ContactInformation saveContactInfo(ContactInformation contactInformation) {
        return contactInformationRepository.save(contactInformation);
    }

    public ContactInformation getContactInfo(String membershipId) {
        return contactInformationRepository.findByMembershipId(membershipId);
    }
}
