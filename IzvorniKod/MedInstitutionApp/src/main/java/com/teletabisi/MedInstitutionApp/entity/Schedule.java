package com.teletabisi.MedInstitutionApp.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Schedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private Room room;

    @ManyToOne(optional = false)
    private Equipment equipment;

    @ManyToOne(optional = false)
    private Appointment appointment;

    private LocalDateTime dateTime;

    private int roomCapacity;

    private String equipmentStatus;
}
