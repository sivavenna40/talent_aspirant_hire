package com.core.corenuts.controller;


import com.core.corenuts.entity.InterviewSchedule;
import com.core.corenuts.service.InterviewScheduleService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController()
@RequestMapping("/interviewschedule")
public class InterviewScheduleController {

    @Autowired
    private InterviewScheduleService interviewScheduleService;

    @PostMapping()
    public ResponseEntity<InterviewSchedule> saveInterviewSchedule(@RequestBody InterviewSchedule interviewSchedule) {

        return ResponseEntity.ok()
                .body(interviewScheduleService.saveInterviewSchedule(interviewSchedule));
    }
    @GetMapping
    public ResponseEntity<List<InterviewSchedule>> findInterviewSchedules() {
        List<InterviewSchedule> interviewSchedules = interviewScheduleService.findInterviewSchedules();
        return ResponseEntity.ok()
                .body(interviewSchedules);
    }

    @GetMapping("/id/{interviewScheduleId}")
    public ResponseEntity<InterviewSchedule> findInterviewScheduleById(@PathVariable int interviewScheduleId) {
        InterviewSchedule interviewSchedule = interviewScheduleService.findInterviewScheduleById(interviewScheduleId);
        return ResponseEntity.ok()
                .body(interviewSchedule);
    }

    @DeleteMapping("/id/{interviewScheduleId}")
    public ResponseEntity<Integer> deleteInterviewScheduleById(@PathVariable int interviewScheduleId) {
        interviewScheduleService.deleteInterviewScheduleById(interviewScheduleId);
        return ResponseEntity.ok()
                .body(interviewScheduleId );
    }

    @GetMapping("/byOrgId/{organisationId}")
    public ResponseEntity<List<InterviewSchedule>> findInterviewScheduleDatesByOrganisationId(@PathVariable Integer organisationId){
        return ResponseEntity.ok().body(interviewScheduleService.findInterviewSchedulesByOrganisationId(organisationId));
    }
}
