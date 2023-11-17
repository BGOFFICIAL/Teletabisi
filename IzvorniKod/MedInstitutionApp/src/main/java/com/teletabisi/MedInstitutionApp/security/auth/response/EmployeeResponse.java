package com.teletabisi.MedInstitutionApp.security.auth.response;

import com.teletabisi.MedInstitutionApp.security.auth.dto.EmployeeDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeResponse {
    private List<EmployeeDTO> employeeList;
}
