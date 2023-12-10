package com.teletabisi.MedInstitutionApp.security.auth.response;

import com.teletabisi.MedInstitutionApp.security.auth.dto.UserDTO;
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

