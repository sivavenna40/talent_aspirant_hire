package com.core.corenuts.service;

import com.core.corenuts.entity.InterviewRatingPoint;
import com.core.corenuts.repo.InterviewRatingPointRepo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class InterviewRatingPointService {
    @Autowired
    private InterviewRatingPointRepo interviewRatingPointRepo;

    public InterviewRatingPoint saveInterviewRatingPoint(InterviewRatingPoint interviewRatingPoint) {
        InterviewRatingPoint savedRatingPoint = interviewRatingPointRepo.save(interviewRatingPoint);
        log.info("InterviewRatingPoint successfully saved:{}", savedRatingPoint);
        return savedRatingPoint;
    }

    public void deleteInterviewRatingPointById(int interviewRatingPointId) {
        log.info("interviewRatingPoint with id {} will be deleted successfully", interviewRatingPointId);
        interviewRatingPointRepo.deleteById(interviewRatingPointId);
        log.info("interviewRatingPoint with id {} deleted successfully", interviewRatingPointId);
    }

    public List<InterviewRatingPoint> findInterviewRatingPoints() {
        List<InterviewRatingPoint> interviewRatingPoints = interviewRatingPointRepo.findAll();
        log.info("interviewRatingPoints fetched successfully :{}", interviewRatingPoints);
        return interviewRatingPoints;
    }

    public InterviewRatingPoint findInterviewRatingPointById(int interviewRatingPointId) {
        Optional<InterviewRatingPoint> interviewRatingPoint = interviewRatingPointRepo.findById(interviewRatingPointId);
        if (interviewRatingPoint.isPresent()) {
            log.info("interviewRatingPoint with id {} fetched successfully:{}", interviewRatingPointId, interviewRatingPoint);
            return interviewRatingPoint.get();
        }
        return null;
    }


}
