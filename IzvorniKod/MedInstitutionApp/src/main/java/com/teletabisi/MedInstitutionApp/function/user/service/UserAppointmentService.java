package com.teletabisi.MedInstitutionApp.function.user.service;

import com.teletabisi.MedInstitutionApp.entity.Appointment;
import com.teletabisi.MedInstitutionApp.entity.Equipment;
import com.teletabisi.MedInstitutionApp.entity.Room;
import com.teletabisi.MedInstitutionApp.entity.User;
import com.teletabisi.MedInstitutionApp.function.dto.UserAppointmentDTO;
import com.teletabisi.MedInstitutionApp.repository.AppointmentRepository;
import com.teletabisi.MedInstitutionApp.repository.EquipmentRepository;
import com.teletabisi.MedInstitutionApp.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

/**
 * Autor: Tin Ogrizek
 * Cilj: Upravljanje podacima vezanih za termine dobivenih od strane korisnika
 */

@Service
public class UserAppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepo;

    @Autowired
    private RoomRepository roomRepo;

    @Autowired
    private EquipmentRepository equipmentRepo;

    /**
     * Spremanje zahtjeva poslanog od strane korisnika kao PENDING zahtjev u bazu podataka
     * @param userAppointmentDTO
     * @param user
     * @return
     */
    public Appointment save(UserAppointmentDTO userAppointmentDTO, User user) {
        LocalDateTime appointmentDateTime = userAppointmentDTO.getDateTime();
        LocalDate appointmentDate = appointmentDateTime.toLocalDate();

        LocalDateTime startOfDay = appointmentDate.atStartOfDay();
        LocalDateTime endOfDay = appointmentDate.atTime(LocalTime.MAX);
        // Provjera je li korisnik već prije zadao zahtjev za taj datum
        if (appointmentRepo.existsByAppointmentTimeBetweenAndUserId(startOfDay, endOfDay, user.getId())) {
            throw new RuntimeException("Već je zadan pregled toga datuma.");
        }
        // Provjera jesu li datum i vrijeme unutar radnog vremena
        if (!isWithinWorkingHours(appointmentDateTime)){
            throw new RuntimeException("Zadani termin (" + appointmentDateTime + ") je izvan radnog vremena.");
        }
        Appointment appointment = new Appointment();
        appointment.setDescription(userAppointmentDTO.getDescription());
        appointment.setAppointmentTime(userAppointmentDTO.getDateTime());
        appointment.setUser(user);

        // postavljanje na PENDING vrijednosti za Room i Equipment
        Room room = roomRepo.getRoomById(0L);
        Equipment equipment = equipmentRepo.getEquipmentById(0L);
        appointment.setRoom(room);
        appointment.setEquipment(equipment);
        return appointmentRepo.save(appointment);
    }

    /**
     * Provjera jesu li određeni datum i vrijeme unutar zadanog radnog vremena (pon - pet, od 08:00 do 20:00)
     * @param requestedDateTime
     * @return
     */
    private boolean isWithinWorkingHours(LocalDateTime requestedDateTime) {
        DayOfWeek dayOfWeek = requestedDateTime.getDayOfWeek();
        int hour = requestedDateTime.getHour();

        return dayOfWeek != DayOfWeek.SATURDAY && dayOfWeek != DayOfWeek.SUNDAY && hour >= 8 && hour <= 19;
    }

    /**
     * Dohvaćanje svih opisa problema za svakog korisnika (gledaju se samo prihaćeni Appointmenti)
     * @param userId
     * @return
     */
    public List<String> getUserDescriptions(Long userId) {
        List<Appointment> appointments = appointmentRepo.findByUserId(userId);

        List<String> descriptions = new ArrayList<>();

        for (Appointment appointment : appointments){
            if (!descriptions.contains(appointment.getDescription()) && appointment.getEquipment().getId() != 0
            && appointment.getRoom().getId() != 0){
                descriptions.add(appointment.getDescription());
            }
        }
        return descriptions;
    }

    /**
     * Dohvaćanje svih Appointment-a koje korisnik ima u budućnosti (koji su prihvaćeni)
     * @param userId
     * @return
     */
    public List<Appointment> getUserAppointments(Long userId) {
        LocalDateTime currentDateTime = LocalDateTime.now();

        List<Appointment> userAppointments = appointmentRepo.findByUserId(userId);

        return userAppointments != null ?
                userAppointments.stream()
                        .filter(i -> i.getAppointmentTime().isAfter(currentDateTime) &&
                                i.getRoom() != null && i.getRoom().getId() != 0 &&
                                i.getEquipment() != null && i.getEquipment().getId() != 0)
                        .toList()
                : Collections.emptyList();
    }
}
