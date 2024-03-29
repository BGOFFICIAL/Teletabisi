package com.teletabisi.MedInstitutionApp.function.admin.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoomRequest {
    private String name;
    private String status;
    private int maxRoomCapacity;
}