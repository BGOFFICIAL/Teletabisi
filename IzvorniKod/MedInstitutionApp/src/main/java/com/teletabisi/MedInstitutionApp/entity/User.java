package com.teletabisi.MedInstitutionApp.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.sql.Date;
import java.time.LocalDate;
import java.util.Collection;
import java.util.List;
import java.util.Objects;

@Getter
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User implements UserDetails {

    @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    private LocalDate StartDate;

    @Setter
    @NotNull(message = "Unesi ime")
    private String firstname;

    @Setter
    @NotNull(message = "Unesi prezime")
    private String lastname;

    @Setter
    @Column(unique = true)
    @NotNull(message = "Unesi korisničko ime")
    private String username;

    @Setter
    @Column(unique = true)
    @Email(message = "Unesi ispravnu email adresu")
    @NotNull(message = "Unesi email adresu")
    private String email;

    @Setter
    @NotNull(message = "Unesi lozinku")
    private String password;

    @Setter
    @Column(unique = true)
    @NotNull(message = "Unesi OIB")
    @Size(min = 11, max = 11, message = "OIB mora imati 11 znamenki")
    private String OIB;

    @Setter
    @NotNull(message = "Označi spol")
    private String gender;

    @Setter
    @NotNull(message = "Označi datum rođenja")
    private Date dateOfBirth;

    @Setter
    @Enumerated(EnumType.STRING)
    private Role role;

    @Setter
    // 0 za korisnika,
    // 1 Neparni datumi ujutro, Parni datumi popodne,
    // 2 Neparni datumi popodne, Parni datumi ujutro
    private int shift;

    public int getShift() {
        return shift;
    }

    public void setShift(int shift) {
        this.shift = shift;
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
            User that = (User) o;
            return Objects.equals(this.id, that.id) && Objects.equals(this.firstname, that.firstname) &&
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
