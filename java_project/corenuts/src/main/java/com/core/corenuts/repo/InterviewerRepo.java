package com.core.corenuts.repo;

import com.core.corenuts.entity.Interviewer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InterviewerRepo extends JpaRepository<Interviewer, Integer> {

    Interviewer findByInterviewerEmail(String interviewerEmail);
}
