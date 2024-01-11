package com.teletabisi.MedInstitutionApp.function.admin;

import com.teletabisi.MedInstitutionApp.entity.User;
import com.teletabisi.MedInstitutionApp.function.admin.request.EmployeeRequest;
import com.teletabisi.MedInstitutionApp.function.admin.request.PromotionRequest;
import com.teletabisi.MedInstitutionApp.function.admin.request.UserRequest;
import com.teletabisi.MedInstitutionApp.function.admin.response.EmployeeResponse;
import com.teletabisi.MedInstitutionApp.function.admin.response.PromotionResponse;
import com.teletabisi.MedInstitutionApp.function.admin.response.UserResponse;
import com.teletabisi.MedInstitutionApp.function.admin.service.EmployeeService;
import com.teletabisi.MedInstitutionApp.function.admin.service.PromotionService;
import com.teletabisi.MedInstitutionApp.function.admin.service.UserService;
import com.teletabisi.MedInstitutionApp.function.dto.EmployeeDTO;
import com.teletabisi.MedInstitutionApp.function.dto.UserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/auth/administration")
@RequiredArgsConstructor
public class AdminController {

    @Autowired
    private PromotionService promotionService;

    /**
     * Cilj: inactive/user -> employee
     *
     * @param request
     * @return
     */
    @PostMapping("/add/employee")
    public ResponseEntity<PromotionResponse> promotion(@RequestBody PromotionRequest request) {
        if (request != null && request.getUsername() != null) {
            User promotedUser = promotionService.promoteUser(request.getUsername());

            if (promotedUser != null) {
                PromotionResponse response = PromotionResponse.builder()
                        .name(promotedUser.getFirstname())
                        .surname(promotedUser.getLastname())
                        .email(promotedUser.getEmail())
                        .date_of_birth(promotedUser.getDateOfBirth())
                        .start_date(promotedUser.getStartDate())
                        .gender(promotedUser.getGender())
                        .build();

                return ResponseEntity.ok(response);
            }
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    /**
     * Cilj: employee -> inactive
     *
     * @param request
     * @return
     */
    @PostMapping("/remove/employee")
    public ResponseEntity<String> demotion(@RequestBody PromotionRequest request) {
        if (request != null && request.getUsername() != null) {
            User demotedUser = promotionService.demoteUser(request.getUsername());

            if (demotedUser != null) {
                return ResponseEntity.ok("Djelatnik neaktivan");
            }
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    /**
     * Cilj: selekcija zaposlenika
     *
     * @return
     */
    @GetMapping("/return/employee")
    public ResponseEntity<EmployeeResponse> employees() {
        List<EmployeeDTO> employeeList = EmployeeService.findAllEmployees();

        if (employeeList != null && !employeeList.isEmpty()) {
            EmployeeResponse response = EmployeeResponse.builder()
                    .employeeList(employeeList)
                    .build();
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    /**
     * Cilj: filtriranje zaposlenika
     *
     * @param request
     * @return
     */
    @PostMapping("/filter/employees")
    public ResponseEntity<EmployeeResponse> filteredEmployees(@RequestBody EmployeeRequest request) {
        if (request != null) {
            List<EmployeeDTO> filteredEmployeeList = EmployeeService.filterAllEmployees(request.getGender(), request.getDateOfBirth(), request.getStartDate());

            if (filteredEmployeeList != null && !filteredEmployeeList.isEmpty()) {
                EmployeeResponse response = EmployeeResponse.builder()
                        .employeeList(filteredEmployeeList)
                        .build();
                return ResponseEntity.ok(response);
            }
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    /**
     * Autor: Neven Pralas;
     * Cilj: POST - employee -> adminemployee
     *
     * @param request
     * @return
     */
    @PostMapping("/add/adminemployee")
    public ResponseEntity<PromotionResponse> promotionEmployee(@RequestBody PromotionRequest request) {
        System.out.print(request.getUsername());
        if (request != null && request.getUsername() != null) {
            User promotedUser = promotionService.promoteEmployee(request.getUsername());

            if (promotedUser != null) {
                PromotionResponse response = PromotionResponse.builder()
                        .name(promotedUser.getFirstname())
                        .surname(promotedUser.getLastname())
                        .email(promotedUser.getEmail())
                        .date_of_birth(promotedUser.getDateOfBirth())
                        .start_date(promotedUser.getStartDate())
                        .gender(promotedUser.getGender())
                        .build();

                return ResponseEntity.ok(response);
            }
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    /**
     * Autor: Neven Pralas;
     * Cilj: POST - adminemployee -> employee
     *
     * @param request
     * @return
     */
    @PostMapping("/remove/adminemployee")
    public ResponseEntity<String> demotionEmployee(@RequestBody PromotionRequest request) {
        if (request != null && request.getUsername() != null) {
            User demotedUser = promotionService.demoteEmployee(request.getUsername());

            if (demotedUser != null) {
                return ResponseEntity.ok("Djelatnik postaje employee");
            }
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    /**
     * Autor: Neven Pralas;
     * Cilj: selekcija usera (pacijenata)
     *
     * @return
     */
    @GetMapping("/return/user")
    public ResponseEntity<UserResponse> users() {
        List<UserDTO> userList = UserService.findAllUsers();

        if (userList != null && !userList.isEmpty()) {
            UserResponse response = UserResponse.builder()
                    .userList(userList)
                    .build();
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    /**
     * Autor: Neven Pralas;
     * Cilj: filtriranje usera (pacijenata)
     *
     * @param request
     * @return
     */
    @PostMapping("/filter/users")
    public ResponseEntity<UserResponse> filteredUsers(@RequestBody UserRequest request) {
        if (request != null) {
            List<UserDTO> filteredUserList = UserService.filterAllUsers(request.getGender(), request.getDateOfBirth(), request.getStartDate());

            if (filteredUserList != null && !filteredUserList.isEmpty()) {
                UserResponse response = UserResponse.builder()
                        .userList(filteredUserList)
                        .build();
                return ResponseEntity.ok(response);
            }
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}
