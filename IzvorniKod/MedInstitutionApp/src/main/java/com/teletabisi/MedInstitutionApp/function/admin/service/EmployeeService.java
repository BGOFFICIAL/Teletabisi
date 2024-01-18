package com.teletabisi.MedInstitutionApp.function.admin.service;

import com.teletabisi.MedInstitutionApp.entity.Role;
import com.teletabisi.MedInstitutionApp.entity.User;
import com.teletabisi.MedInstitutionApp.repository.UserRepository;
import com.teletabisi.MedInstitutionApp.function.dto.EmployeeDTO;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    private static UserRepository repo;

    public EmployeeService(UserRepository repo) {
        EmployeeService.repo = repo;
    }

    /**
     * Cilj: Prikaz svih zaposlenika u sustavu
     *
     * @return
     */
    public List<EmployeeDTO> findAllEmployees() {
        List<EmployeeDTO> employees = repo.findAll().stream()
                .filter(employee -> employee.getRole() == Role.EMPLOYEE || employee.getRole() == Role.ADMINEMPLOYEE)
                .map(employee -> new EmployeeDTO(employee.getFirstname(), employee.getLastname(), employee.getEmail(), employee.getDateOfBirth(), employee.getStartDate()))
                .toList();
        if (employees.isEmpty()) {
            return null;
        }
        return employees;
    }

    /**
     * Cilj: formatiranje varijable tipa Date u format "yyyy-MM-dd"
     *
     * @param date
     * @return
     */
    public static String formatDateString(Date date) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

        return sdf.format(date);
    }

    /**
     * Cilj: formatiranje varijable tipa LocalDate u format "yyyy-MM-dd"
     *
     * @param localDate
     * @return
     */
    public static String formatLocalDateString(LocalDate localDate) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        return localDate.format(formatter);
    }

    /**
     * Cilj: filtriranje svih zaposlenika po zadanim parametrima
     *
     * @param gender
     * @param dayOfBirth
     * @param startDate
     * @return
     */
    public List<EmployeeDTO> filterAllEmployees(String gender, Date dayOfBirth, LocalDate startDate) {

        if (gender != null && dayOfBirth != null && startDate != null) {
            List<EmployeeDTO> filteredEmployees = repo.findAll().stream()
                    .filter(employee -> (employee.getGender().equals(gender)) &&
                            (formatDateString(employee.getDateOfBirth()).equals(formatDateString(dayOfBirth))) &&
                            formatLocalDateString(employee.getStartDate()).equals(formatLocalDateString(startDate))
                            && ((employee.getRole() == Role.EMPLOYEE) || (employee.getRole() == Role.ADMINEMPLOYEE)))
                    .map(employee -> new EmployeeDTO(
                            employee.getFirstname(),
                            employee.getLastname(),
                            employee.getEmail(),
                            employee.getDateOfBirth(),
                            employee.getStartDate()))
                    .toList();
            return filteredEmployees.isEmpty() ? null : filteredEmployees;
        }
        if (gender != null && dayOfBirth != null && startDate == null) {
            List<EmployeeDTO> filteredEmployees = repo.findAll().stream()
                    .filter(employee -> (employee.getGender().equals(gender)) &&
                            (formatDateString(employee.getDateOfBirth()).equals(formatDateString(dayOfBirth)))
                            && ((employee.getRole() == Role.EMPLOYEE) || (employee.getRole() == Role.ADMINEMPLOYEE)))
                    .map(employee -> new EmployeeDTO(
                            employee.getFirstname(),
                            employee.getLastname(),
                            employee.getEmail(),
                            employee.getDateOfBirth(),
                            employee.getStartDate()))
                    .toList();
            return filteredEmployees.isEmpty() ? null : filteredEmployees;
        }
        if (gender != null && dayOfBirth == null && startDate == null) {
            List<EmployeeDTO> filteredEmployees = repo.findAll().stream()
                    .filter(employee -> (employee.getGender().equals(gender)) && ((employee.getRole() == Role.EMPLOYEE) || (employee.getRole() == Role.ADMINEMPLOYEE)))
                    .map(employee -> new EmployeeDTO(
                            employee.getFirstname(),
                            employee.getLastname(),
                            employee.getEmail(),
                            employee.getDateOfBirth(),
                            employee.getStartDate()))
                    .toList();
            return filteredEmployees.isEmpty() ? null : filteredEmployees;
        }
        if (gender != null && dayOfBirth == null && startDate != null) {
            List<EmployeeDTO> filteredEmployees = repo.findAll().stream()
                    .filter(employee -> (employee.getGender().equals(gender)) &&
                            formatLocalDateString(employee.getStartDate()).equals(formatLocalDateString(startDate))
                            && ((employee.getRole() == Role.EMPLOYEE) || (employee.getRole() == Role.ADMINEMPLOYEE)))
                    .map(employee -> new EmployeeDTO(
                            employee.getFirstname(),
                            employee.getLastname(),
                            employee.getEmail(),
                            employee.getDateOfBirth(),
                            employee.getStartDate()))
                    .toList();
            return filteredEmployees.isEmpty() ? null : filteredEmployees;
        }
        if (gender == null && dayOfBirth != null && startDate == null) {
            List<EmployeeDTO> filteredEmployees = repo.findAll().stream()
                    .filter(employee -> (formatDateString(employee.getDateOfBirth()).equals(formatDateString(dayOfBirth))) && ((employee.getRole() == Role.EMPLOYEE)
                            || (employee.getRole() == Role.ADMINEMPLOYEE)))
                    .map(employee -> new EmployeeDTO(
                            employee.getFirstname(),
                            employee.getLastname(),
                            employee.getEmail(),
                            employee.getDateOfBirth(),
                            employee.getStartDate()))
                    .toList();
            return filteredEmployees.isEmpty() ? null : filteredEmployees;
        }
        if (gender == null && dayOfBirth != null && startDate != null) {
            List<EmployeeDTO> filteredEmployees = repo.findAll().stream()
                    .filter(employee -> (formatDateString(employee.getDateOfBirth()).equals(formatDateString(dayOfBirth))) &&
                            formatLocalDateString(employee.getStartDate()).equals(formatLocalDateString(startDate))
                            && ((employee.getRole() == Role.EMPLOYEE) || (employee.getRole() == Role.ADMINEMPLOYEE)))
                    .map(employee -> new EmployeeDTO(
                            employee.getFirstname(),
                            employee.getLastname(),
                            employee.getEmail(),
                            employee.getDateOfBirth(),
                            employee.getStartDate()))
                    .toList();
            return filteredEmployees.isEmpty() ? null : filteredEmployees;
        }
        if (gender == null && dayOfBirth == null && startDate != null) {
            List<EmployeeDTO> filteredEmployees = repo.findAll().stream()
                    .filter(employee -> formatLocalDateString(employee.getStartDate()).equals(formatLocalDateString(startDate))
                            && ((employee.getRole() == Role.EMPLOYEE) || (employee.getRole() == Role.ADMINEMPLOYEE)))
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

    public User changeShift(Long employeeId, int shift) {
        Optional<User> optionalEmployee = repo.findById(employeeId);

        if(optionalEmployee.isPresent()){
            User user = optionalEmployee.get();

            if(shift != user.getShift()){
                user.setShift(shift);
                return repo.save(user);
            } else {
                return null;
            }
        }
        return null;
    }
}
