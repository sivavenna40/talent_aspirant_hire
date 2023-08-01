package com.core.corenuts.repo;


import com.core.corenuts.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface StudentRepo extends JpaRepository<Student, Integer> {
    List<Student> findByInterviewFinalResult(String interviewFinalResult);

    @Query(value = "SELECT * FROM corenuts.student where interview_final_result not in (\"Selected\",\"Rejected\") ", nativeQuery = true)
    List<Student> findPendingInterviews();

    @Query(value = "SELECT s.interview_final_result, COUNT(*) FROM (SELECT * FROM student WHERE organisation_id = :organisationId AND interview_final_result_date = :interviewFinalResultDate) s GROUP BY interview_final_result", nativeQuery = true)
    List<Object[]> groupByInterviewFinalResults(@Param("organisationId") Integer organisationId, @Param("interviewFinalResultDate") LocalDate interviewFinalResultDate);


    @Query(value = "SELECT s.interview_final_result, COUNT(*) FROM (SELECT * FROM student WHERE organisation_id = :organisationId ) s GROUP BY interview_final_result", nativeQuery = true)
    List<Object[]> groupByInterviewFinalResults(@Param("organisationId") Integer organisationId);

    @Query(value = "SELECT s.interview_final_result, COUNT(*) FROM (SELECT * FROM student WHERE interview_final_result_date = :interviewFinalResultDate) s GROUP BY interview_final_result", nativeQuery = true)
    List<Object[]> groupByInterviewFinalResults(@Param("interviewFinalResultDate") LocalDate interviewFinalResultDate);

    @Query(value = "SELECT s.interview_final_result, COUNT(*) FROM student s GROUP BY interview_final_result", nativeQuery = true)
    List<Object[]> groupByInterviewFinalResults();

    List<Student> findByOrganisationOrganisationIdAndInterviewFinalResultDateAndInterviewFinalResult(Integer organisationId, LocalDate interviewFinalResultDate, String interviewFinalResult);

    List<Student> findByOrganisationOrganisationIdAndInterviewFinalResult(Integer organisationId, String interviewFinalResult);

    List<Student> findByOrganisationOrganisationId(Integer organisationId);


    List<Student> findByOrganisationOrganisationIdAndInterviewFinalResultDate(Integer organisationId, LocalDate interviewFinalResultDate);

    List<Student> findByInterviewFinalResultDateAndInterviewFinalResult( LocalDate interviewFinalResultDate, String interviewFinalResult);

    List<Student> findByInterviewFinalResultDate( LocalDate interviewFinalResultDate);

}
