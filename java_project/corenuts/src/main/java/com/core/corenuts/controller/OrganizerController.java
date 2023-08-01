package com.core.corenuts.controller;

import com.core.corenuts.entity.Organizer;
import com.core.corenuts.service.OrganizerService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController()
@RequestMapping("/organizer")
public class OrganizerController {

    @Autowired
    private OrganizerService organizerService;

    @PostMapping()
    public ResponseEntity<Organizer> saveOrganizer(@RequestBody Organizer organizer) {
        log.info("organizer:{}", organizer);
       ;
        return ResponseEntity.ok()
                .body( organizerService.saveOrganizer(organizer));
    }

    @GetMapping
    public ResponseEntity<List<Organizer>> findOrganizers() {
        List<Organizer> organizers = organizerService.findOrganizers();
        return ResponseEntity.ok()
                .body(organizers);
    }

    @GetMapping("/id/{organizerId}")
    public ResponseEntity<Organizer> findOrganizerById(@PathVariable int organizerId) {
        Organizer organizer = organizerService.findOrganizerById(organizerId);
        return ResponseEntity.ok()
                .body(organizer);
    }

    @DeleteMapping("/id/{organizerId}")
    public ResponseEntity<Integer> deleteOrganizerById(@PathVariable int organizerId) {
        organizerService.deleteOrganizerById(organizerId);
        return ResponseEntity.ok()
                .body( organizerId );
    }


}
