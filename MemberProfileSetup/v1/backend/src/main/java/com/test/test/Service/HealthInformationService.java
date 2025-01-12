package com.test.test.Service;


import com.test.test.Entity.HealthInformation;
import com.test.test.Repository.HealthInformationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HealthInformationService {

    @Autowired
    private HealthInformationRepository healthInformationRepository;

    public boolean saveHealthInformation(HealthInformation healthInformation) {
        try {
            healthInformationRepository.save(healthInformation);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
