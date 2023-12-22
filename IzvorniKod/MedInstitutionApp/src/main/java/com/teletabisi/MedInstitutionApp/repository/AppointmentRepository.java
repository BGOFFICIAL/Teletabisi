package com.teletabisi.MedInstitutionApp.repository;

import com.teletabisi.MedInstitutionApp.entity.Appointment;
import com.teletabisi.MedInstitutionApp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

/**
 * Autor: Neven Pralas;
 * Cilj: Dohvaćanje iz Appointment-a
 */
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    boolean existsByAppointmentDateAndUserId(Date date, Long id);

    List<Appointment> findByRoomIdAndEquipmentId(Long roomId, Long equipmentId);
}
