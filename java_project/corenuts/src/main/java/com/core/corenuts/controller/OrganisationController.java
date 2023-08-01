package com.core.corenuts.controller;

import com.core.corenuts.entity.Organisation;
import com.core.corenuts.service.OrganisationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController()
@RequestMapping("/organisation")
public class OrganisationController {

    @Autowired
    private OrganisationService organisationService;

    @PostMapping()
    public ResponseEntity<Organisation> saveOrganisation(@RequestBody Organisation organisation) {
        log.info("driverDetail:{}", organisation);
        ;
        return ResponseEntity.ok()
                .body(organisationService.saveOrganisation(organisation));
    }

    @GetMapping
    public ResponseEntity<List<Organisation>> findOrganisations() {
        List<Organisation> organisations = organisationService.findOrganisations();
        return ResponseEntity.ok()
                .body(organisations);
    }

    @GetMapping("/id/{organisationId}")
    public ResponseEntity<Organisation> findOrganisationById(@PathVariable int organisationId) {
        Organisation organisation = organisationService.findOrganisationById(organisationId);
        return ResponseEntity.ok()
                .body(organisation);
    }

    @DeleteMapping("/id/{organisationId}")
    public ResponseEntity<Integer> deleteOrganisationById(@PathVariable int organisationId) {
        organisationService.deleteOrganisationById(organisationId);
        return ResponseEntity.ok()
                .body( organisationId );
    }


}
