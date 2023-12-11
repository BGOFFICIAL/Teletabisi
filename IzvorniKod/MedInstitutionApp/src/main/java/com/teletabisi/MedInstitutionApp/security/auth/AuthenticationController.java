package com.teletabisi.MedInstitutionApp.security.auth;

import com.teletabisi.MedInstitutionApp.security.auth.request.AuthenticationRequest;
import com.teletabisi.MedInstitutionApp.security.auth.request.RegisterRequest;
import com.teletabisi.MedInstitutionApp.security.auth.request.UpdateRequest;
import com.teletabisi.MedInstitutionApp.security.auth.response.AuthenticationResponse;
import com.teletabisi.MedInstitutionApp.security.auth.serivce.AuthenticationService;
import com.teletabisi.MedInstitutionApp.security.auth.serivce.CsvService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;

    @Autowired
    private CsvService csvService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request) {
        // ako je osoba u .csv file-u, može se upisati u bazu, u suprotnom ne
        if (csvService.getPersonByOib(request.getOIB()) != null &&
                csvService.getPersonByFirstname(request.getFirstname()) != null &&
                csvService.getPersonByLastname(request.getLastname()) != null) {
            return ResponseEntity.ok(service.register(request));
        } else {
            // trenutno postaljva token na "regfail"
            AuthenticationResponse errorResponse = AuthenticationResponse.builder()
                    .token("regfail")
                    .build();

            return ResponseEntity.badRequest().body(errorResponse);
        }
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(service.authenticate(request));
    }

    @PostMapping("/update")
    public ResponseEntity<AuthenticationResponse> update(
            @RequestBody UpdateRequest request) {
        return ResponseEntity.ok(service.update(request));
    }
}