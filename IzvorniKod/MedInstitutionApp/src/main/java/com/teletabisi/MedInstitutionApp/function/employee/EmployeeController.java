package com.teletabisi.MedInstitutionApp.function.employee;

import com.teletabisi.MedInstitutionApp.entity.Appointment;
import com.teletabisi.MedInstitutionApp.function.dto.EmployeeAcceptDTO;
import com.teletabisi.MedInstitutionApp.function.employee.service.EmployeeAppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/auth/appointment")
@RequiredArgsConstructor
public class EmployeeController {

    @Autowired
    private EmployeeAppointmentService employeeAppointmentService;

    @GetMapping("/control")
    public ResponseEntity<List<Appointment>> getPendingAppointments(){
        List<Appointment> pendingAppointments = employeeAppointmentService.getPendingAppointments();
        return new ResponseEntity<>(pendingAppointments, HttpStatus.OK);
    }

    @PostMapping("/accept/{appointmentId}")
    public ResponseEntity<Void> acceptRequest(@PathVariable Long appointmentId,
                                              @RequestBody EmployeeAcceptDTO employeeAcceptDTO){
        Long roomId = employeeAcceptDTO.getRoomId();
        Long equipmentId = employeeAcceptDTO.getEquipmentId();

        employeeAppointmentService.acceptRequest(appointmentId, roomId, equipmentId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/reject/{appointmentId}")
    public ResponseEntity<Void> rejectRequest(@PathVariable Long appointmentId){
        employeeAppointmentService.rejectRequest(appointmentId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
