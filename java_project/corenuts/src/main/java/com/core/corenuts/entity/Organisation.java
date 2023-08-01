package com.core.corenuts.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "organisation")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString(exclude = "interviewSchedules")
public class Organisation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "organisation_id")
    private int organisationId;

    @Column(name = "organisation_name")
    private String organisationName;

    @JoinColumn(name = "organisation_mobile_number")
    private String organisationMobileNumber;

    @JoinColumn(name = "organisation_email")
    private String organisationEmail;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id")
    private Address address;

    @JsonIgnore
    @OneToMany(mappedBy = "organisation")
    private List<InterviewSchedule> interviewSchedules;
}
