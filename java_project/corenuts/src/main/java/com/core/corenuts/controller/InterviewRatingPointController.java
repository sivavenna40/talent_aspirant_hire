package com.core.corenuts.controller;


import com.core.corenuts.entity.InterviewRatingPoint;
import com.core.corenuts.service.InterviewRatingPointService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController()
@RequestMapping("/interviewratingpoint")
public class InterviewRatingPointController {

    @Autowired
    private InterviewRatingPointService interviewRatingPointService;

    @PostMapping()
    public ResponseEntity<InterviewRatingPoint> saveInterviewRatingPoint(@RequestBody InterviewRatingPoint interviewRatingPoint) {
        return ResponseEntity.ok()
                .body(interviewRatingPointService.saveInterviewRatingPoint(interviewRatingPoint));
    }
    @GetMapping
    public ResponseEntity<List<InterviewRatingPoint>> findInterviewRatingPoints() {
        return ResponseEntity.ok()
                .body(interviewRatingPointService.findInterviewRatingPoints());
    }

    @GetMapping("/id/{interviewRatingPointId}")
    public ResponseEntity<InterviewRatingPoint> findInterviewRatingPointById(@PathVariable int interviewRatingPointId) {
        return ResponseEntity.ok()
                .body(interviewRatingPointService.findInterviewRatingPointById(interviewRatingPointId));
    }

    @DeleteMapping("/id/{interviewRatingPointId}")
    public ResponseEntity<Integer> deleteInterviewRatingPointById(@PathVariable int interviewRatingPointId) {
        interviewRatingPointService.deleteInterviewRatingPointById(interviewRatingPointId);
        return ResponseEntity.ok()
                .body(interviewRatingPointId );
    }


}
