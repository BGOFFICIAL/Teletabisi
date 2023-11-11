package com.example.App.objects;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.Objects;

@Entity
@Table(
        name = "user_table"
)
public class User {
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    Integer id;
    String username;
    String email;
    String password;
    String OIB;

    public User() {
    }

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getOIB() {
        return this.OIB;
    }

    public void setOIB(String OIB) {
        this.OIB = OIB;
    }

    public boolean equals(Object o) {
        if (this == o) {
            return true;
        } else if (o != null && this.getClass() == o.getClass()) {
            User that = (User)o;
            return Objects.equals(this.id, that.id) && Objects.equals(this.username, that.username) && Objects.equals(this.password, that.password) && Objects.equals(this.email, that.email) && Objects.equals(this.OIB, that.OIB);
        } else {
            return false;
        }
    }

    public int hashCode() {
        return Objects.hash(new Object[]{this.id, this.username, this.email, this.password, this.OIB});
    }

    public String toString() {
        return "User{id=" + this.id + ", username='" + this.username + "', email='" + this.email + "', password='" + this.password + "', OIB='" + this.OIB + "'}";
    }
}
