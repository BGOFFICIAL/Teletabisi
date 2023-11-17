package com.teletabisi.MedInstitutionApp.security.auth.serivce;

import com.teletabisi.MedInstitutionApp.security.auth.dto.RegisterDTO;
import org.springframework.stereotype.Service;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

// funkcija koja izvlaci podatke iz .csv file-a s popisom pravih ljudi

@Service
public class CsvService {

    public List<RegisterDTO> getAllPersons(){
        List<RegisterDTO> persons = new ArrayList<>();

        InputStream inputStream = getClass().getClassLoader().getResourceAsStream("ime,prezime,oib.csv");
        assert inputStream != null;
        List<String> lines = new BufferedReader(new InputStreamReader(inputStream, StandardCharsets.UTF_8))
                .lines()
                .toList();
        for (int i = (!lines.isEmpty() && lines.get(0).startsWith("firstname,lastname,oib")) ? 1 : 0; i < lines.size(); i++){
            String[] fields = lines.get(i).split(",");

            if (fields.length >= 3) {
                String firstname = fields[0].trim();
                String lastname = fields[1].trim();
                String oib = fields[2].trim();

                RegisterDTO registerDTO = new RegisterDTO(firstname, lastname, oib);
                persons.add(registerDTO);
            }else{
                System.err.println("Skipping invalid line: " + lines.get(i));
            }
        }
        return persons;
    }

    public RegisterDTO getPersonByOib(String oib){
        List<RegisterDTO> persons = getAllPersons();
        if (persons != null){
            return persons.stream()
                    .filter(person -> oib.equals(person.getOib()))
                    .findFirst()
                    .orElse(null);
        }else{
            throw new IllegalStateException("List of persons is null");
        }
    }

    public RegisterDTO getPersonByFirstname(String name){
        List<RegisterDTO> persons = getAllPersons();
        if (persons != null){
            return persons.stream()
                    .filter(person -> name.equals(person.getFirstname()))
                    .findFirst()
                    .orElse(null);
        }else{
            throw new IllegalStateException("List of persons is null");
        }
    }

    public RegisterDTO getPersonByLastname(String surname){
        List<RegisterDTO> persons = getAllPersons();
        if (persons != null){
            return persons.stream()
                    .filter(person -> surname.equals(person.getLastname()))
                    .findFirst()
                    .orElse(null);
        }else{
            throw new IllegalStateException("List of persons is null");
        }
    }
}
