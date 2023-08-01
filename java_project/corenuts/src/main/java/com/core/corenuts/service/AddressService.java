package com.core.corenuts.service;

import com.core.corenuts.entity.Address;
import com.core.corenuts.repo.AddressRepo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class AddressService {
    @Autowired
    private AddressRepo addressRepo;

    public Address saveAddress(Address address) {
        Address savedAddress = addressRepo.save(address);
        log.info("Address successfully saved:{}", address);
        return savedAddress;
    }

    public void deleteAddressById(int addressId) {
        addressRepo.deleteById(addressId);
        log.info("address with id {} deleted successfully", addressId);
    }

    public List<Address> findAddresses() {
        List<Address> addresses = addressRepo.findAll();
        log.info("addresses:{}", addresses);
        return addresses;
    }

    public Address findAddressById(int addressId) {
        Optional<Address> address = addressRepo.findById(addressId);
        if (address.isPresent()) {
            log.info("address with id {} fetched successfully:{}", addressId, address);
            return address.get();
        }
        return null;
    }

}
