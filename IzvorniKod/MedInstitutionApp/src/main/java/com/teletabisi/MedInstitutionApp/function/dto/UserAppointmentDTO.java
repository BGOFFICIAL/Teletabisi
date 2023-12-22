package com.teletabisi.MedInstitutionApp.function.dto;

import lombok.*;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class UserAppointmentDTO {
    private String description;
    private Date date;
}
