package com.core.corenuts.service;

import com.core.corenuts.entity.InterviewRound;
import com.core.corenuts.repo.InterviewRoundRepo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class InterviewRoundService {
    @Autowired
    private InterviewRoundRepo interviewRoundRepo;

    public InterviewRound saveInterviewRound(InterviewRound interviewRound) {
        InterviewRound savedInterviewRound = interviewRoundRepo.save(interviewRound);
        log.info("InterviewRound successfully saved:{}", interviewRound);
        return savedInterviewRound;
    }

    public void deleteInterviewRoundById(int interviewRoundId) {
        interviewRoundRepo.deleteById(interviewRoundId);
        log.info("interviewRound with id {} deleted successfully", interviewRoundId);
    }

    public List<InterviewRound> findInterviewRounds() {
        List<InterviewRound> interviewRounds = interviewRoundRepo.findAll();
        log.info("interviewRounds fetched successfully :{}", interviewRounds);
        return interviewRounds;
    }

    public InterviewRound findInterviewRoundById(int interviewRoundId) {
        Optional<InterviewRound> interviewRound = interviewRoundRepo.findById(interviewRoundId);
        if (interviewRound.isPresent()) {
            log.info("interviewRound with id {} fetched successfully:{}", interviewRoundId, interviewRound);
            return interviewRound.get();
        }
        return null;
    }

    public List<InterviewRound> findInterviewRoundsByStudentId(Integer studentId){
        List<InterviewRound> interviewRoundsByStudentId = interviewRoundRepo.findByStudentStudentId(studentId);
        log.info("Interview Rounds fetched successfully by student id {} :{}",studentId,interviewRoundsByStudentId);
        return interviewRoundsByStudentId;
    }

}
