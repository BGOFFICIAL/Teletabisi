package com.teletabisi.MedInstitutionApp.function.employee.service;

import com.teletabisi.MedInstitutionApp.email.MailService;
import com.teletabisi.MedInstitutionApp.email.MailStructure;
import com.teletabisi.MedInstitutionApp.entity.User;
import com.teletabisi.MedInstitutionApp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
/*
autor: Neven Pralas
Opis: Proizvoljno slanje maila od strane zdravstvenog djelatnika
*/
@RestController
@RequestMapping("/api/v1/auth/employee")
public class EmployeeControllerEmail {

    @Autowired
    private MailService mailService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/send/{id}")
    public String sendMail(@PathVariable Long id, @RequestBody MailStructure mailStructure){

        String mail = null;
        User user = userRepository.findById(id).orElse(null);
        if(user!=null){
            mail = user.getEmail();
            mailService.sendMail(mail, mailStructure);
            return "Successfully sent the mail !!!";
        }
        else{
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Korisnik nije pronađen");
        }

    }



}
