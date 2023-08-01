package com.core.corenuts.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "interview_round")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class InterviewRound {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "interview_round_id")
    private int interviewRoundId;

    @Column(name = "interview_round_number")
    private Integer interviewRoundNumber;

    @Column(name = "interview_round_result")
    private String interviewRoundResult;

    @Column(name="interview_round_feedback")
    private String interviewRoundFeedback;

    @JoinColumn(name="interview_round_date")
    private LocalDate interviewRoundDate;

    @ManyToOne
    @JoinColumn(name = "interviewer_id")
    private Interviewer interviewer;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    @OneToMany(cascade =CascadeType.ALL)
    @JoinColumn(name = "interview_round_id"
            , referencedColumnName = "interview_round_id")
    private List<InterviewSkillRating> interviewSkillRatings;
}
