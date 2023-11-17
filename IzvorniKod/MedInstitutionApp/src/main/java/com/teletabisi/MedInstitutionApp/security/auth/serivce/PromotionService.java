package com.teletabisi.MedInstitutionApp.security.auth.serivce;

import com.teletabisi.MedInstitutionApp.entity.Role;
import com.teletabisi.MedInstitutionApp.entity.User;
import com.teletabisi.MedInstitutionApp.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Date;

@Service
public class PromotionService {
    private UserRepository repo;

    public PromotionService(UserRepository repo){this.repo = repo;}

    public User promoteUser(String username){
        if (username != null){
            User user = this.repo.findFirstByUsername(username).orElse(null);

            if (user != null){
                if(user.getRole() == Role.USER || user.getRole() == Role.INACTIVE) {
                    user.setStartDate(LocalDate.now());
                    user.setRole(Role.EMPLOYEE);
                    return this.repo.save(user);
                }
            }
        }
        return null;
    }

    public User demoteUser(String username){
        if(username != null){
            User user = this.repo.findFirstByUsername(username).orElse(null);

            if(user != null){
                if(user.getRole() == Role.EMPLOYEE){
                    user.setRole(Role.INACTIVE);
                    return this.repo.save(user);
                }
            }
        }
        return null;
    }
}
