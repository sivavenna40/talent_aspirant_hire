package com.core.corenuts.controller;

import com.core.corenuts.entity.Interviewer;
import com.core.corenuts.service.InterviewerService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController()
@RequestMapping("/interviewer")
public class InterviewerController {

    @Autowired
    private InterviewerService interviewerService;

    @PostMapping()
    public ResponseEntity<Interviewer> saveInterviewer(@RequestBody Interviewer interviewer) {

        return ResponseEntity.ok()
                .body( interviewerService.saveInterviewer(interviewer));
    }

    @GetMapping
    public ResponseEntity<List<Interviewer>> findInterviewers() {
        return ResponseEntity.ok()
                .body(interviewerService.findInterviewers());
    }

    @GetMapping("/id/{interviewerId}")
    public ResponseEntity<Interviewer> findInterviewerById(@PathVariable int interviewerId) {
        return ResponseEntity.ok()
                .body(interviewerService.findInterviewerById(interviewerId));
    }

    @DeleteMapping("/id/{interviewerId}")
    public ResponseEntity<Integer> deleteInterviewerById(@PathVariable int interviewerId) {
        interviewerService.deleteInterviewerById(interviewerId);
        return ResponseEntity.ok()
                .body( interviewerId);
    }

    @GetMapping("/intervieweremail/{interviewerEmail}")
    public ResponseEntity<Interviewer> findInterviewerByInterviewerEmail(@PathVariable String interviewerEmail) {
        return ResponseEntity.ok()
                .body(interviewerService.findByInterviewerEmail(interviewerEmail));
    }

}
