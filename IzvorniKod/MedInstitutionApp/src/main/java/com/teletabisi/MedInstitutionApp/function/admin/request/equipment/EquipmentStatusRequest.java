package com.teletabisi.MedInstitutionApp.function.admin.request.equipment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EquipmentStatusRequest {
    private String status;
}
