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

    public Appointment save(UserAppointmentDTO userAppointmentDTO, User user) {
        if (appointmentRepo.existsByAppointmentDateAndUserId(userAppointmentDTO.getDate(), user.getId())){
            throw new RuntimeException("Već je zadan pregled toga datuma.");
        }

        Appointment appointment = new Appointment();
        appointment.setDescription(userAppointmentDTO.getDescription());
        appointment.setAppointmentDate(userAppointmentDTO.getDate());
        appointment.setUser(user);

        // postavljanje na PENDING vrijednosti za Room i Equipment
        Room room = roomRepo.getRoomById(0L);
        Equipment equipment = equipmentRepo.getEquipmentById(0L);
        appointment.setRoom(room);
        appointment.setEquipment(equipment);
        return appointmentRepo.save(appointment);
    }
}
