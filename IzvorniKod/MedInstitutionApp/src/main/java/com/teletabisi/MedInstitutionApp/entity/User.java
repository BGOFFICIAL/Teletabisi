package com.teletabisi.MedInstitutionApp.entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.util.Objects;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="users")
public class User implements UserDetails {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY )
    private Long id;
    private LocalDate StartDate;

    @NotNull(message = "Unesi ime")
    private String firstname;
    @NotNull(message = "Unesi prezime")
    private String lastname;
    @Column(unique = true)
    @NotNull(message = "Unesi korisničko ime")
    private String username;

    @Column(unique = true)
    @Email(message = "Unesi ispravnu email adresu")
    @NotNull(message = "Unesi email adresu")
    private String email;
    @NotNull(message = "Unesi lozinku")
    private String password;
    @Column(unique = true)
    @NotNull(message = "Unesi OIB")
    @Size(min = 11, max = 11, message = "OIB mora imati 11 znamenki")
    private String OIB;

    @NotNull(message = "Označi spol")
    private String gender;
    @NotNull(message = "Označi datum rođenja")
    private Date dateOfBirth;
    @Enumerated(EnumType.STRING)
    private Role role;


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getOIB() {
        return OIB;
    }

    public void setOIB(String OIB) {
        this.OIB = OIB;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public LocalDate getStartDate() {
        return StartDate;
    }

    public void setStartDate(LocalDate startDate) {
        StartDate = startDate;
    }


    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    public boolean equals(Object o) {
        if (this == o) {
            return true;
        } else if (o != null && this.getClass() == o.getClass()) {
            User that = (User)o;
            return Objects.equals(this.id, that.id) &&  Objects.equals(this.firstname, that.firstname) &&
                    Objects.equals(this.lastname, that.lastname) && Objects.equals(this.username, that.username) &&
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
                ", name='" + firstname + '\'' +
                ", surname='" + lastname + '\'' +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", OIB='" + OIB + '\'' +
                ", gender='" + gender + '\'' +
                ", dateOfBirth=" + dateOfBirth +
                '}';
    }


}
