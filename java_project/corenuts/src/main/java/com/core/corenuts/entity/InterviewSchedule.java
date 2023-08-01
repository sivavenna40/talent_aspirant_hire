package com.core.corenuts.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "interview_schedule")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class InterviewSchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "interview_schedule_id")
    private int interviewScheduleId;

    @Column(name = "interview_schedule_date")
    private LocalDate interviewScheduleDate;

    @ManyToOne
    @JoinColumn(name = "organisation_id")
    private Organisation organisation;

    @ManyToMany()
    @JoinTable(name = "interview_schedule_interviewer",
            joinColumns = @JoinColumn(name = "interview_schedule_id"),
            inverseJoinColumns = @JoinColumn(name = "interviewer_id"))
    private List<Interviewer> interviewers;

}
