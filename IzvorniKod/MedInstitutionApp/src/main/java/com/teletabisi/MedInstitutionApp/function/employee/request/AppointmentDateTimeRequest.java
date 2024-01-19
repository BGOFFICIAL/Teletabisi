package com.teletabisi.MedInstitutionApp.function.employee.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentDateTimeRequest {
    private LocalDateTime newAppointmentDateTime;
}
