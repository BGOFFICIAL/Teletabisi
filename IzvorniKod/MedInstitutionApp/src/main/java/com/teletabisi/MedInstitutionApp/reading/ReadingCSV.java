package com.teletabisi.MedInstitutionApp.reading;

import com.opencsv.bean.CsvToBeanBuilder;
import com.teletabisi.MedInstitutionApp.entity.Equipment;
import com.teletabisi.MedInstitutionApp.entity.Room;
import com.teletabisi.MedInstitutionApp.repository.EquipmentRepository;
import com.teletabisi.MedInstitutionApp.repository.RoomRepository;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;

import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/*
autor: Neven Pralas
Opis: upis sa CSV file u bazu podataka (za room i equipment)
 */
@Service
public class ReadingCSV implements CommandLineRunner {

    @Autowired
    RoomRepository roomRepository;

    @Autowired
    EquipmentRepository equipmentRepository;
    @Override
    public void run(String... args) throws Exception {

        List<Room> readings = new CsvToBeanBuilder<Room>(new FileReader("src/kapacitetSobe,imeSobe.csv"))
                .withType(Room.class).build().parse();

        if(roomRepository.count()==0)  {roomRepository.saveAll(readings);}
        else{
            for(Room reading: readings){
                if(roomRepository.findByName(reading.getName()).orElse(null)==null){
                    roomRepository.save(reading);
                }
            }
            for (Room rooms : roomRepository.findAll()) {
                boolean found = false;
                for (Room reading : readings) {
                    if (rooms.getName().equals(reading.getName())) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    roomRepository.delete(rooms);
                }
            }
        }


        List<Equipment> readingsE = new CsvToBeanBuilder<Equipment>(new FileReader("src/oprema.csv"))
                .withType(Equipment.class).build().parse();

        String csvFilePath = "src/oprema.csv";

        List<String> roomNames = new ArrayList<>();

        try (FileReader reader = new FileReader(csvFilePath);
             CSVParser csvParser = CSVFormat.DEFAULT.withHeader().parse(reader)) {
            for (CSVRecord csvRecord : csvParser.getRecords()) {
                String roomIdStr = csvRecord.get("room_id");
                if (roomIdStr != null && !roomIdStr.isEmpty()) {
                    roomNames.add(roomIdStr);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        int i = 0;
        for(Equipment equipment: readingsE) {
            equipment.setRoom(roomRepository.findByName(roomNames.get(i)).orElse(null));
            i++;
        }

        // Dodjela instance_number-a
        Map<String, Integer> instanceCountMap = new HashMap<>();


        for (Equipment equipment : readingsE) {
            String equipmentName = equipment.getName();

            if (instanceCountMap.containsKey(equipmentName)) {
                int instanceNumber = instanceCountMap.get(equipmentName) + 1;
                equipment.setInstanceNumber(instanceNumber);
                instanceCountMap.put(equipmentName, instanceNumber);
            } else {
                equipment.setInstanceNumber(1);
                instanceCountMap.put(equipmentName, 1);
            }
        }

        if(equipmentRepository.count()==0) {equipmentRepository.saveAll(readingsE);}
        else{
            for(Equipment equipment: readingsE){
                if(equipmentRepository.findByNameAndInstanceNumber(equipment.getName(), equipment.getInstanceNumber()).orElse(null)==null){
                    equipmentRepository.save(equipment);
                }
            }
            for (Equipment equipments : equipmentRepository.findAll()) {
                boolean found = false;

                for (Equipment reading : readingsE) {
                    if (equipments.getName().equals(reading.getName()) && equipments.getInstanceNumber()==reading.getInstanceNumber()) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    equipmentRepository.delete(equipments);
                }
            }
        }

        for(Equipment equipment: equipmentRepository.findAll()){
            Room room1 = equipment.getRoom();

            room1.setCapacity(room1.getCapacity()+1);

            roomRepository.save(room1);
        }

    }
}
