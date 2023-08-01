package com.core.corenuts.controller;

import com.core.corenuts.entity.InterviewSkill;
import com.core.corenuts.service.InterviewSkillService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController()
@RequestMapping("/interviewskill")
public class InterviewSkillController {

    @Autowired
    private InterviewSkillService interviewSkillService;

    @PostMapping()
    public ResponseEntity<InterviewSkill> saveInterviewSkill(@RequestBody InterviewSkill interviewSkill) {
        log.info("driverDetail:{}", interviewSkill);
       ;
        return ResponseEntity.ok()
                .body( interviewSkillService.saveInterviewSkill(interviewSkill));
    }

    @GetMapping
    public ResponseEntity<List<InterviewSkill>> findInterviewSkills() {
        List<InterviewSkill> interviewSkills = interviewSkillService.findInterviewSkills();
        return ResponseEntity.ok()
                .body(interviewSkills);
    }

    @GetMapping("/id/{interviewSkillId}")
    public ResponseEntity<InterviewSkill> findInterviewSkillById(@PathVariable int interviewSkillId) {
        InterviewSkill interviewSkill = interviewSkillService.findInterviewSkillById(interviewSkillId);
        return ResponseEntity.ok()
                .body(interviewSkill);
    }

    @DeleteMapping("/id/{interviewSkillId}")
    public ResponseEntity<Integer> deleteInterviewSkillById(@PathVariable int interviewSkillId) {
        interviewSkillService.deleteInterviewSkillById(interviewSkillId);
        return ResponseEntity.ok()
                .body(interviewSkillId );
    }


}
