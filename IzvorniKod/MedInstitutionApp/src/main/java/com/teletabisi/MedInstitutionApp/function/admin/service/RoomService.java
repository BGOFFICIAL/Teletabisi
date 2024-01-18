package com.teletabisi.MedInstitutionApp.function.admin.service;

import com.teletabisi.MedInstitutionApp.entity.Equipment;
import com.teletabisi.MedInstitutionApp.entity.Room;
import com.teletabisi.MedInstitutionApp.repository.EquipmentRepository;
import com.teletabisi.MedInstitutionApp.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepo;

    @Autowired
    private EquipmentRepository equipmentRepo;

    public Room addNewRoom(String name, String status, int maxRoomCapacity) {
        Optional<Room> existingRoom = roomRepo.findByName(name);

        if(existingRoom.isPresent()){
            return null;
        }

        Room newRoom = new Room();
        newRoom.setName(name);
        newRoom.setRoomStatus(status);
        newRoom.setMaxRoomCapacity(maxRoomCapacity);
        newRoom.setCapacity(0);

        return roomRepo.save(newRoom);
    }

    public Room changeRoomStatus(String name, String newStatus) {
        Optional<Room> existingRoomOptional = roomRepo.findByName(name);

        if(existingRoomOptional.isPresent()){
            Room existingRoom = existingRoomOptional.get();
            if (!Objects.equals(existingRoom.getRoomStatus(), newStatus)){
                existingRoom.setRoomStatus(newStatus);
                if(Objects.equals(newStatus, "inactive")){
                    existingRoom.setCapacity(0);
                    List<Equipment> sameRoomEquipment = equipmentRepo.findAllByRoom(existingRoom);
                    for(Equipment equipment : sameRoomEquipment){
                        equipment.setRoom(roomRepo.getRoomById(0));
                        Room pendingRoom = roomRepo.getRoomById(0);
                        pendingRoom.setCapacity(pendingRoom.getCapacity() + 1);
                        equipmentRepo.save(equipment);
                    }
                } else if (Objects.equals(newStatus, "active")){
                    List<Equipment> sameRoomEquipment = equipmentRepo.findAllByRoom(existingRoom);
                    // efektivno ce nakon nove implementacije uvijek biti 0
                    existingRoom.setCapacity(sameRoomEquipment.size());
                }
                return roomRepo.save(existingRoom);
            } else{
                return null;
            }
        } else{
            return null;
        }
    }

    public List<Room> getAllRooms() {
        return roomRepo.findAll().stream().toList();
    }
}
