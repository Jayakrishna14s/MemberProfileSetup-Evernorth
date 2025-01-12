package com.test.test.Service;

import com.test.test.Entity.DependentInformation;
import com.test.test.Repository.DependentInformationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DependentInformationService {

    @Autowired
    private DependentInformationRepository dependentInformationRepository;

    public DependentInformation saveDependentInformation(DependentInformation dependentInformation) {
        return dependentInformationRepository.save(dependentInformation);
    }
}
