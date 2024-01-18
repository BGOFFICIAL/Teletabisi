package com.teletabisi.MedInstitutionApp.function.admin.service;

import com.teletabisi.MedInstitutionApp.entity.Role;
import com.teletabisi.MedInstitutionApp.entity.User;
import com.teletabisi.MedInstitutionApp.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class PromotionService {
    private UserRepository repo;

    public PromotionService(UserRepository repo) {
        this.repo = repo;
    }

    /**
     * Cilj: promocija user-a/inactive user-a u employee-a
     *
     * @param username
     * @return
     */
    public User promoteUser(String username, int shift) {
        if (username != null) {
            User user = this.repo.findFirstByUsername(username).orElse(null);

            if (user != null) {
                if (user.getRole() == Role.USER || user.getRole() == Role.INACTIVE) {
                    user.setStartDate(LocalDate.now());
                    user.setRole(Role.EMPLOYEE);
                    user.setShift(shift);
                    return this.repo.save(user);
                }
            }
        }
        return null;
    }

    /**
     * Cilj: degradacija adminemployee-a/employee-a/user-a u inactive user-a
     *
     * @param username
     * @return
     */
    public User demoteUser(String username) {
        if (username != null) {
            User user = this.repo.findFirstByUsername(username).orElse(null);

            if (user != null) {
                if (user.getRole() == Role.ADMINEMPLOYEE || user.getRole() == Role.EMPLOYEE || user.getRole() == Role.USER) {
                    user.setRole(Role.INACTIVE);
                    user.setShift(0);
                    return this.repo.save(user);
                }
            }
        }
        return null;
    }

    /**
     * Autor: Neven Pralas;
     * Cilj: Promocija employee-a u adminemployee
     *
     * @param username
     * @return
     */
    public User promoteEmployee(String username) {
        if (username != null) {
            User user = this.repo.findFirstByUsername(username).orElse(null);

            if (user != null) {
                if (user.getRole() == Role.EMPLOYEE) {
                    user.setRole(Role.ADMINEMPLOYEE);
                    return this.repo.save(user);
                }
            }
        }
        return null;
    }

    /**
     * Autor: Neven Pralas;
     * Cilj: Degradacija adminemployee-a u employee-a
     *
     * @param username
     * @return
     */
    public User demoteEmployee(String username) {
        if (username != null) {
            User user = this.repo.findFirstByUsername(username).orElse(null);

            if (user != null) {
                if (user.getRole() == Role.ADMINEMPLOYEE) {
                    user.setRole(Role.EMPLOYEE);
                    return this.repo.save(user);
                }
            }
        }
        return null;
    }
}
