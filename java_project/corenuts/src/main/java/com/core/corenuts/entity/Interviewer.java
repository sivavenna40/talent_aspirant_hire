package com.core.corenuts.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "interviewer")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Interviewer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "interviewer_id")
    private int interviewerId;

    @Column(name = "interviewer_name")
    private String interviewerName;

    @Column(name = "interviewer_age")
    private Integer interviewerAge;

    @Column(name = "interviewer_gender")
    private String interviewerGender;

    @Column(name = "interviewer_mobile_number")
    private String interviewerMobileNumber;

    @Column(name = "interviewer_email")
    private String interviewerEmail;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id")
    private Address address;


    @ManyToMany()
    @JoinTable(
            name = "interviewer_interviewer_skills",
            joinColumns = {
                    @JoinColumn(name = "interviewer_id")
            },
            inverseJoinColumns = {
                    @JoinColumn(name = "interviewer_skill_id")
            }
    )
    private List<InterviewerSkill> interviewerSkills;

}
