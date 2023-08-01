package com.core.corenuts.service;

import com.core.corenuts.entity.Organisation;
import com.core.corenuts.repo.OrganisationRepo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class OrganisationService {
    @Autowired
    private OrganisationRepo organisationRepo;

    public Organisation saveOrganisation(Organisation organisation) {
        Organisation savedOrganisation = organisationRepo.save(organisation);
        log.info("Organisation successfully saved:{}", organisation);
        return savedOrganisation;
    }

    public void deleteOrganisationById(int organisationId) {
        organisationRepo.deleteById(organisationId);
        log.info("organisation with id {} deleted successfully", organisationId);
    }

    public List<Organisation> findOrganisations() {
        List<Organisation> organisations = organisationRepo.findAll();
        log.info("organisations:{}", organisations);
        return organisations;
    }

    public Organisation findOrganisationById(int organisationId) {
        Optional<Organisation> organisation = organisationRepo.findById(organisationId);
        if (organisation.isPresent()) {
            log.info("organisation with id {} fetched successfully:{}", organisationId, organisation);
            return organisation.get();
        }
        return null;
    }

}
