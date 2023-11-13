package com.example.App.service;

import com.example.App.objects.User;
import com.example.App.repo.AppRepository;
import org.springframework.stereotype.Service;

import java.sql.Date;

@Service
public class AppService {

    private AppRepository repo;

    public AppService(AppRepository repo) {
        this.repo = repo;
    }

    public User registerUser(String username, String name, String surname, String gender, Date dateOfBirth, String password, String email, String OIB){
        if (password != null && username != null) {
            if (this.repo.findFirstByUsername(username).isPresent()) {
                System.out.println("Korisnik sa korisničkim imenom: " + username + " već postoji");
            }
            if (this.repo.findFirstByEmail(email).isPresent()) {
                System.out.println("Korisnik sa email-om: " + email + " već postoji");
            }
            if (this.repo.findFirstByOIB(OIB).isPresent()) {
                System.out.println("Korisnik sa OIB-om: " + OIB + " već postoji");
            }
            if(OIB.length()!=11){
                System.out.println("OIB mora imati 11 znamenki;");
            }
            if(this.repo.findFirstByUsername(username).isPresent() || this.repo.findFirstByEmail(email).isPresent() ||
                    this.repo.findFirstByOIB(OIB).isPresent() || OIB.length()!=11) {
                return null;
            }
            else {
                User user = new User();
                user.setUsername(username);
                user.setName(name);
                user.setSurname(surname);
                user.setGender(gender);
                user.setDateOfBirth(dateOfBirth);
                user.setPassword(password);
                user.setEmail(email);
                user.setOIB(OIB);

                return (User)this.repo.save(user);
            }
        } else {
            return null;
        }
    }
    public User authenticate(String username, String password) {
        return (User)this.repo.findByUsernameAndPassword(username, password).orElse((User) null);
    }
}
