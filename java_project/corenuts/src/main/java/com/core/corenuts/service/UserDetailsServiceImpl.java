package com.core.corenuts.service;

import com.core.corenuts.entity.User;
import com.core.corenuts.entity.UserDetailsImpl;
import com.core.corenuts.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

	@Autowired
	private UserRepository repository;

	// loading model class user object
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

		User user = repository.findByEmail(email)
				.orElseThrow(() -> new UsernameNotFoundException("User not exist" + email));

		// converting into Spring Security User object
		return UserDetailsImpl.build(user);
	}
}
