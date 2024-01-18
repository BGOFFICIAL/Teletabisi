package com.teletabisi.MedInstitutionApp.function.admin;

import com.teletabisi.MedInstitutionApp.entity.Equipment;
import com.teletabisi.MedInstitutionApp.entity.Room;
import com.teletabisi.MedInstitutionApp.entity.User;
import com.teletabisi.MedInstitutionApp.function.admin.request.*;
import com.teletabisi.MedInstitutionApp.function.admin.request.equipment.EquipmentRequest;
import com.teletabisi.MedInstitutionApp.function.admin.request.equipment.EquipmentRoomNameRequest;
import com.teletabisi.MedInstitutionApp.function.admin.request.equipment.EquipmentStatusRequest;
import com.teletabisi.MedInstitutionApp.function.admin.response.EmployeeResponse;
import com.teletabisi.MedInstitutionApp.function.admin.response.PromotionResponse;
import com.teletabisi.MedInstitutionApp.function.admin.response.UserResponse;
import com.teletabisi.MedInstitutionApp.function.admin.service.*;
import com.teletabisi.MedInstitutionApp.function.dto.EmployeeDTO;
import com.teletabisi.MedInstitutionApp.function.dto.UserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/v1/func/administration")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AdminController {

    @Autowired
    private PromotionService promotionService;

    @Autowired
    private RoomService roomService;

    @Autowired
    private EquipmentService equipmentService;

    @Autowired
    private EmployeeService employeeService;

    /**
     * Cilj: inactive/user -> employee
     *
     * @param request
     * @return
     */
    @PostMapping("/add/employee")
    public ResponseEntity<PromotionResponse> promotion(@RequestBody PromotionRequest request) {
        if (request != null && request.getUsername() != null) {
            User promotedUser = promotionService.promoteUser(request.getUsername(), request.getShift());

            if (promotedUser != null) {
                PromotionResponse response = PromotionResponse.builder()
                        .name(promotedUser.getFirstname())
                        .surname(promotedUser.getLastname())
                        .email(promotedUser.getEmail())
                        .date_of_birth(promotedUser.getDateOfBirth())
                        .start_date(promotedUser.getStartDate())
                        .gender(promotedUser.getGender())
                        .shift(promotedUser.getShift())
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
    public ResponseEntity<String> demotion(@RequestBody DemotionRequest request) {
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
    public ResponseEntity<EmployeeResponse> employees(@AuthenticationPrincipal User user) {
        List<EmployeeDTO> employeeList = employeeService.findAllEmployees();

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
            List<EmployeeDTO> filteredEmployeeList = employeeService.filterAllEmployees(request.getGender(), request.getDateOfBirth(), request.getStartDate());

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
    // koristim DemotionRequest zato što on ima samo username, a PromotionRequest ima i username i smjenu, stoga to ne funkcionira
    // pa da se smanji količina koda i klasa
    public ResponseEntity<PromotionResponse> promotionEmployee(@RequestBody DemotionRequest request) {
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
                        .shift(promotedUser.getShift())
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
    public ResponseEntity<String> demotionEmployee(@RequestBody DemotionRequest request) {
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
    public ResponseEntity<UserResponse> users(@AuthenticationPrincipal User user) {
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

    /**
     *
     * @param request
     * @return
     */
    @PostMapping("add/room")
    public ResponseEntity<Object> addNewRoom(@RequestBody RoomRequest request){
        if(request != null){
            Room newRoom = roomService.addNewRoom(request.getName(), request.getStatus(), request.getMaxRoomCapacity());

            if (newRoom != null){
                return ResponseEntity.ok(newRoom);
            } else{
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Zadana soba već postoji.");
            }
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @PostMapping("change-room-status")
    public ResponseEntity<Object> changeRoomStatus(@RequestBody RoomRequest request){
        if(request != null){
            Room newRoom = roomService.changeRoomStatus(request.getName(), request.getStatus());

            if (newRoom != null){
                return ResponseEntity.ok(newRoom);
            } else{
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Zadana soba ne postoji ILI je zadani status jednak postojećem statusu.");
            }
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping("/all-rooms")
    public ResponseEntity<List<Room>> getAllRooms(){

        List<Room> allRooms = roomService.getAllRooms();

        return new ResponseEntity<>(allRooms, HttpStatus.OK);
    }

    @PostMapping("add/equipment")
    public ResponseEntity<Object> addNewEquipment(@RequestBody EquipmentRequest request){
        if(request != null){
            Equipment newEquipment = equipmentService.addNewEquipment(request.getDescription(), request.getName(), request.getStatus(), request.getRoomName());
            if (newEquipment != null){
                return ResponseEntity.ok(newEquipment);
            } else{
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Zadana soba ne postoji ILI je kapacitet zadane sobe popunjen.");
            }
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @PostMapping("change-equipment-status/{equipmentId}")
    public ResponseEntity<Object> changeEquipmentStatus(@PathVariable Long equipmentId,
                                                           @RequestBody EquipmentStatusRequest request){
        if(request != null){
            Equipment newEquipment = equipmentService.changeEquipmentStatus(request.getStatus(), equipmentId);

            if (newEquipment != null){
                return ResponseEntity.ok(newEquipment);
            } else{
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Zadana oprema ne postoji ILI zadani status jednak starome ILI kapacitet sobe pun.");
            }
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @PostMapping("change-equipment-room/{equipmentId}")
    public ResponseEntity<Object> changeEquipmentRoom(@PathVariable Long equipmentId,
                                                         @RequestBody EquipmentRoomNameRequest request){
        if(request != null){
            Equipment newEquipment = equipmentService.changeEquipmentRoom(request.getRoomName(), equipmentId);

            if (newEquipment != null){
                return ResponseEntity.ok(newEquipment);
            } else{
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Zadana oprema ne postoji ILI zadana soba jednaka staroj sobi ILI zadana soba ne postoji ILI kapacitet sobe pun ILI status sobe inactive. ");
            }
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping("/all-equipment")
    public ResponseEntity<List<Equipment>> getAllEquipment(){

        List<Equipment> allEquipment = equipmentService.getAllEquipment();

        return new ResponseEntity<>(allEquipment, HttpStatus.OK);
    }

    @PostMapping("/change-shift/{employeeId}")
    public ResponseEntity<Object> changeShift(@PathVariable Long employeeId,
                                              @RequestBody ShiftRequest request){

        if(request != null){
            User employee = employeeService.changeShift(employeeId, request.getShift());
            if(employee != null){
                return ResponseEntity.ok(employee);
            } else{
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Korisnik nije nađen ILI nova smjena je jednaka staroj.");
            }
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}