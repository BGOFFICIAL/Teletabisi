package com.teletabisi.MedInstitutionApp.security.auth.request;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    private String firstname;
    private String lastname;
    private String OIB;
    private String gender;
    private Date dateOfBirth;
    private String email;
    private String username;
    private String password;

}
