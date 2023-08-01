package com.core.corenuts.controller;

import com.core.corenuts.entity.StudentExamMark;
import com.core.corenuts.service.StudentExamMarkService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController()
@RequestMapping("/studentexammark")
public class StudentExamMarkController {

    @Autowired
    private StudentExamMarkService studentExamMarkService;

    @PostMapping()
    public ResponseEntity<StudentExamMark> saveStudentExamMark(@RequestBody StudentExamMark studentExamMark) {
        log.info("driverDetail:{}", studentExamMark);
       ;
        return ResponseEntity.ok()
                .body( studentExamMarkService.saveStudentExamMark(studentExamMark));
    }

    @GetMapping
    public ResponseEntity<List<StudentExamMark>> findStudentExamMarks() {
        List<StudentExamMark> studentExamMarks = studentExamMarkService.findStudentExamMarks();
        return ResponseEntity.ok()
                .body(studentExamMarks);
    }

    @GetMapping("/id/{studentExamMarkId}")
    public ResponseEntity<StudentExamMark> findStudentExamMarkById(@PathVariable int studentExamMarkId) {
        StudentExamMark studentExamMark = studentExamMarkService.findStudentExamMarkById(studentExamMarkId);
        return ResponseEntity.ok()
                .body(studentExamMark);
    }

    @DeleteMapping("/id/{studentExamMarkId}")
    public ResponseEntity<Integer> deleteStudentExamMarkById(@PathVariable int studentExamMarkId) {
        studentExamMarkService.deleteStudentExamMarkById(studentExamMarkId);
        return ResponseEntity.ok()
                .body( studentExamMarkId);
    }

    @GetMapping("/bystudentid/{studentId}")
    public ResponseEntity<StudentExamMark> findInterviewRoundsByStudentId(@PathVariable Integer studentId){
        StudentExamMark studentExamMarks = studentExamMarkService.findStudentExamMarkByStudentId(studentId);
        log.info("student exam marks fetched successfully by student id {} :{}",studentId,studentExamMarks);
        return ResponseEntity.ok().body(studentExamMarks);
    }
}
