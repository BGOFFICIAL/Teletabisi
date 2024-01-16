package com.teletabisi.MedInstitutionApp.function.admin.request.equipment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EquipmentRequest {
    private String description;
    private String name;
    private String status;
    private String roomName;
}
