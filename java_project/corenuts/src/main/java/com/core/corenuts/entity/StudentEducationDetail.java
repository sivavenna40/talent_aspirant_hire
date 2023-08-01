package com.core.corenuts.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "student_education_detail")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class StudentEducationDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "student_education_detail_id")
    private int studentEducationDetailId;

    @Column(name="degree")
    private String degree;

    @Column(name="degree_stream")
    private String degreeStream;

    @Column(name="tenth_aggregate")
    private double tenthAggregate;

    @Column(name="twelth_aggregate")
    private double twelthAggregate;

    @Column(name="diploma_aggregate")
    private double diplomaAggregate;

    @Column(name="degree_aggregate")
    private double degreeAggregate;

    @Column(name="masters_aggregate")
    private double mastersAggregate;

    @Column(name="year_of_passout")
    private String yearOfPassout;

    @ManyToOne
    @JoinColumn(name = "primary_skill")
    private InterviewerSkill primarySkill;

    @ManyToOne
    @JoinColumn(name="secondary_skill")
    private InterviewerSkill secondarySkill;

    @Column(name = "other_skills")
    private String otherSkills;

}
