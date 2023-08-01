package com.core.corenuts.service;

import com.core.corenuts.entity.Organizer;
import com.core.corenuts.repo.OrganizerRepo;
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
public class OrganizerService {
    @Autowired
    private OrganizerRepo organizerRepo;

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;
    public Organizer saveOrganizer(Organizer organizer) {
        if (!userRepository.existsByEmail(organizer.getOrganizerEmail())) {
            Set<String> roles = new HashSet<String>();
            roles.add("Organizer");
            SignupRequest organizerRole = SignupRequest.builder()
                    .username(organizer.getOrganizerName())
                    .email(organizer.getOrganizerEmail())
                    .phoneNumber(organizer.getOrganizerMobileNumber())
                    .password(organizer.getOrganizerMobileNumber())
                    .roles(roles)
                    .build();
            userService.register(organizerRole);
        }
        Organizer savedOrganizer = organizerRepo.save(organizer);
        log.info("Organizer successfully saved:{}", organizer);
        return savedOrganizer;
    }

    public void deleteOrganizerById(int organizerId) {
        organizerRepo.deleteById(organizerId);
        log.info("organizer with id {} deleted successfully", organizerId);
    }

    public List<Organizer> findOrganizers() {
        List<Organizer> organizers = organizerRepo.findAll();
        log.info("organizers:{}", organizers);
        return organizers;
    }

    public Organizer findOrganizerById(int organizerId) {
        Optional<Organizer> organizer = organizerRepo.findById(organizerId);
        if (organizer.isPresent()) {
            log.info("organizer with id {} fetched successfully:{}", organizerId, organizer);
            return organizer.get();
        }
        return null;
    }

}
