package com.core.corenuts.repo;

import com.core.corenuts.entity.InterviewRound;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InterviewRoundRepo extends JpaRepository<InterviewRound, Integer> {
    List<InterviewRound> findByStudentStudentId(Integer studentId);
}
