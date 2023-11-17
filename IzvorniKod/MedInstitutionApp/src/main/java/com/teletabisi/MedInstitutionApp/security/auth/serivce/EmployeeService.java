package com.teletabisi.MedInstitutionApp.security.auth.serivce;

import com.teletabisi.MedInstitutionApp.entity.Role;
import com.teletabisi.MedInstitutionApp.entity.User;
import com.teletabisi.MedInstitutionApp.repository.UserRepository;
import com.teletabisi.MedInstitutionApp.security.auth.dto.EmployeeDTO;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Service
public class EmployeeService {

    private static UserRepository repo;

    public EmployeeService(UserRepository repo){
        EmployeeService.repo = repo;
    }

    public static List<EmployeeDTO> findAllEmployees(){
        List<EmployeeDTO> employees = repo.findAll().stream()
                .filter(employee-> employee.getRole() == Role.EMPLOYEE)
                .map(employee-> new EmployeeDTO(employee.getFirstname(), employee.getLastname(), employee.getEmail(), employee.getDateOfBirth(), employee.getStartDate()))
                .toList();
        if(employees.isEmpty()){
            return null;
        }
        return employees;
    }

    public static String formatDateString(Date date) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

        return sdf.format(date);
    }
    public static String formatLocalDateString(LocalDate localDate) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        return localDate.format(formatter);
    }

    public static List<EmployeeDTO> filterAllEmployees(String gender, Date dayOfBirth, LocalDate startDate) {

        if(gender != null && dayOfBirth != null && startDate != null){
            List<EmployeeDTO> filteredEmployees = repo.findAll().stream()
                    .filter(employee-> (employee.getGender().equals(gender)) &&
                            (formatDateString(employee.getDateOfBirth()).equals(formatDateString(dayOfBirth))) &&
                            formatLocalDateString(employee.getStartDate()).equals(formatLocalDateString(startDate))
                    && (employee.getRole() == Role.EMPLOYEE))
                    .map(employee -> new EmployeeDTO(
                            employee.getFirstname(),
                            employee.getLastname(),
                            employee.getEmail(),
                            employee.getDateOfBirth(),
                            employee.getStartDate()))
                    .toList();
            return filteredEmployees.isEmpty() ? null : filteredEmployees;
        }
        if(gender != null && dayOfBirth != null && startDate == null){
            List<EmployeeDTO> filteredEmployees = repo.findAll().stream()
                    .filter(employee-> (employee.getGender().equals(gender)) &&
                            (formatDateString(employee.getDateOfBirth()).equals(formatDateString(dayOfBirth)))
                    && (employee.getRole() == Role.EMPLOYEE))
                    .map(employee -> new EmployeeDTO(
                            employee.getFirstname(),
                            employee.getLastname(),
                            employee.getEmail(),
                            employee.getDateOfBirth(),
                            employee.getStartDate()))
                    .toList();
            return filteredEmployees.isEmpty() ? null : filteredEmployees;
        }
        if(gender != null && dayOfBirth == null && startDate == null){
            List<EmployeeDTO> filteredEmployees = repo.findAll().stream()
                    .filter(employee-> (employee.getGender().equals(gender)) && (employee.getRole() == Role.EMPLOYEE))
                    .map(employee -> new EmployeeDTO(
                            employee.getFirstname(),
                            employee.getLastname(),
                            employee.getEmail(),
                            employee.getDateOfBirth(),
                            employee.getStartDate()))
                    .toList();
            return filteredEmployees.isEmpty() ? null : filteredEmployees;
        }
        if(gender != null && dayOfBirth == null && startDate != null){
            List<EmployeeDTO> filteredEmployees = repo.findAll().stream()
                    .filter(employee-> (employee.getGender().equals(gender)) &&
                            formatLocalDateString(employee.getStartDate()).equals(formatLocalDateString(startDate))
                    && (employee.getRole() == Role.EMPLOYEE))
                    .map(employee -> new EmployeeDTO(
                            employee.getFirstname(),
                            employee.getLastname(),
                            employee.getEmail(),
                            employee.getDateOfBirth(),
                            employee.getStartDate()))
                    .toList();
            return filteredEmployees.isEmpty() ? null : filteredEmployees;
        }
        if(gender == null && dayOfBirth != null && startDate == null){
            List<EmployeeDTO> filteredEmployees = repo.findAll().stream()
                    .filter(employee-> (formatDateString(employee.getDateOfBirth()).equals(formatDateString(dayOfBirth))) && (employee.getRole() == Role.EMPLOYEE))
                    .map(employee -> new EmployeeDTO(
                            employee.getFirstname(),
                            employee.getLastname(),
                            employee.getEmail(),
                            employee.getDateOfBirth(),
                            employee.getStartDate()))
                    .toList();
            return filteredEmployees.isEmpty() ? null : filteredEmployees;
        }
        if(gender == null && dayOfBirth != null && startDate != null){
            List<EmployeeDTO> filteredEmployees = repo.findAll().stream()
                    .filter(employee-> (formatDateString(employee.getDateOfBirth()).equals(formatDateString(dayOfBirth))) &&
                            formatLocalDateString(employee.getStartDate()).equals(formatLocalDateString(startDate))
                            && (employee.getRole() == Role.EMPLOYEE))
                    .map(employee -> new EmployeeDTO(
                            employee.getFirstname(),
                            employee.getLastname(),
                            employee.getEmail(),
                            employee.getDateOfBirth(),
                            employee.getStartDate()))
                    .toList();
            return filteredEmployees.isEmpty() ? null : filteredEmployees;
        }
        if(gender == null && dayOfBirth == null && startDate != null){
            List<EmployeeDTO> filteredEmployees = repo.findAll().stream()
                    .filter(employee-> formatLocalDateString(employee.getStartDate()).equals(formatLocalDateString(startDate))
                            && (employee.getRole() == Role.EMPLOYEE))
                    .map(employee -> new EmployeeDTO(
                            employee.getFirstname(),
                            employee.getLastname(),
                            employee.getEmail(),
                            employee.getDateOfBirth(),
                            employee.getStartDate()))
                    .toList();
            return filteredEmployees.isEmpty() ? null : filteredEmployees;
        }
        return null;
    }
}
