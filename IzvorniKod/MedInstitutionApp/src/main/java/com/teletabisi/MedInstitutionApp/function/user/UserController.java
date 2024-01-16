package com.teletabisi.MedInstitutionApp.function.user;

import com.teletabisi.MedInstitutionApp.entity.Appointment;
import com.teletabisi.MedInstitutionApp.entity.User;
import com.teletabisi.MedInstitutionApp.function.dto.UserAppointmentDTO;
import com.teletabisi.MedInstitutionApp.function.user.service.UserAppointmentService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Autor: Tin Ogrizek
 * Cilj: Upravljanje podacima vezanih za termine dobivenih od strane korisnika
 */

@RestController
@RequestMapping("/api/v1/func/appointment/request")
@RequiredArgsConstructor
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserAppointmentService userAppointmentService;

    private final Map<Long, Long> userLastRequestTime = new HashMap<>();

    /**
     * Korisnik šalje opis problema, datum i vrijeme kada želi termin. Sustav omogućava slanje zahtjeva jednom u
     * minuti - spriječavanje spam-a
     * @param user
     * @return
     */
    @PostMapping("")
    public ResponseEntity<Object> createAppointment(@RequestBody UserAppointmentDTO userAppointmentDTO,
                                                    @AuthenticationPrincipal User user) {
        try {
            Long userId = user.getId();

            // Uvjet koji ograničava slanje po jednom zahtjevu u minuti za svakog korisnika
            if (userLastRequestTime.containsKey(userId)) {
                long lastRequestedTime = userLastRequestTime.get(userId);
                long currentTime = System.currentTimeMillis();

                long requestLimitInterval = 60 * 1000;
                if (currentTime - lastRequestedTime < requestLimitInterval) {
                    return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body("Pričekajte " + requestLimitInterval / 1000 + " sekundi.");
                }
            }

            // Nastavite s postojećim kodom
            Appointment appointment = userAppointmentService.save(userAppointmentDTO, user);

            userLastRequestTime.put(userId, System.currentTimeMillis());

            return ResponseEntity.ok(appointment);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Neispravan format JSON podataka.");
        }
    }

    /**
     * Korisniku se prikazuju svi prijašnji opisi problema koje je upisao
     * prilikom upisa novog zahtjeva za temrin
     * @param user
     * @return
     */
    @GetMapping("descriptions")
    public ResponseEntity<List<String>> getUserDescriptions(@AuthenticationPrincipal User user){

        Long userId = user.getId();
        List<String> userDescriptions = userAppointmentService.getUserDescriptions(userId);

        if (userDescriptions.isEmpty()){
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(userDescriptions);
    }

    /**
     * Korisniku se prikazuju svi termini koje već ima zakazane u budućnosti (od trenutka kada zatraži pregled)
     * @param user
     * @return
     */
    @GetMapping("all-appointments")
    public ResponseEntity<List<Appointment>> getAllUserAppointments(@AuthenticationPrincipal User user){
        Long userId = user.getId();
        List<Appointment> userAppointments = userAppointmentService.getUserAppointments(userId);

        if (userAppointments.isEmpty()){
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(userAppointments);
    }
}
