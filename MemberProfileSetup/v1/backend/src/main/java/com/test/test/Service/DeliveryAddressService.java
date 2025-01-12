package com.test.test.Service;

import com.test.test.Entity.DeliveryAddressInformation;
import com.test.test.Repository.DeliveryAddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DeliveryAddressService {

    @Autowired
    private DeliveryAddressRepository deliveryAddressRepository;

    public boolean saveDeliveryAddress(DeliveryAddressInformation deliveryAddress) {
        try {
            deliveryAddressRepository.save(deliveryAddress);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}

