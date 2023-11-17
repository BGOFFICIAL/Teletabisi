package com.teletabisi.MedInstitutionApp.security.auth;

import com.teletabisi.MedInstitutionApp.security.auth.request.RegisterRequest;
import com.teletabisi.MedInstitutionApp.security.auth.request.AuthenticationRequest;
import com.teletabisi.MedInstitutionApp.security.auth.request.UpdateRequest;
import com.teletabisi.MedInstitutionApp.entity.User;
import com.teletabisi.MedInstitutionApp.security.auth.dto.EmployeeDTO;
import com.teletabisi.MedInstitutionApp.security.auth.request.*;
import com.teletabisi.MedInstitutionApp.security.auth.response.AuthenticationResponse;
import com.teletabisi.MedInstitutionApp.security.auth.response.EmployeeResponse;
import com.teletabisi.MedInstitutionApp.security.auth.response.PromotionResponse;
import com.teletabisi.MedInstitutionApp.security.auth.serivce.CsvService;
import com.teletabisi.MedInstitutionApp.security.auth.serivce.AuthenticationService;
import com.teletabisi.MedInstitutionApp.security.auth.serivce.EmployeeService;
import com.teletabisi.MedInstitutionApp.security.auth.serivce.PromotionService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;

    @Autowired
    private CsvService csvService;

    @Autowired
    private PromotionService promotionService;

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

    @PostMapping("/add/employee")
    public ResponseEntity<PromotionResponse> promotion(@RequestBody PromotionRequest request) {
        if (request != null && request.getUsername() != null) {
            User promotedUser = promotionService.promoteUser(request.getUsername());

            if (promotedUser != null) {
                PromotionResponse response = PromotionResponse.builder()
                        .name(promotedUser.getFirstname())
                        .surname(promotedUser.getLastname())
                        .email(promotedUser.getEmail())
                        .date_of_birth(promotedUser.getDateOfBirth())
                        .start_date(promotedUser.getStartDate())
                        .gender(promotedUser.getGender())
                        .build();

                return ResponseEntity.ok(response);
            }
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @PostMapping("/remove/employee")
    public ResponseEntity<String> demotion(@RequestBody PromotionRequest request) {
        if (request != null && request.getUsername() != null) {
            User demotedUser = promotionService.demoteUser(request.getUsername());

            if (demotedUser != null) {
                return ResponseEntity.ok("Djelatnik neaktivan");
            }
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping("/return/employee")
    public ResponseEntity<EmployeeResponse> employees(){
        List<EmployeeDTO> employeeList = EmployeeService.findAllEmployees();

        if(employeeList != null && !employeeList.isEmpty()){
            EmployeeResponse response = EmployeeResponse.builder()
                    .employeeList(employeeList)
                    .build();
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @PostMapping("/filter/employees")
    public ResponseEntity<EmployeeResponse> filteredEmployees(@RequestBody EmployeeRequest request){
        if (request != null) {
            List<EmployeeDTO> filteredEmployeeList = EmployeeService.filterAllEmployees(request.getGender(), request.getDateOfBirth() , request.getStartDate());

            if(filteredEmployeeList != null && !filteredEmployeeList.isEmpty()){
                EmployeeResponse response = EmployeeResponse.builder()
                        .employeeList(filteredEmployeeList)
                        .build();
                return ResponseEntity.ok(response);
            }
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}