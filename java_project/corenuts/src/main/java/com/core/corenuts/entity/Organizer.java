package com.core.corenuts.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "organizer")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Organizer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "organizer_id")
    private int organizerId;

    @Column(name = "organizer_name")
    private String organizerName;

    @JoinColumn(name = "organizer_gender")
    private String organizerGender;

    @JoinColumn(name = "organizer_mobile_number")
    private String organizerMobileNumber;

    @JoinColumn(name = "organizer_email")
    private String organizerEmail;

    @ManyToOne()
    @JoinColumn(name = "organisation_id")
    private Organisation organisation;
}
