package com.core.corenuts.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SignupRequest {
	private String username;
	private String email;
	private String password;
	private String phoneNumber;
	private Set<String> roles;
}