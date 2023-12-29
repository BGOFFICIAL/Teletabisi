package com.teletabisi.MedInstitutionApp.function.dto;

import lombok.*;

import java.time.LocalDateTime;
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
    private LocalDateTime dateTime;
}
