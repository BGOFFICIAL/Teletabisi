package com.teletabisi.MedInstitutionApp.security.auth.dto;


import com.opencsv.bean.CsvBindByName;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

// klasa koja predstavlja građu zadanog .csv file-a
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterDTO {
    @CsvBindByName(column = "firstname")
    private String firstname;
    @CsvBindByName(column = "lastname")
    private String lastname;
    @CsvBindByName(column = "oib")
    private String oib;
}