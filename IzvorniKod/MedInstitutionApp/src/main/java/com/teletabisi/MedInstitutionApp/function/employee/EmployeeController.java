package com.teletabisi.MedInstitutionApp.function.employee;

import com.teletabisi.MedInstitutionApp.entity.Appointment;
import com.teletabisi.MedInstitutionApp.function.dto.EmployeeAcceptDTO;
import com.teletabisi.MedInstitutionApp.function.employee.request.AppointmentDateTimeRequest;
import com.teletabisi.MedInstitutionApp.function.employee.service.EmployeeAppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth/appointment")
@RequiredArgsConstructor
public class EmployeeController {

    @Autowired
    private EmployeeAppointmentService employeeAppointmentService;

    /**
     * Dohvaćanje svih termina u sustavu
     * @return
     */
    @GetMapping("all-appointments")
    public ResponseEntity<List<Appointment>> getAllAppointments(){
        List<Appointment> allAppointments = employeeAppointmentService.getAllAppointments();

        return new ResponseEntity<>(allAppointments, HttpStatus.OK);
    }

    /**
     * Dohvaćanje svih PENDING termina u sustavu
     * @return
     */
    @GetMapping("/control")
    public ResponseEntity<List<Appointment>> getPendingAppointments(){
        List<Appointment> pendingAppointments = employeeAppointmentService.getPendingAppointments();
        return new ResponseEntity<>(pendingAppointments, HttpStatus.OK);
    }

    /**
     * Prihvaćanje određenog zahtjeva za novim terminom
     * @param appointmentId
     * @param employeeAcceptDTO
     * @return
     */
    @PostMapping("/accept/{appointmentId}")
    public ResponseEntity<Object> acceptRequest(@PathVariable Long appointmentId,
                                              @RequestBody EmployeeAcceptDTO employeeAcceptDTO){
        String equipmentName = employeeAcceptDTO.getEquipmentName();

        List<LocalDateTime> newDateTimes = employeeAppointmentService.acceptRequest(appointmentId, equipmentName);

        if(newDateTimes != null){
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Room or equipment is not available at the requested time.");
            response.put("newAvailableDateTimes", newDateTimes);
            return new ResponseEntity<>(response, HttpStatus.CONFLICT);
        } else{
            return new ResponseEntity<>(HttpStatus.OK);
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
}
