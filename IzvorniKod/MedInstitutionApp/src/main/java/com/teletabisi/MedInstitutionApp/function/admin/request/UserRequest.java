package com.teletabisi.MedInstitutionApp.function.admin.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;

/**
 * Autor: Neven Pralas;
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserRequest {
    private String gender;
    private Date dateOfBirth;
    private LocalDate startDate;
}
