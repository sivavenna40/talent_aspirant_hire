package com.core.corenuts.repo;


import com.core.corenuts.entity.StudentExamMark;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentExamMarkRepo extends JpaRepository<StudentExamMark, Integer> {
    StudentExamMark findByStudentStudentId(Integer studentId);
}
