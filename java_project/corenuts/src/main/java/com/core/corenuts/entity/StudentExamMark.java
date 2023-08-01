package com.core.corenuts.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "student_exam_mark")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data

public class StudentExamMark {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "student_exam_mark_id")
    private int studentExamMarkId;

    @Column(name="student_achieved_marks")
    private Integer studentAchievedMarks;

    @OneToOne
    @JsonBackReference
    @JoinColumn(name = "student_id")
    private Student student;

}
