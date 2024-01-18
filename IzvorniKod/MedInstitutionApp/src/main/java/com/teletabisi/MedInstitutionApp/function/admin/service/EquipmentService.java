
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
public class EquipmentService {

    @Autowired
    private EquipmentRepository equipmentRepo;

    @Autowired
    private RoomRepository roomRepo;

    public Equipment addNewEquipment(String description, String name, String status, String roomName) {
        // Admin može dodati i istu opremu koja već postoji (ima isti opis i ime), stoga ovo nije potrebno
//        List<Equipment> existingEquipment = equipmentRepo.findIdsByName(name);
//
//        if(!existingEquipment.isEmpty()){
//            return null;
//        }

        Equipment newEquipment = new Equipment();
        newEquipment.setDescription(description);
        newEquipment.setName(name);
        newEquipment.setStatus(status);

        int instanceNumber = equipmentRepo.countByName(name);
        newEquipment.setInstanceNumber(instanceNumber + 1);

        Optional<Room> room = roomRepo.findByName(roomName);

        if(room.isPresent()){
            Room foundRoom = room.get();
            if (foundRoom.getCapacity() < foundRoom.getMaxRoomCapacity()) {
                foundRoom.setCapacity(foundRoom.getCapacity() + 1);
                roomRepo.save(foundRoom);

                newEquipment.setRoom(foundRoom);
                return equipmentRepo.save(newEquipment);
            } else {
                return null;
            }
        } else{
            return null;
        }
    }

    public Equipment changeEquipmentStatus(String status, Long equipmentId) {
        Optional<Equipment> optionalEquipment = equipmentRepo.findById(equipmentId);

        if (optionalEquipment.isPresent()){
            Equipment existingEquipment = optionalEquipment.get();
            if(!Objects.equals(existingEquipment.getStatus(), status)){
                existingEquipment.setStatus(status);

                Room room = existingEquipment.getRoom();
                if(Objects.equals(status, "active")){
                    if (room.getCapacity() < room.getMaxRoomCapacity()){
                        room.setCapacity(room.getCapacity() + 1);
                    } else {
                        return null;
                    }
                } else if(Objects.equals(status, "inactive")){
                    // nisam siguran da ce ikad kapacitet bit <= 0 pa da dode do null
                    if(room.getCapacity() > 0){
                        room.setCapacity(room.getCapacity() - 1);
                    } else {
                        return null;
                    }
                }
                roomRepo.save(room);

                return equipmentRepo.save(existingEquipment);
            } else{
                return null;
            }
        } else {
            return null;
        }
    }

    public Equipment changeEquipmentRoom(String roomName, Long equipmentId) {
        Optional<Equipment> optionalEquipment = equipmentRepo.findById(equipmentId);

        if (optionalEquipment.isPresent()){
            Equipment existingEquipment = optionalEquipment.get();
            if(!Objects.equals(existingEquipment.getRoom().getName(), roomName)){
                Room currentRoom = existingEquipment.getRoom();

                Optional<Room> newOptionalRoom = roomRepo.findByName(roomName);

                if(newOptionalRoom.isEmpty()){
                    return null;
                }
                Room newRoom = newOptionalRoom.get();

                if(newRoom.getCapacity() < newRoom.getMaxRoomCapacity()
                        && Objects.equals(newRoom.getRoomStatus(), "active")){
                    existingEquipment.setRoom(newRoom);

                    if(Objects.equals(existingEquipment.getStatus(), "active")){
                        newRoom.setCapacity(newRoom.getCapacity() + 1);
                    }

                    if(currentRoom.getCapacity() > 0){
                        currentRoom.setCapacity(currentRoom.getCapacity() - 1);
                    } else{
                        currentRoom.setCapacity(0);
                    }


                    roomRepo.save(newRoom);

                    return equipmentRepo.save(existingEquipment);
                } else {
                    return null;
                }
            } else{
                return null;
            }
        } else{
            return null;
        }
    }

    public List<Equipment> getAllEquipment() {
        return equipmentRepo.findAll().stream().toList();
    }
}