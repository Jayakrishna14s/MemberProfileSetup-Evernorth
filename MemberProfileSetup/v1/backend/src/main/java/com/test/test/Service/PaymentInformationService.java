package com.test.test.Service;

import com.test.test.Entity.PaymentInformation;
import com.test.test.Repository.PaymentInformationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentInformationService {

    @Autowired
    private PaymentInformationRepository paymentInformationRepository;

    public PaymentInformation savePaymentInformation(PaymentInformation paymentInformation) {
        return paymentInformationRepository.save(paymentInformation);
    }
}

