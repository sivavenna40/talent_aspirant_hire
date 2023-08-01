package com.core.corenuts.utils;

import com.core.corenuts.entity.ERole;
import com.core.corenuts.entity.Role;
import com.core.corenuts.repo.RolesRepostiory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
public class RolesUtils {
	@Autowired
	private RolesRepostiory repository;

	public Set<Role> mapRoles(Set<String> userRoles, Set<Role> dbRoles) {
		if (userRoles == null || userRoles.isEmpty()) {
			Role userRole = repository.findByName(ERole.Student)
					.orElseThrow(() -> new RuntimeException("Error: Role is not found"));
			dbRoles.add(userRole);
		} else {
			userRoles.forEach(role -> {
				switch (role) {
				case "Admin":
					Role adminRole = repository.findByName(ERole.Admin)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found"));
					dbRoles.add(adminRole);
					break;
				case "Interviewer":
					Role interviewerRole = repository.findByName(ERole.Interviewer)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found"));
					dbRoles.add(interviewerRole);
					break;
				case "Organizer":
					Role organizerRole = repository.findByName(ERole.Organizer)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found"));
					dbRoles.add(organizerRole);
					break;
				default:
					Role userRole = repository.findByName(ERole.Student)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found"));
					dbRoles.add(userRole);

					break;
				}
			});

		}
		return dbRoles;
	}

}