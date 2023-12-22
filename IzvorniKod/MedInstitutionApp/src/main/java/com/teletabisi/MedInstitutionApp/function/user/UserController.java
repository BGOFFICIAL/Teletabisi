package com.teletabisi.MedInstitutionApp.function.user;

import com.teletabisi.MedInstitutionApp.entity.Appointment;
import com.teletabisi.MedInstitutionApp.entity.User;
import com.teletabisi.MedInstitutionApp.function.dto.UserAppointmentDTO;
import com.teletabisi.MedInstitutionApp.function.user.service.UserAppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

/**
 * Autor: Tin Ogrizek
 * Cilj: Upravljanje podacima vezanih za termine dobivenih od strane korisnika
 */

@RestController
@RequestMapping("/api/v1/auth/appointment")
@RequiredArgsConstructor
public class UserController {

    @Autowired
    private UserAppointmentService userAppointmentService;

    @PostMapping("")
    public ResponseEntity<Appointment> createAppointment(@RequestBody UserAppointmentDTO userAppointmentDTO,
                                                         @AuthenticationPrincipal User user){
        Appointment appointment = userAppointmentService.save(userAppointmentDTO, user);
        return ResponseEntity.ok(appointment);
    }
}
