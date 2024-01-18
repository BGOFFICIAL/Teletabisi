package com.teletabisi.MedInstitutionApp.function.dto;

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
public class EmployeeDTO {
    private String name;
    private String surname;
    private String email;
    private Date dateOfBirth;
    private LocalDate startDate;
}
