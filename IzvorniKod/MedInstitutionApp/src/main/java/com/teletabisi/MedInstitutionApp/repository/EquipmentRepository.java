package com.teletabisi.MedInstitutionApp.repository;

import com.teletabisi.MedInstitutionApp.entity.Equipment;
import com.teletabisi.MedInstitutionApp.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EquipmentRepository extends JpaRepository<Equipment, Long> {

    Optional<Equipment> findByNameAndInstanceNumber(String name, int instanceNumber);

    Equipment getEquipmentById(long l);

    List<Equipment> findIdsByName(String equipmentName);

    List<Equipment> findAllByRoom(Room existingRoom);

    int countByName(String name);
}
