package com.core.corenuts.controller;

import com.core.corenuts.entity.InterviewSkillRating;
import com.core.corenuts.service.InterviewSkillRatingService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController()
@RequestMapping("/interviewSkillRating")
public class InterviewSkillRatingController {

    @Autowired
    private InterviewSkillRatingService interviewSkillRatingService;

    @PostMapping()
    public ResponseEntity<InterviewSkillRating> saveInterviewSkillRating(@RequestBody InterviewSkillRating interviewSkillRating) {

        return ResponseEntity.ok()
                .body( interviewSkillRatingService.saveInterviewSkillRating(interviewSkillRating));
    }

    @GetMapping
    public ResponseEntity<List<InterviewSkillRating>> findInterviewSkillRatings() {
        List<InterviewSkillRating> interviewSkillRatings = interviewSkillRatingService.findInterviewSkillRatings();
        return ResponseEntity.ok()
                .body(interviewSkillRatings);
    }

    @GetMapping("/id/{interviewSkillRatingId}")
    public ResponseEntity<InterviewSkillRating> findInterviewSkillRatingById(@PathVariable int interviewSkillRatingId) {
        InterviewSkillRating interviewSkillRating = interviewSkillRatingService.findInterviewSkillRatingById(interviewSkillRatingId);
        return ResponseEntity.ok()
                .body(interviewSkillRating);
    }

    @DeleteMapping("/id/{interviewSkillRatingId}")
    public ResponseEntity<Integer> deleteInterviewSkillRatingById(@PathVariable int interviewSkillRatingId) {
        interviewSkillRatingService.deleteInterviewSkillRatingById(interviewSkillRatingId);
        return ResponseEntity.ok()
                .body( interviewSkillRatingId);
    }


}
