package com.teletabisi.MedInstitutionApp.function.employee.service;

import com.teletabisi.MedInstitutionApp.entity.Appointment;
import com.teletabisi.MedInstitutionApp.entity.Equipment;
import com.teletabisi.MedInstitutionApp.entity.Room;
import com.teletabisi.MedInstitutionApp.repository.AppointmentRepository;
import com.teletabisi.MedInstitutionApp.repository.EquipmentRepository;
import com.teletabisi.MedInstitutionApp.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

/**
 * Autor: Tin Ogrizek
 * Cilj: Upravljanje podacima vezanih za termine dobivenih od strane korisnika (od strane zaposlenika)
 */
@Service
public class EmployeeAppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepo;

    @Autowired
    private RoomRepository roomRepo;

    @Autowired
    private EquipmentRepository equipmentRepo;

    public List<Appointment> getPendingAppointments() {
        return appointmentRepo.findByRoomIdAndEquipmentId(0L,0L);
    }

    public void acceptRequest(Long appointmentId, Long roomId, Long equipmentId) {
        Optional<Appointment> optionalAppointment = appointmentRepo.findById(appointmentId);

        try {
            Appointment appointment = optionalAppointment.orElseThrow(NoSuchElementException::new);

            Optional<Room> optionalRoom = roomRepo.findById(roomId);
            optionalRoom.ifPresent(appointment::setRoom);

            Optional<Equipment> optionalEquipment = equipmentRepo.findById(equipmentId);
            optionalEquipment.ifPresent(appointment::setEquipment);

            appointmentRepo.save(appointment);
        } catch (NoSuchElementException e){
            throw new NoSuchElementException("Nije nađen temrin (ID:  " + appointmentId + ")");
        }
    }

    public void rejectRequest(Long appointmentId) {
        Optional<Appointment> optionalAppointment = appointmentRepo.findById(appointmentId);

        try {
            Appointment appointment = optionalAppointment.orElseThrow(NoSuchElementException::new);

            appointmentRepo.deleteById(appointmentId);
        } catch (NoSuchElementException e){
            throw new NoSuchElementException("Nije nađen temrin (ID:  " + appointmentId + ")");
        }
    }
}
