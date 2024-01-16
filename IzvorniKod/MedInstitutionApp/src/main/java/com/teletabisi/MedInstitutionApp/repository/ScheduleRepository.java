package com.teletabisi.MedInstitutionApp.repository;

import com.teletabisi.MedInstitutionApp.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.Optional;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    Optional<Schedule> findByEquipmentIdAndDateTime(Long equipmentId, LocalDateTime requestedDateTime);

    Optional<Schedule> findByAppointmentId(Long appointmentId);
}
