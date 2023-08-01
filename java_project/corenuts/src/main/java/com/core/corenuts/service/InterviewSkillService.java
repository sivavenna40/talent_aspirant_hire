package com.core.corenuts.service;

import com.core.corenuts.entity.InterviewSkill;
import com.core.corenuts.repo.InterviewSkillRepo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class InterviewSkillService {
    @Autowired
    private InterviewSkillRepo interviewSkillRepo;

    public InterviewSkill saveInterviewSkill(InterviewSkill interviewSkill) {
        InterviewSkill savedInterviewSkill = interviewSkillRepo.save(interviewSkill);
        log.info("InterviewSkill successfully saved:{}", interviewSkill);
        return savedInterviewSkill;
    }

    public void deleteInterviewSkillById(int interviewSkillId) {
        interviewSkillRepo.deleteById(interviewSkillId);
        log.info("interviewSkill with id {} deleted successfully", interviewSkillId);
    }

    public List<InterviewSkill> findInterviewSkills() {
        List<InterviewSkill> interviewSkills = interviewSkillRepo.findAll();
        log.info("interviewSkills fetched successfully :{}", interviewSkills);
        return interviewSkills;
    }

    public InterviewSkill findInterviewSkillById(int interviewSkillId) {
        Optional<InterviewSkill> interviewSkill = interviewSkillRepo.findById(interviewSkillId);
        if (interviewSkill.isPresent()) {
            log.info("interviewSkill with id {} fetched successfully:{}", interviewSkillId, interviewSkill);
            return interviewSkill.get();
        }
        return null;
    }

}
