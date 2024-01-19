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
@RequestMapping("/api/v1/func/employee")
public class EmployeeControllerEmail {

    @Autowired
    private MailService mailService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/send/{email}")
    public String sendMail(@PathVariable String email, @RequestBody MailStructure mailStructure){

        String mail = null;
        User user = userRepository.findFirstByEmail(email).orElse(null);
        System.out.print(user);
        if(user!=null){
            mail = user.getEmail();
            System.out.print(mail);
            mailService.sendMail(mail, mailStructure);
            return "Successfully sent the mail !!!";
        }
        else{
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Korisnik nije pronađen");
        }

    }



}
