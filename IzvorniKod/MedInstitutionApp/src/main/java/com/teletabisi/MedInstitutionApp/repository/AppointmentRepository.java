package com.teletabisi.MedInstitutionApp.repository;

import com.teletabisi.MedInstitutionApp.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Autor: Neven Pralas;
 * Cilj: Dohvaćanje iz Appointment-a
 */
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
}
