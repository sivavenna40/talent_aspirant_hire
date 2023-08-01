package com.core.corenuts.service;

import com.core.corenuts.entity.InterviewerSkill;
import com.core.corenuts.repo.InterviewerSkillRepo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class InterviewerSkillService {
    @Autowired
    private InterviewerSkillRepo interviewerSkillRepo;

    public InterviewerSkill saveInterviewerSkill(InterviewerSkill interviewerSkill) {
        InterviewerSkill savedInterviewerSkill = interviewerSkillRepo.save(interviewerSkill);
        log.info("InterviewerSkill successfully saved:{}", interviewerSkill);
        return savedInterviewerSkill;
    }

    public void deleteInterviewerSkillById(int interviewerSkillId) {
        interviewerSkillRepo.deleteById(interviewerSkillId);
        log.info("interviewerSkill with id {} deleted successfully", interviewerSkillId);
    }

    public List<InterviewerSkill> findInterviewerSkills() {
        List<InterviewerSkill> interviewerSkills = interviewerSkillRepo.findAll();
        log.info("interviewerSkills fetched successfully :{}", interviewerSkills);
        return interviewerSkills;
    }

    public InterviewerSkill findInterviewerSkillById(int interviewerSkillId) {
        Optional<InterviewerSkill> interviewerSkill = interviewerSkillRepo.findById(interviewerSkillId);
        if (interviewerSkill.isPresent()) {
            log.info("interviewerSkill with id {} fetched successfully:{}", interviewerSkillId, interviewerSkill);
            return interviewerSkill.get();
        }
        return null;
    }

}
