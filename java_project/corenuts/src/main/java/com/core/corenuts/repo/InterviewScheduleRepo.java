package com.core.corenuts.repo;

import com.core.corenuts.entity.InterviewSchedule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InterviewScheduleRepo extends JpaRepository<InterviewSchedule, Integer> {
    List<InterviewSchedule> findByOrganisationOrganisationId(Integer organisationId);



}
