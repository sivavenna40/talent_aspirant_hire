package com.core.corenuts.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "interview_skill")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class InterviewSkill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "interview_skill_id")
    private int interviewSkillId;

    @Column(name = "interview_skill_name")
    private String interviewSkillName;

}
