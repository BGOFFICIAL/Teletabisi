package com.teletabisi.MedInstitutionApp.function.employee.service;

import com.teletabisi.MedInstitutionApp.entity.Appointment;
import com.teletabisi.MedInstitutionApp.entity.Equipment;
import com.teletabisi.MedInstitutionApp.entity.Room;
import com.teletabisi.MedInstitutionApp.entity.Schedule;
import com.teletabisi.MedInstitutionApp.repository.AppointmentRepository;
import com.teletabisi.MedInstitutionApp.repository.EquipmentRepository;
import com.teletabisi.MedInstitutionApp.repository.RoomRepository;
import com.teletabisi.MedInstitutionApp.repository.ScheduleRepository;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.util.*;

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

    @Autowired
    private ScheduleRepository scheduleRepo;

    @Getter
    @Setter
    private Long foundEquipmentId;

    @Getter
    @Setter
    private Map<Room, LocalDateTime> roomLocalDateTimeMap;

    @Getter
    @Setter
    private Map<Equipment, LocalDateTime> equipmentLocalDateTimeMap;

    /**
     * Dohvaćanje svih uahtjeva za pregled koji su PENDING
     * @return
     */
    public List<Appointment> getPendingAppointments() {
        return appointmentRepo.findByRoomIdAndEquipmentId(0L,0L);
    }

    public List<Appointment> getAllAppointments(){
        return appointmentRepo.findAll()
                .stream()
                .filter(a -> a.getEquipment().getId() != 0 &&
                        a.getRoom().getId() != 0)
                .toList();
    }
    /**
     * Prihvaćanje zahtjeva za pregled - ako postoji slobodni termin tada se stvara novi Appointment,
     * a ako ne, tada se pronalaze novi termini i šalju zaposleniku
     * @param appointmentId
     * @param equipmentName
     * @return
     */
    public List<LocalDateTime> acceptRequest(Long appointmentId, String equipmentName) {
        Optional<Appointment> optionalAppointment = appointmentRepo.findById(appointmentId);

        try {
            Appointment appointment = optionalAppointment.orElseThrow(NoSuchElementException::new);

            LocalDateTime requestedDateTime = optionalAppointment.get().getAppointmentTime();

            if (checkEquipmentAvailability(equipmentName, requestedDateTime)){

                Optional<Schedule> schedule = scheduleRepo.findByEquipmentIdAndDateTime(foundEquipmentId, requestedDateTime);

                if (schedule.isPresent()){
                    Schedule existingSchedule = schedule.get();
                    int currentCapacity = existingSchedule.getRoomCapacity();

                    // smanjivanje kapaciteta sobe za taj datum i taj sat za 1
                    //existingSchedule.setRoomCapacity(currentCapacity - 1);
                    existingSchedule.setRoomCapacity(0);
                    scheduleRepo.save(existingSchedule);

                    // ažuriranje tablice Appointment
                    Optional<Room> optionalRoom = Optional.ofNullable(existingSchedule.getRoom());
                    optionalRoom.ifPresent(appointment::setRoom);

                    Optional<Equipment> optionalEquipment = Optional.ofNullable(existingSchedule.getEquipment());
                    optionalEquipment.ifPresent(appointment::setEquipment);

                    appointmentRepo.save(appointment);
                } else{
                    // Ne postoji instanca Schedule, radimo ju iz nule i spremamo podatke u Schedule i Appointment
                    Optional<Equipment> optionalEquipment = equipmentRepo.findById(foundEquipmentId);
                    if (optionalEquipment.isPresent()){
                        Room room = optionalEquipment.get().getRoom();
                        Equipment equipment = optionalEquipment.get();
                        Schedule newSchedule = new Schedule();

                        newSchedule.setDateTime(requestedDateTime);
                        newSchedule.setEquipment(equipment);
                        newSchedule.setRoom(room);
                        //newSchedule.setRoomCapacity(room.getCapacity() - 1);
                        newSchedule.setRoomCapacity(0);
                        newSchedule.setAppointment(appointment);
                        newSchedule.setEquipmentStatus("NEDOSTUPNO");

                        scheduleRepo.save(newSchedule);

                        // ažuriranje tablice Appointment
                        appointment.setEquipment(equipment);
                        appointment.setRoom(room);

                        appointmentRepo.save(appointment);
                    } else{
                        throw new NoSuchElementException("Nema te opreme (ID: " + equipmentName);
                    }
                }
                return null;
            } else{
                // Nema slobodnog mjesta za taj pregled u tom terminu te se šalju novi slobodni termini
                return findNextAvailableTimeAndDate(equipmentName, requestedDateTime);
            }
        } catch (NoSuchElementException e){
            throw new NoSuchElementException("Nije nađen temrin (ID:  " + appointmentId + ")");
        }
    }

    /**
     * Provjerava se je li određena oprema slobodna u zadanom terminu
     * @param equipmentName
     * @param requestedDateTime
     * @return
     */
    private boolean checkEquipmentAvailability(String equipmentName, LocalDateTime requestedDateTime) {
        List<Equipment> allEquipment = equipmentRepo.findIdsByName(equipmentName);

        for (Equipment equipment : allEquipment){
            Long equipmentId = equipment.getId();
            Optional<Schedule> schedule = scheduleRepo.findByEquipmentIdAndDateTime(equipmentId, requestedDateTime);

            if (schedule.isEmpty() || schedule.get().getRoomCapacity() > 0) {
                setFoundEquipmentId(equipmentId);
                return true;
            }
        }
        return false;
    }

    /**
     * Pronalazak svih slobodnih termina za zadanu opremu u periodu od tjedan dana od zadanog datuma
     * @param equipmentName
     * @param requestedDateTime
     * @return
     */
    private List<LocalDateTime> findNextAvailableTimeAndDate(String equipmentName, LocalDateTime requestedDateTime) {
        List<LocalDateTime> availableDatesAndTime = new ArrayList<>();

        LocalDateTime oneWeekAfter = requestedDateTime.plusWeeks(1);

        while (requestedDateTime.isBefore(oneWeekAfter)){
            if (checkEquipmentAvailability(equipmentName, requestedDateTime) && isWithinWorkingHours(requestedDateTime)){
                availableDatesAndTime.add(requestedDateTime);
            }
            requestedDateTime = requestedDateTime.plusHours(1);
        }

        return availableDatesAndTime;
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
     * Odbijanje zahtjeva za pregledom koji je označen kao PENDING zahtjev (briše se iz baze podataka)
     * @param appointmentId
     */
    public void rejectRequest(Long appointmentId) {
        Optional<Appointment> optionalAppointment = appointmentRepo.findById(appointmentId);
        try {
            Appointment appointment = optionalAppointment.orElseThrow(NoSuchElementException::new);

            appointmentRepo.deleteById(appointmentId);
        } catch (NoSuchElementException e){
            throw new NoSuchElementException("Nije nađen temrin (ID:  " + appointmentId + ")");
        }
    }

    /**
     * Uklanjanje (brisanje) određenog Appointmenta iz baze podataka
     * (samim time i prikladnog Schedule retka u tablici Schedule)
     * @param appointmentId
     */
    public void deleteAppointment(Long appointmentId){
        Optional<Appointment> optionalAppointment = appointmentRepo.findById(appointmentId);
        Optional<Schedule> optionalSchedule = scheduleRepo.findByAppointmentId(appointmentId);

        try {
            Appointment appointment = optionalAppointment.orElseThrow(NoSuchElementException::new);
            Schedule schedule = optionalSchedule.orElseThrow(NoSuchElementException::new);

            scheduleRepo.deleteById(schedule.getId());
            appointmentRepo.deleteById(appointmentId);
        } catch (NoSuchElementException e){
            throw new NoSuchElementException("Nije nađen temrin (ID:  " + appointmentId + ")");
        }
    }

    /**
     * Zaposlenik odabire neki od ponuđenih slobodnih termina te se na temelju toga svi podaci spremaju u bazu
     * podataka (trebala bi se poslati email obavijest korisniku te se ovisno o njegovom odgovoru taj Appointment
     * ili briše ili ostavlja u bazi podataka)
     * @param appointmentId
     * @param newDateTime
     * @param equipmentName
     */
    public void setNewAppointmentDateTime(Long appointmentId, LocalDateTime newDateTime, String equipmentName) {
       Optional<Appointment> appointment = appointmentRepo.findById(appointmentId);

       if (appointment.isPresent() && checkEquipmentAvailability(equipmentName, newDateTime)){
           Appointment existingAppointment = appointment.get();

           Optional<Equipment> optionalEquipment = equipmentRepo.findById(foundEquipmentId);
           if(optionalEquipment.isPresent()){
               Room room = optionalEquipment.get().getRoom();
               Equipment equipment = optionalEquipment.get();
               Schedule newSchedule = new Schedule();

               newSchedule.setDateTime(newDateTime);
               newSchedule.setEquipment(equipment);
               newSchedule.setRoom(room);
               //newSchedule.setRoomCapacity(room.getCapacity() - 1);
               newSchedule.setRoomCapacity(0);
               newSchedule.setAppointment(existingAppointment);
               newSchedule.setEquipmentStatus("NEDOSTUPNO");

               scheduleRepo.save(newSchedule);

               existingAppointment.setEquipment(equipment);
               existingAppointment.setRoom(room);
               existingAppointment.setAppointmentTime(newDateTime);

               appointmentRepo.save(existingAppointment);
           }

       }
    }
}
