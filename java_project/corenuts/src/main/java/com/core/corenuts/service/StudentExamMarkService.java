package com.core.corenuts.service;

import com.core.corenuts.entity.StudentExamMark;
import com.core.corenuts.repo.StudentExamMarkRepo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
@Slf4j
public class StudentExamMarkService {
    @Autowired
    private StudentExamMarkRepo studentExamMarkRepo;

    public StudentExamMark saveStudentExamMark(StudentExamMark studentExamMark) {
        StudentExamMark savedStudentExamMark = studentExamMarkRepo.save(studentExamMark);
        log.info("StudentExamMark successfully saved:{}", studentExamMark);
        return savedStudentExamMark;
    }

    public void deleteStudentExamMarkById(int studentExamMarkId) {
        studentExamMarkRepo.deleteById(studentExamMarkId);
        log.info("studentExamMark with id {} deleted successfully", studentExamMarkId);
    }

    public List<StudentExamMark> findStudentExamMarks() {
        List<StudentExamMark> studentExamMarks = studentExamMarkRepo.findAll();
        log.info("studentExamMarks fetched successfully :{}", studentExamMarks);
        return studentExamMarks;
    }

    public StudentExamMark findStudentExamMarkById(int studentExamMarkId) {
        Optional<StudentExamMark> studentExamMark = studentExamMarkRepo.findById(studentExamMarkId);
        if (studentExamMark.isPresent()) {
            log.info("studentExamMark with id {} fetched successfully:{}", studentExamMarkId, studentExamMark);
            return studentExamMark.get();
        }
        return null;
    }

    public StudentExamMark findStudentExamMarkByStudentId(Integer studentId){
        StudentExamMark studentExamMarkByStudentId = studentExamMarkRepo.findByStudentStudentId(studentId);
        log.info("student exam marks fetched successfully by student id {} :{}",studentId,studentExamMarkByStudentId);
        return studentExamMarkByStudentId;
    }

}
