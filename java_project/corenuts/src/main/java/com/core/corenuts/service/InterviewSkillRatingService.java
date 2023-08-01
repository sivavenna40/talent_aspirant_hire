package com.core.corenuts.service;

import com.core.corenuts.entity.InterviewSkillRating;
import com.core.corenuts.repo.InterviewSkillRatingRepo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class InterviewSkillRatingService {
    @Autowired
    private InterviewSkillRatingRepo interviewSkillRatingRepo;

    public InterviewSkillRating saveInterviewSkillRating(InterviewSkillRating interviewSkillRating) {
        InterviewSkillRating savedInterviewSkillRating = interviewSkillRatingRepo.save(interviewSkillRating);
        log.info("InterviewSkillRating successfully saved:{}", interviewSkillRating);
        return savedInterviewSkillRating;
    }

    public void deleteInterviewSkillRatingById(int interviewSkillRatingId) {
        interviewSkillRatingRepo.deleteById(interviewSkillRatingId);
        log.info("interviewSkillRating with id {} deleted successfully", interviewSkillRatingId);
    }

    public List<InterviewSkillRating> findInterviewSkillRatings() {
        List<InterviewSkillRating> interviewSkillRatings = interviewSkillRatingRepo.findAll();
        log.info("interviewSkillRatings fetched successfully :{}", interviewSkillRatings);
        return interviewSkillRatings;
    }

    public InterviewSkillRating findInterviewSkillRatingById(int interviewSkillRatingId) {
        Optional<InterviewSkillRating> interviewSkillRating = interviewSkillRatingRepo.findById(interviewSkillRatingId);
        if (interviewSkillRating.isPresent()) {
            log.info("interviewSkillRating with id {} fetched successfully:{}", interviewSkillRatingId, interviewSkillRating);
            return interviewSkillRating.get();
        }
        return null;
    }

}
