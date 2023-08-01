package com.core.corenuts.controller;

import com.core.corenuts.entity.InterviewRound;
import com.core.corenuts.service.InterviewRoundService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController()
@RequestMapping("/interviewround")
public class InterviewRoundController {

    @Autowired
    private InterviewRoundService interviewRoundService;

    @PostMapping()
    public ResponseEntity<InterviewRound> saveInterviewRound(@RequestBody InterviewRound interviewRound) {

        return ResponseEntity.ok()
                .body(interviewRoundService.saveInterviewRound(interviewRound));
    }

    @GetMapping
    public ResponseEntity<List<InterviewRound>> findInterviewRounds() {
        List<InterviewRound> interviewRounds = interviewRoundService.findInterviewRounds();
        return ResponseEntity.ok()
                .body(interviewRounds);
    }

    @GetMapping("/id/{interviewRoundId}")
    public ResponseEntity<InterviewRound> findInterviewRoundById(@PathVariable int interviewRoundId) {
        InterviewRound interviewRound = interviewRoundService.findInterviewRoundById(interviewRoundId);
        return ResponseEntity.ok()
                .body(interviewRound);
    }

    @DeleteMapping("/id/{interviewRoundId}")
    public ResponseEntity<Integer> deleteInterviewRoundById(@PathVariable int interviewRoundId) {
        interviewRoundService.deleteInterviewRoundById(interviewRoundId);
        return ResponseEntity.ok()
                .body(interviewRoundId);
    }

    @GetMapping("/bystudentid/{studentId}")
    public ResponseEntity<List<InterviewRound>> findInterviewRoundsByStudentId(@PathVariable Integer studentId){
        List<InterviewRound> interviewRounds = interviewRoundService.findInterviewRoundsByStudentId(studentId);
        log.info("Interview Rounds fetched successfully by student id {} :{}",studentId,interviewRounds);
        return ResponseEntity.ok().body(interviewRounds);
    }

}
