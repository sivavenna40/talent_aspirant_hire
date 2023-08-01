package com.core.corenuts.controller;

import com.core.corenuts.entity.Address;
import com.core.corenuts.service.AddressService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController()
@RequestMapping("/address")
public class AddressController {

    @Autowired
    private AddressService addressService;

    @PostMapping()
    public ResponseEntity<Address> saveAddress(@RequestBody Address address) {
        return ResponseEntity.ok()
                .body(addressService.saveAddress(address));
    }

    @GetMapping
    public ResponseEntity<List<Address>> findAddresses() {
        return ResponseEntity.ok()
                .body(addressService.findAddresses());
    }

    @GetMapping("/id/{addressId}")
    public ResponseEntity<Address> findAddressById(@PathVariable int addressId) {
        return ResponseEntity.ok()
                .body(addressService.findAddressById(addressId));
    }

    @DeleteMapping("/id/{addressId}")
    public ResponseEntity<Integer> deleteAddressById(@PathVariable int addressId) {
        addressService.deleteAddressById(addressId);
        return ResponseEntity.ok()
                .body( addressId );
    }


}
