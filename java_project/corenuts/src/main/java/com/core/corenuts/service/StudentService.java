package com.core.corenuts.service;

import com.core.corenuts.entity.Student;
import com.core.corenuts.repo.StudentRepo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;


@Service
@Slf4j
public class StudentService {
    @Autowired
    private StudentRepo studentRepo;

    public Student saveStudent(Student student) {
        Student savedStudent = studentRepo.save(student);
        log.info("Student successfully saved:{}", student);
        return savedStudent;
    }

    public void deleteStudentById(int studentId) {
        studentRepo.deleteById(studentId);
        log.info("student with id {} deleted successfully", studentId);
    }

    public List<Student> findStudents() {
        List<Student> students = studentRepo.findAll();
        log.info("students fetched successfully :{}", students);
        return students;
    }

    public Student findStudentById(int studentId) {
        Optional<Student> student = studentRepo.findById(studentId);
        if (student.isPresent()) {
            log.info("student with id {} fetched successfully:{}", studentId, student);
            return student.get();
        }
        return null;
    }



    public List<Student> findStudentsByPendingInterviews(){
        List<Student> students = studentRepo.findPendingInterviews();
        log.info("students fetched successfully by interviewFinalResult as null :{}", students);
        return students;
    }

    public List<Student> findStudentsInterviewResults(Integer organisationId, LocalDate interviewFinalResultDate, String interviewFinalResult ){
        return studentRepo.findByOrganisationOrganisationIdAndInterviewFinalResultDateAndInterviewFinalResult(organisationId,interviewFinalResultDate,interviewFinalResult);
    }

    public List<Student> findStudentsInterviewResults(Integer organisationId, LocalDate interviewFinalResultDate ){
        return studentRepo.findByOrganisationOrganisationIdAndInterviewFinalResultDate(organisationId,interviewFinalResultDate);
    }

    public List<Student> findStudentsInterviewResults(Integer organisationId,  String interviewFinalResult ){
        return studentRepo.findByOrganisationOrganisationIdAndInterviewFinalResult(organisationId,interviewFinalResult);
    }

    public List<Student> findStudentsInterviewResults(Integer organisationId ){
        return studentRepo.findByOrganisationOrganisationId(organisationId);
    }

    public List<Student> findStudentsInterviewResults( LocalDate interviewFinalResultDate, String interviewFinalResult ){
        return studentRepo.findByInterviewFinalResultDateAndInterviewFinalResult(interviewFinalResultDate,interviewFinalResult);
    }

    public List<Student> findStudentsInterviewResults( LocalDate interviewFinalResultDate ){
        return studentRepo.findByInterviewFinalResultDate(interviewFinalResultDate);
    }

    public List<Student> findStudentsInterviewResults(String interviewFinalResult){
        return studentRepo.findByInterviewFinalResult(interviewFinalResult);
    }

    public List<Object[]> groupByInterviewFinalResults(Integer organisationId, LocalDate interviewFinalResultDate) {
        return studentRepo.groupByInterviewFinalResults(organisationId,interviewFinalResultDate);
    }

    public List<Object[]> groupByInterviewFinalResults(Integer organisationId){
        return studentRepo.groupByInterviewFinalResults(organisationId);
    }

    public List<Object[]> groupByInterviewFinalResults(LocalDate interviewFinalResultDate){
        return studentRepo.groupByInterviewFinalResults(interviewFinalResultDate);
    }

    public List<Object[]> groupByInterviewFinalResults( ){
        return studentRepo.groupByInterviewFinalResults();
    }
}
