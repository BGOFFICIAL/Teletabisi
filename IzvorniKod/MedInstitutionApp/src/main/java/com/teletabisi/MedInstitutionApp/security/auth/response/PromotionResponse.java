package com.teletabisi.MedInstitutionApp.security.auth.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PromotionResponse {
    private String name;
    private String surname;
    private String email;
    private Date date_of_birth;
    private LocalDate start_date;
    private String gender;
}
