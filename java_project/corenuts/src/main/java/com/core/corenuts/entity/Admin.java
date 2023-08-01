package com.core.corenuts.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "admin")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "admin_id")
    private int adminId;

    @Column(name = "admin_name")
    private String adminName;

    @JoinColumn(name = "admin_age")
    private Integer adminAge;

    @JoinColumn(name = "admin_gender")
    private String adminGender;

    @JoinColumn(name = "admin_mobile_number")
    private String adminMobileNumber;

    @JoinColumn(name = "admin_email")
    private String adminEmail;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id")
    private Address address;

}
