package com.example.App.repo;

import com.example.App.objects.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppRepository extends JpaRepository<User, Integer> {
    Optional<User> findByUsernameAndPassword(String username, String password);
    Optional<User> findFirstByUsername(String username);
    Optional<User> findFirstByEmail(String email);
    Optional<User> findFirstByOIB(String OIB);


}
