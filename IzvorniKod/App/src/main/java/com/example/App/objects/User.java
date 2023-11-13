package com.example.App.objects;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.sql.Date;
import java.util.Objects;

@Entity
@Table(
        name = "user_table"
)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    @NotNull(message = "Unesi ime")
    String name;
    @NotNull(message = "Unesi prezime")
    String surname;
    @Column(unique = true)
    @NotNull(message = "Unesi korisničko ime")
    String username;
    @Column(unique = true)
    @Email(message = "Unesi ispravnu email adresu")
    @NotNull(message = "Unesi email adresu")
    String email;
    @NotNull(message = "Unesi lozinku")
    String password;
    @Column(unique = true)
    @NotNull(message = "Unesi OIB")
    @Size(min = 11, max = 11, message = "OIB mora imati 11 znamenki")
    String OIB;
    @NotNull(message = "Označi spol")
    String gender;
    @NotNull(message = "Označi datum rođenja")
    Date dateOfBirth;

    public User() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getOIB() {
        return OIB;
    }

    public void setOIB(String OIB) {
        this.OIB = OIB;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public boolean equals(Object o) {
        if (this == o) {
            return true;
        } else if (o != null && this.getClass() == o.getClass()) {
            User that = (User)o;
            return Objects.equals(this.id, that.id) &&  Objects.equals(this.name, that.name) &&
                    Objects.equals(this.surname, that.surname) && Objects.equals(this.username, that.username) &&
                    Objects.equals(this.email, that.email) && Objects.equals(this.password, that.password) &&
                    Objects.equals(this.OIB, that.OIB) && Objects.equals(this.gender, that.gender) &&
                    Objects.equals(this.dateOfBirth, that.dateOfBirth);
        } else {
            return false;
        }
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", surname='" + surname + '\'' +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", OIB='" + OIB + '\'' +
                ", gender='" + gender + '\'' +
                ", dateOfBirth=" + dateOfBirth +
                '}';
    }
}
