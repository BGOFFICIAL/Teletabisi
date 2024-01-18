package com.teletabisi.MedInstitutionApp.function.user;

import com.teletabisi.MedInstitutionApp.entity.User;
import com.teletabisi.MedInstitutionApp.function.user.request.DemotiranjeRequest;
import com.teletabisi.MedInstitutionApp.function.user.service.PomocService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/v1/func/inactive")
@RequiredArgsConstructor
@CrossOrigin("*")

public class InactiveController {

    @Autowired
    private PomocService pomocServicer;

    /**
     * Cilj: employee -> inactive
     *
     * @param request
     * @return
     */

    @PostMapping("/remove/all")
    public ResponseEntity<String> demotion(@RequestBody DemotiranjeRequest request) {
        if (request != null && request.getUsername() != null) {
            User demotedUser = pomocServicer.demoteUser(request.getUsername());

            if (demotedUser != null) {
                return ResponseEntity.ok("Djelatnik neaktivan");
            }
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}
