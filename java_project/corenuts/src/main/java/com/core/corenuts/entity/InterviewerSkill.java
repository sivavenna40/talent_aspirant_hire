package com.core.corenuts.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "interviewer_skill")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class InterviewerSkill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "interviewer_skill_id")
    private int interviewerSkillId;

    @Column(name = "interviewer_skill_name")
    private String interviewerSkillName;

}
