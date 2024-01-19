package com.teletabisi.MedInstitutionApp.function.user.service;

import com.teletabisi.MedInstitutionApp.entity.Role;
import com.teletabisi.MedInstitutionApp.entity.User;
import com.teletabisi.MedInstitutionApp.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class InactiveService {

    private UserRepository repo;

    public InactiveService(UserRepository repo) {
        this.repo = repo;
    }

    public User inactivate(String username) {
        if (username != null) {
            User user = this.repo.findFirstByUsername(username).orElse(null);

            if (user != null) {
                if (user.getRole() == Role.ADMINEMPLOYEE || user.getRole() == Role.ADMIN
                        || user.getRole() == Role.EMPLOYEE|| user.getRole() == Role.USER) {
                    user.setRole(Role.INACTIVE);
                    user.setShift(0);
                    return this.repo.save(user);
                }
            }
        }
        return null;
    }
}


