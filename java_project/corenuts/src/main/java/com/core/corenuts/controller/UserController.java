package com.core.corenuts.controller;

import com.core.corenuts.request.LoginRequest;
import com.core.corenuts.request.SignupRequest;
import com.core.corenuts.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@Slf4j
public class UserController {


	@Autowired
	private UserService service;

	@PostMapping("/login")
	public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
		return ResponseEntity.ok(service.login(loginRequest));
	}

	@PostMapping("/register")
	public ResponseEntity<?> createUser(@RequestBody SignupRequest signupRequest) {
		log.info("user {}",signupRequest);
		return ResponseEntity.ok(service.register(signupRequest));
	}

	@GetMapping("/organizer")
	public String organizer() {
		return "accesses organzer";
	}

	@GetMapping("/admin")
	public String admin() {
		return "acessed admin";
	}

}
