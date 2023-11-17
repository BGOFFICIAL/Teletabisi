package com.teletabisi.MedInstitutionApp.entity;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity

public class Appointment{

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY )
    private Long id;
    private String status;

    @ManyToOne(optional = false)
    private User user;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}

