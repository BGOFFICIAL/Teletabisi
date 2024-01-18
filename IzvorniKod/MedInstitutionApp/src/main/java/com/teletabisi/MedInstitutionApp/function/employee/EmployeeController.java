package com.teletabisi.MedInstitutionApp.function.employee;

import com.teletabisi.MedInstitutionApp.email.MailService;
import com.teletabisi.MedInstitutionApp.email.MailStructure;
import com.teletabisi.MedInstitutionApp.entity.*;
import com.teletabisi.MedInstitutionApp.function.dto.EmployeeAcceptDTO;
import com.teletabisi.MedInstitutionApp.function.dto.SearchUserDTO;
import com.teletabisi.MedInstitutionApp.function.employee.request.AppointmentDateTimeRequest;
import com.teletabisi.MedInstitutionApp.function.employee.service.EmployeeAppointmentService;
import com.teletabisi.MedInstitutionApp.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/api/v1/func/appointment")
@RequiredArgsConstructor
@CrossOrigin("*")
public class EmployeeController {

    @Autowired
    private EmployeeAppointmentService employeeAppointmentService;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EquipmentRepository equipmentRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private ScheduleRepository scheduleRepository;


    @Autowired
    private MailService mailService;

    /**
     * Dohvaćanje svih termina u sustavu
     * @return
     */
    @GetMapping("all-appointments")
    public ResponseEntity<List<Appointment>> getAllAppointments(@AuthenticationPrincipal User user){

        List<Appointment> allAppointments = employeeAppointmentService.getAllAppointments(user);

        return new ResponseEntity<>(allAppointments, HttpStatus.OK);
    }

    /**
     * Dohvaćanje svih PENDING termina u sustavu
     * @return
     */
    @GetMapping("/control")
    public ResponseEntity<List<Appointment>> getPendingAppointments(@AuthenticationPrincipal User user){
        List<Appointment> pendingAppointments = employeeAppointmentService.getPendingAppointments(user);
        return new ResponseEntity<>(pendingAppointments, HttpStatus.OK);
    }


    @GetMapping("/getEquipment")
    public ResponseEntity<Set<String>> getEquipment(@AuthenticationPrincipal User user){
        Set<String> equipment = employeeAppointmentService.getEquipment();
        return new ResponseEntity<>(equipment, HttpStatus.OK);
    }

    @GetMapping("/searchUser/{oib}")
    public ResponseEntity<List<Appointment>> searchUser(@PathVariable String oib,
                                                        @AuthenticationPrincipal User useric){
        List<Appointment> appointments = new ArrayList<>();
        User user = userRepository.findFirstByOIB(oib).orElse(null);
        appointments = employeeAppointmentService.searchUser(user);

        return new ResponseEntity<>(appointments, HttpStatus.OK);

    }
    /**
     * Prihvaćanje određenog zahtjeva za novim terminom
     * @param appointmentId
     * @param employeeAcceptDTO
     * @return
     */
    @PostMapping("/accept/{appointmentId}")
    public ResponseEntity<Object> acceptRequest(@PathVariable Long appointmentId,
                                                @RequestBody EmployeeAcceptDTO employeeAcceptDTO,
                                                @AuthenticationPrincipal User useric){
        String equipmentName = employeeAcceptDTO.getEquipmentName();

        List<Appointment> appointmentsDjelatnik = appointmentRepository.findByDjelatnikId(useric.getId());


        for(Appointment appointment: appointmentsDjelatnik){
            if(appointment.getAppointmentTime().equals(appointmentRepository.findById(appointmentId).orElse(null).getAppointmentTime())) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }


            List<LocalDateTime> newDateTimes = employeeAppointmentService.acceptRequest(appointmentId, equipmentName, useric);

            if (newDateTimes != null) {
                Map<String, Object> response = new HashMap<>();
                response.put("message", "Room or equipment is not available at the requested time.");
                response.put("newAvailableDateTimes", newDateTimes);
                return new ResponseEntity<>(response, HttpStatus.CONFLICT);
            } else {

                Appointment appointment = appointmentRepository.findById(appointmentId).orElse(null);



            /*
autor: Neven Pralas
Opis: Prihvaćanje termina == slanje maila
 */
                if (appointment != null) {
                    MailStructure mailStructure = new MailStructure();
                    mailStructure.setSubject("Poruka o potvrdi termina.");
                    mailStructure.setMessage("Potvrđen je vaš termin!");

                    User user = appointment.getUser();
                    String userEmail = user.getEmail();

                    //ZASAD        mailService.sendMail(userEmail, mailStructure);

                    return new ResponseEntity<>(HttpStatus.OK);
                } else {
                    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
                }

        }
    }

    /**
     * Slanje novog datuma za određeni termin koji nije prihvaćen u vrijeme traženo od strane korisnika
     * @param appointmentId
     * @param request
     * @return
     */
    @PostMapping("/new-appointment-date/{appointmentId}")
    public ResponseEntity<Object> setNewAppointmentDateTime(@PathVariable Long appointmentId,
                                                            @RequestBody AppointmentDateTimeRequest request){
        LocalDateTime newDateTime = request.getNewAppointmentDateTime();
        String equipmentName = request.getEquipmentName();
        employeeAppointmentService.setNewAppointmentDateTime(appointmentId, newDateTime, equipmentName);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * Odbijanje zahtjeva za terminom koji su PENDING
     * @param appointmentId
     * @return
     */
    @DeleteMapping("/reject/{appointmentId}")
    public ResponseEntity<Void> rejectRequest(@PathVariable Long appointmentId){
        employeeAppointmentService.rejectRequest(appointmentId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * Brisanje odabranog termina u sustavu (neovisno o statusu)
     * @param appointmentId
     * @return
     */
    @DeleteMapping("delete/{appointmentId}")
    public ResponseEntity<Void> deleteAppointment(@PathVariable Long appointmentId){
        employeeAppointmentService.deleteAppointment(appointmentId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/otkazi/{appointmentId}")
    public ResponseEntity<Void> otkaziAppointment(@PathVariable Long appointmentId){
        Appointment appointment = appointmentRepository.findById(appointmentId).orElse(null);

        Equipment equipment = equipmentRepository.findById(0L).orElse(null);
        Room room = roomRepository.findById(0L).orElse(null);

        appointment.setDjelatnik(null);
        appointment.setEquipment(equipment);
        appointment.setRoom(room);

        Schedule schedule = scheduleRepository.findByAppointmentId(appointmentId).orElse(null);

        
        scheduleRepository.delete(schedule);


        appointmentRepository.save(appointment);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
