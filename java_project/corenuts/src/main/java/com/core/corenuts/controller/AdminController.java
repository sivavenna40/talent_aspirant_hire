package com.core.corenuts.controller;


import com.core.corenuts.entity.Admin;
import com.core.corenuts.service.AdminService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController()
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping()
    public ResponseEntity<Admin> saveAdmin(@RequestBody Admin admin) {

        return ResponseEntity.ok()
                .body(  adminService.saveAdmin(admin));
    }

    @GetMapping
    public ResponseEntity<List<Admin>> findAdmins() {
        return ResponseEntity.ok()
                .body(adminService.findAdmins());
    }

    @GetMapping("/id/{adminId}")
    public ResponseEntity<Admin> findAdminById(@PathVariable int adminId) {
        return ResponseEntity.ok()
                .body(adminService.findAdminById(adminId));
    }

    @DeleteMapping("/id/{adminId}")
    public ResponseEntity<Integer> deleteAdminById(@PathVariable int adminId) {
        adminService.deleteAdminById(adminId);
        return ResponseEntity.ok()
                .body(adminId );
    }


}
