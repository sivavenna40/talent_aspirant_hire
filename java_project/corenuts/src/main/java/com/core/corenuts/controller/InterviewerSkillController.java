package com.core.corenuts.controller;

import com.core.corenuts.entity.InterviewerSkill;
import com.core.corenuts.service.InterviewerSkillService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController()
@RequestMapping("/interviewerskill")
public class InterviewerSkillController {

    @Autowired
    private InterviewerSkillService interviewerSkillService;

    @PostMapping()
    public ResponseEntity<InterviewerSkill> saveInterviewerSkill(@RequestBody InterviewerSkill interviewerSkill) {

        return ResponseEntity.ok()
                .body( interviewerSkillService.saveInterviewerSkill(interviewerSkill));
    }

    @GetMapping
    public ResponseEntity<List<InterviewerSkill>> findInterviewerSkills() {
        List<InterviewerSkill> interviewerSkills = interviewerSkillService.findInterviewerSkills();
        return ResponseEntity.ok()
                .body(interviewerSkills);
    }

    @GetMapping("/id/{interviewerSkillId}")
    public ResponseEntity<InterviewerSkill> findInterviewerSkillById(@PathVariable int interviewerSkillId) {
        InterviewerSkill interviewerSkill = interviewerSkillService.findInterviewerSkillById(interviewerSkillId);
        return ResponseEntity.ok()
                .body(interviewerSkill);
    }

    @DeleteMapping("/id/{interviewerSkillId}")
    public ResponseEntity<Integer> deleteInterviewerSkillById(@PathVariable int interviewerSkillId) {
        interviewerSkillService.deleteInterviewerSkillById(interviewerSkillId);
        return ResponseEntity.ok()
                .body(interviewerSkillId );
    }


}
