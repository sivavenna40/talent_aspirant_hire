package com.core.corenuts.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "student")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString(exclude = {"studentExamMark"})
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "student_id")
    private Integer studentId;

    @Column(name = "student_name")
    private String studentName;

    @JoinColumn(name = "student_dob")
    private LocalDate studentDob;

    @JoinColumn(name = "student_gender")
    private String studentGender;

    @JoinColumn(name = "student_mobile_number")
    private String studentMobileNumber;

    @JoinColumn(name = "student_email")
    private String studentEmail;

    @Column(name = "student_aadhar_number",unique = true)
    private Long studentAadharNumber;

    @Column(name="interview_final_result",columnDefinition = "varchar(255) default 'Not Attended'")
    private String interviewFinalResult;

    @JoinColumn(name="interview_final_result_date")
    private LocalDate interviewFinalResultDate;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id")
    private Address address;

    @ManyToOne
    @JoinColumn(name = "organisation_id")
    private Organisation organisation;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "student_education_detail_id")
    private StudentEducationDetail studentEducationDetail;

    @JsonManagedReference
    @OneToOne(mappedBy = "student",cascade = CascadeType.ALL)
    @JoinColumn(name = "student_exam_mark_id")
    private StudentExamMark studentExamMark;
}
