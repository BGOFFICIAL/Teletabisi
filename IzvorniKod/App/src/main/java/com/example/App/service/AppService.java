package com.example.App.service;

import com.example.App.objects.User;
import com.example.App.repo.AppRepository;
import org.springframework.stereotype.Service;

@Service
public class AppService {

    private AppRepository repo;

    public AppService(AppRepository repo) {
        this.repo = repo;
    }

    public User registerUser(String username, String password, String email, String OIB) {
        if (password != null && username != null) {
            if (this.repo.findFirstByUsername(username).isPresent()) {
                System.out.println("Duplicate login");
                return null;
            } else {
                User user = new User();
                user.setUsername(username);
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
