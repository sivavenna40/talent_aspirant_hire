package com.core.corenuts.repo;

import com.core.corenuts.entity.ERole;
import com.core.corenuts.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RolesRepostiory extends JpaRepository<Role, Integer> {
	
	Optional<Role> findByName(ERole name);

}
