package com.core.corenuts.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "interview_skill_rating")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class InterviewSkillRating {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "interview_skill_rating_id")
    private int interviewSkillRatingId;

    @Column(name = "interview_skill_rating_achieved")
    private Integer interviewSkillRatingAchieved;

    @Column(name="interview_skill_feedback")
    private String interviewSkillFeedback;

    @ManyToOne
    @JoinColumn(name = "interview_skill_id")
    private InterviewSkill interviewSkill;

}
