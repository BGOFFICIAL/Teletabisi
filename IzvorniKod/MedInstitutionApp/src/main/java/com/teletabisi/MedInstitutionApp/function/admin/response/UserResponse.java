package com.teletabisi.MedInstitutionApp.function.admin.response;

import com.teletabisi.MedInstitutionApp.function.dto.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Autor: Neven Pralas
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {
    private List<UserDTO> userList;
}

