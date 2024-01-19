package com.teletabisi.MedInstitutionApp.function.admin.service;

import com.teletabisi.MedInstitutionApp.entity.Role;
import com.teletabisi.MedInstitutionApp.repository.UserRepository;
import com.teletabisi.MedInstitutionApp.function.dto.UserDTO;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

/**
 * Autor: Neven Pralas;
 * Cilj: odabir i filtriranje usera (pacijenata)
 */
@Service
public class UserService {

    private static UserRepository repo;

    public UserService(UserRepository repo) {
        UserService.repo = repo;
    }

    public static List<UserDTO> findAllUsers() {
        List<UserDTO> users = repo.findAll().stream()
                .filter(user -> user.getRole() == Role.USER)
                .map(user -> new UserDTO(user.getFirstname(), user.getLastname(), user.getEmail(), user.getDateOfBirth(), user.getStartDate()))
                .toList();
        if (users.isEmpty()) {
            return null;
        }
        return users;
    }

    public static String formatDateString(Date date) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

        return sdf.format(date);
    }

    public static String formatLocalDateString(LocalDate localDate) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        return localDate.format(formatter);
    }

    public static List<UserDTO> filterAllUsers(String gender, Date dayOfBirth, LocalDate startDate) {

        if (gender != null && dayOfBirth != null && startDate != null) {
            List<UserDTO> filteredUsers = repo.findAll().stream()
                    .filter(user -> (user.getGender().equals(gender)) &&
                            (formatDateString(user.getDateOfBirth()).equals(formatDateString(dayOfBirth))) &&
                            formatLocalDateString(user.getStartDate()).equals(formatLocalDateString(startDate))
                            && (user.getRole() == Role.USER))
                    .map(user -> new UserDTO(
                            user.getFirstname(),
                            user.getLastname(),
                            user.getEmail(),
                            user.getDateOfBirth(),
                            user.getStartDate()))
                    .toList();
            return filteredUsers.isEmpty() ? null : filteredUsers;
        }
        if (gender != null && dayOfBirth != null && startDate == null) {
            List<UserDTO> filteredUsers = repo.findAll().stream()
                    .filter(user -> (user.getGender().equals(gender)) &&
                            (formatDateString(user.getDateOfBirth()).equals(formatDateString(dayOfBirth)))
                            && (user.getRole() == Role.USER))
                    .map(user -> new UserDTO(
                            user.getFirstname(),
                            user.getLastname(),
                            user.getEmail(),
                            user.getDateOfBirth(),
                            user.getStartDate()))
                    .toList();
            return filteredUsers.isEmpty() ? null : filteredUsers;
        }
        if (gender != null && dayOfBirth == null && startDate == null) {
            List<UserDTO> filteredUsers = repo.findAll().stream()
                    .filter(user -> (user.getGender().equals(gender)) && (user.getRole() == Role.USER))
                    .map(user -> new UserDTO(
                            user.getFirstname(),
                            user.getLastname(),
                            user.getEmail(),
                            user.getDateOfBirth(),
                            user.getStartDate()))
                    .toList();
            return filteredUsers.isEmpty() ? null : filteredUsers;
        }
        if (gender != null && dayOfBirth == null && startDate != null) {
            List<UserDTO> filteredUsers = repo.findAll().stream()
                    .filter(user -> (user.getGender().equals(gender)) &&
                            formatLocalDateString(user.getStartDate()).equals(formatLocalDateString(startDate))
                            && (user.getRole() == Role.USER))
                    .map(user -> new UserDTO(
                            user.getFirstname(),
                            user.getLastname(),
                            user.getEmail(),
                            user.getDateOfBirth(),
                            user.getStartDate()))
                    .toList();
            return filteredUsers.isEmpty() ? null : filteredUsers;
        }
        if (gender == null && dayOfBirth != null && startDate == null) {
            List<UserDTO> filteredUsers = repo.findAll().stream()
                    .filter(user -> (formatDateString(user.getDateOfBirth()).equals(formatDateString(dayOfBirth))) && (user.getRole() == Role.USER))
                    .map(user -> new UserDTO(
                            user.getFirstname(),
                            user.getLastname(),
                            user.getEmail(),
                            user.getDateOfBirth(),
                            user.getStartDate()))
                    .toList();
            return filteredUsers.isEmpty() ? null : filteredUsers;
        }
        if (gender == null && dayOfBirth != null && startDate != null) {
            List<UserDTO> filteredUsers = repo.findAll().stream()
                    .filter(user -> (formatDateString(user.getDateOfBirth()).equals(formatDateString(dayOfBirth))) &&
                            formatLocalDateString(user.getStartDate()).equals(formatLocalDateString(startDate))
                            && (user.getRole() == Role.USER))
                    .map(user -> new UserDTO(
                            user.getFirstname(),
                            user.getLastname(),
                            user.getEmail(),
                            user.getDateOfBirth(),
                            user.getStartDate()))
                    .toList();
            return filteredUsers.isEmpty() ? null : filteredUsers;
        }
        if (gender == null && dayOfBirth == null && startDate != null) {
            List<UserDTO> filteredUsers = repo.findAll().stream()
                    .filter(user -> formatLocalDateString(user.getStartDate()).equals(formatLocalDateString(startDate))
                            && (user.getRole() == Role.USER))
                    .map(user -> new UserDTO(
                            user.getFirstname(),
                            user.getLastname(),
                            user.getEmail(),
                            user.getDateOfBirth(),
                            user.getStartDate()))
                    .toList();
            return filteredUsers.isEmpty() ? null : filteredUsers;
        }
        return null;
    }
}
