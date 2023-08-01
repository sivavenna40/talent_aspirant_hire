package com.core.corenuts.service;

import com.core.corenuts.entity.Admin;
import com.core.corenuts.repo.AdminRepo;
import com.core.corenuts.repo.UserRepository;
import com.core.corenuts.request.SignupRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@Slf4j
public class AdminService {
    @Autowired
    private AdminRepo adminRepo;

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;
    public Admin saveAdmin(Admin admin) {
        if (!userRepository.existsByEmail(admin.getAdminEmail())) {
            Set<String> roles = new HashSet<String>();
            roles.add("Admin");
            SignupRequest adminRole = SignupRequest.builder()
                    .username(admin.getAdminName())
                    .email(admin.getAdminEmail())
                    .phoneNumber(admin.getAdminMobileNumber())
                    .password(admin.getAdminMobileNumber())
                    .roles(roles)
                    .build();
            userService.register(adminRole);
        }
        Admin savedAdmin = adminRepo.save(admin);
        log.info("Admin successfully saved:{}", admin);
        return savedAdmin;
    }

    public void deleteAdminById(int adminId) {
        adminRepo.deleteById(adminId);
        log.info("admin with id {} deleted successfully", adminId);
    }

    public List<Admin> findAdmins() {
        List<Admin> admins = adminRepo.findAll();
        log.info("admins:{}", admins);
        return admins;
    }

    public Admin findAdminById(int adminId) {
        Optional<Admin> admin = adminRepo.findById(adminId);
        if (admin.isPresent()) {
            log.info("admin with id {} fetched successfully:{}", adminId, admin);
            return admin.get();
        }
        return null;
    }



}
