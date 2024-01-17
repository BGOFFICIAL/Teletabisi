package com.teletabisi.MedInstitutionApp.function.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SearchUserDTO {
    String firstname;
    String lastname;
    String OIB;
}
