package com.teletabisi.MedInstitutionApp.function.admin.response;

import com.teletabisi.MedInstitutionApp.function.dto.EmployeeDTO;
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
