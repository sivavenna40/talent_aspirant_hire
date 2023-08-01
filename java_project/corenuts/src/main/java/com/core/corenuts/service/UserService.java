package com.core.corenuts.service;

import com.core.corenuts.entity.*;
import com.core.corenuts.repo.AdminRepo;
import com.core.corenuts.repo.InterviewerRepo;
import com.core.corenuts.repo.OrganizerRepo;
import com.core.corenuts.repo.UserRepository;
import com.core.corenuts.request.LoginRequest;
import com.core.corenuts.request.SignupRequest;
import com.core.corenuts.response.JwtResponse;
import com.core.corenuts.utils.JwtUtils;
import com.core.corenuts.utils.RolesUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Slf4j
public class UserService {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private AdminRepo adminRepo;
	
	
	@Autowired
	private OrganizerRepo organizerRepo;
	
	@Autowired
	private InterviewerRepo interviewerRepo;
	
	
	
	
	@Autowired
	private RolesUtils rolesUtils;
	
	@Autowired
	private PasswordEncoder encoder;
	
	@Autowired
	private JwtUtils jwtUtils;
	
	@Autowired
	private AuthenticationManager authenticationManager;

	public JwtResponse login(LoginRequest loginRequest) {
		
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);

		String jwt = jwtUtils.generateToken(authentication);

		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

		return new JwtResponse(jwt, userDetails.getId(), userDetails.getUsername(), userDetails.getEmail(),
				userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toSet())
		);
	}

	public String register(SignupRequest signupRequest) {
		log.info("singing in service {}",signupRequest);
		if (userRepository.existsByEmail(signupRequest.getEmail())) {
			return "Error : Username already exist";
		}

		User user = User.builder().email(signupRequest.getEmail()).password(encoder.encode(signupRequest.getPassword()))
				.phoneNumber(signupRequest.getPhoneNumber()).userName(signupRequest.getUsername()).build();

		Set<String> usrRoles = signupRequest.getRoles();

		Set<Role> dbRoles = new HashSet<>();

		dbRoles = rolesUtils.mapRoles(usrRoles, dbRoles);
		
		usrRoles.forEach(role -> {
		switch (role) {
		case "admin":
		Admin admin=Admin.builder().adminEmail(user.getEmail())
			.adminMobileNumber(user.getPhoneNumber())
			.adminName(user.getUserName())
			.build();
			adminRepo.save(admin);
			break;
		case "interviewer":
			Interviewer interviewer=Interviewer.builder().interviewerEmail(user.getEmail())
			.interviewerMobileNumber(user.getPhoneNumber())
			.interviewerName(user.getUserName())
			.build();
			interviewerRepo.save(interviewer);
			break;
		case "organizer":
			
			Organizer organizer=Organizer.builder().organizerEmail(user.getEmail())
			.organizerMobileNumber(user.getPhoneNumber())
			.organizerName(user.getUserName())
			.build();
			organizerRepo.save(organizer);
			break;
		default:
			
		}
		});

		
		user.setRoles(dbRoles);
		userRepository.save(user);
		return "User Created Successfully!";
	}

}
