package com.core.corenuts.service;

import com.core.corenuts.entity.InterviewSchedule;
import com.core.corenuts.repo.InterviewScheduleRepo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class InterviewScheduleService {
    @Autowired
    private InterviewScheduleRepo interviewScheduleRepo;

    public InterviewSchedule saveInterviewSchedule(InterviewSchedule interviewSchedule) {
        InterviewSchedule savedSchedule = interviewScheduleRepo.save(interviewSchedule);
        log.info("InterviewSchedule successfully saved:{}", savedSchedule);
        return savedSchedule;
    }

    public void deleteInterviewScheduleById(int interviewScheduleId) {
        log.info("interviewSchedule with id {} will be deleted successfully", interviewScheduleId);
        interviewScheduleRepo.deleteById(interviewScheduleId);
        log.info("interviewSchedule with id {} deleted successfully", interviewScheduleId);
    }

    public List<InterviewSchedule> findInterviewSchedules() {
        List<InterviewSchedule> interviewSchedules = interviewScheduleRepo.findAll();
        log.info("interviewSchedules fetched successfully :{}", interviewSchedules);
        return interviewSchedules;
    }

    public InterviewSchedule findInterviewScheduleById(int interviewScheduleId) {
        Optional<InterviewSchedule> interviewSchedule = interviewScheduleRepo.findById(interviewScheduleId);
        if (interviewSchedule.isPresent()) {
            log.info("interviewSchedule with id {} fetched successfully:{}", interviewScheduleId, interviewSchedule);
            return interviewSchedule.get();
        }
        return null;
    }

    public List<InterviewSchedule> findInterviewSchedulesByOrganisationId(Integer organisationId){
        return interviewScheduleRepo.findByOrganisationOrganisationId(organisationId);
    }


}
