package com.core.corenuts.repo;

import com.core.corenuts.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepo extends JpaRepository<Address, Integer> {

}
