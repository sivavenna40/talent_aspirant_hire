package com.core.corenuts.controller;

import com.core.corenuts.entity.Student;
import com.core.corenuts.service.StudentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@Slf4j
@RestController()
@RequestMapping("/student")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @PostMapping()
    public ResponseEntity<Student> saveStudent(@RequestBody Student student) {
        return ResponseEntity.ok()
                .body(studentService.saveStudent(student));
    }

    @GetMapping
    public ResponseEntity<List<Student>> findStudents() {
        List<Student> students = studentService.findStudents();
        return ResponseEntity.ok()
                .body(students);
    }

    @GetMapping("/id/{studentId}")
    public ResponseEntity<Student> findStudentById(@PathVariable int studentId) {
        Student student = studentService.findStudentById(studentId);
        return ResponseEntity.ok()
                .body(student);
    }

    @DeleteMapping("/id/{studentId}")
    public ResponseEntity<Integer> deleteStudentById(@PathVariable int studentId) {
        studentService.deleteStudentById(studentId);
        return ResponseEntity.ok()
                .body(studentId);
    }

    @PutMapping
    public ResponseEntity<Student> updateStudentById(@RequestBody Student student) {
        Student studentById = studentService.findStudentById(student.getStudentId());
        studentById.setInterviewFinalResult(student.getInterviewFinalResult());
        return ResponseEntity.ok()
                .body(studentService.saveStudent(studentById));
    }


    @GetMapping("/pendinginterviews")
    public ResponseEntity<List<Student>> findStudentsByPendingInterviews(String interviewFinalResult) {
        return ResponseEntity.ok()
                .body(studentService.findStudentsByPendingInterviews());
    }


    //find student interview details by org id, interview final result and final result date
    @GetMapping("/interviewresults/result/{interviewFinalResult}")
    public ResponseEntity<List<Student>> findStudentsByInterviewFinalResult(@PathVariable String interviewFinalResult) {
        return ResponseEntity.ok()
                .body(studentService.findStudentsInterviewResults(interviewFinalResult));
    }

    
    @GetMapping("/interviewresults/orgid/date/result/{organisationId}/{interviewFinalResultDate}/{interviewFinalResult}")
    public ResponseEntity<List<Student>> findStudentsInterviewResults(@PathVariable Integer organisationId, @PathVariable String interviewFinalResultDate, @PathVariable String interviewFinalResult) {
        LocalDate date = LocalDate.parse(interviewFinalResultDate); // Attempt parsing the date
        return ResponseEntity.ok()
                .body(studentService.findStudentsInterviewResults(organisationId, date, interviewFinalResult));
    }

    @GetMapping("/interviewresults/orgid/date/{organisationId}/{interviewFinalResultDate}/")
    public ResponseEntity<List<Student>> findStudentsInterviewResults(@PathVariable Integer organisationId, @PathVariable String interviewFinalResultDate) {
        LocalDate date = LocalDate.parse(interviewFinalResultDate); // Attempt parsing the date
        return ResponseEntity.ok()
                .body(studentService.findStudentsInterviewResults(organisationId, date));
    }

    @GetMapping("/interviewresults/orgid/result/{organisationId}/{interviewFinalResult}")
    public ResponseEntity<List<Student>> findStudentsInterviewResults(@PathVariable String interviewFinalResult, @PathVariable Integer organisationId) {
        return ResponseEntity.ok()
                .body(studentService.findStudentsInterviewResults(organisationId, interviewFinalResult));
    }

    @GetMapping("/interviewresults/orgid/{organisationId}")
    public ResponseEntity<List<Student>> findStudentsInterviewResults(@PathVariable Integer organisationId) {
        return ResponseEntity.ok()
                .body(studentService.findStudentsInterviewResults(organisationId));
    }

    @GetMapping("/interviewresults/date/result/{interviewFinalResultDate}/{interviewFinalResult}")
    public ResponseEntity<List<Student>> findStudentsInterviewResults(@PathVariable String interviewFinalResultDate, @PathVariable String interviewFinalResult) {
        LocalDate date = LocalDate.parse(interviewFinalResultDate); // Attempt parsing the date
        return ResponseEntity.ok()
                .body(studentService.findStudentsInterviewResults(date, interviewFinalResult));
    }

    @GetMapping("/interviewresults/date/{interviewFinalResultDate}/")
    public ResponseEntity<List<Student>> findStudentsInterviewResults(@PathVariable String interviewFinalResultDate) {
        LocalDate date = LocalDate.parse(interviewFinalResultDate); // Attempt parsing the date
        return ResponseEntity.ok()
                .body(studentService.findStudentsInterviewResults(date));
    }

    @GetMapping("/interviewresultscount/orgid/date/{organisationId}/{interviewFinalResultDate}")
    public List<Object[]> groupByInterviewFinalResults(@PathVariable Integer organisationId, @PathVariable String interviewFinalResultDate) {
        LocalDate date = LocalDate.parse(interviewFinalResultDate);
        return studentService.groupByInterviewFinalResults(organisationId, date);
    }

    @GetMapping("/interviewresultscount/orgid/{organisationId}")
    public List<Object[]> groupByInterviewFinalResults(@PathVariable Integer organisationId) {
        return studentService.groupByInterviewFinalResults(organisationId);
    }

    @GetMapping("/interviewresultscount/date/{interviewFinalResultDate}")
    public List<Object[]> groupByInterviewFinalResults(@PathVariable String interviewFinalResultDate) {
        LocalDate date = LocalDate.parse(interviewFinalResultDate);
        return studentService.groupByInterviewFinalResults(date);
    }

    @GetMapping("/interviewresultscount/")
    public List<Object[]> groupByInterviewFinalResults() {
        return studentService.groupByInterviewFinalResults();
    }

}
