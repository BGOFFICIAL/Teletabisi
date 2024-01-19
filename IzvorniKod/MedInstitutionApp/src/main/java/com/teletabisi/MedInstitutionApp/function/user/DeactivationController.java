package com.teletabisi.MedInstitutionApp.function.user;

import com.teletabisi.MedInstitutionApp.entity.User;
import com.teletabisi.MedInstitutionApp.function.admin.request.DemotionRequest;
import com.teletabisi.MedInstitutionApp.function.user.service.InactiveService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/func/inactive")
@RequiredArgsConstructor
@CrossOrigin("*")
public class DeactivationController {

    @Autowired
    private InactiveService inactiveService;


    @PostMapping("")
    public ResponseEntity<String> inactive(@RequestBody DemotionRequest request) {
        if (request != null && request.getUsername() != null) {
            User demotedUser = inactiveService.inactivate(request.getUsername());

            if (demotedUser != null) {
                return ResponseEntity.ok("Deaktivacija korisnika");
            }
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}