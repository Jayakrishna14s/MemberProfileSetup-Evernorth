package com.test.test.Service;

import com.test.test.Entity.DependentsInformation;
import com.test.test.Repository.DependentsInformationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DependentsInformationService {

    private final DependentsInformationRepository dependentsInformationRepository;

    @Autowired
    public DependentsInformationService(DependentsInformationRepository dependentsInformationRepository) {
        this.dependentsInformationRepository = dependentsInformationRepository;
    }

    public boolean saveDependentsInformation(DependentsInformation dependentsInformation) {
        try {
            dependentsInformationRepository.save(dependentsInformation);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
