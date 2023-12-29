package com.teletabisi.MedInstitutionApp.repository;

import com.teletabisi.MedInstitutionApp.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Autor: Neven Pralas;
 * Cilj: Dohvaćanje iz Appointment-a
 */
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByRoomIdAndEquipmentId(Long roomId, Long equipmentId);

    boolean existsByAppointmentTimeBetweenAndUserId(LocalDateTime startOfDay, LocalDateTime endOfDay, Long id);

    List<Appointment> findByUserId(Long userId);

    List<Appointment> findByUserIdAndAppointmentTime(Long userId, LocalDateTime currentDateTime);
}
