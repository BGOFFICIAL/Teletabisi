package com.teletabisi.MedInstitutionApp.security.config;

import com.teletabisi.MedInstitutionApp.repository.UserRepository;
import com.teletabisi.MedInstitutionApp.security.jwt.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests((authorize) ->
                        authorize

                                .requestMatchers("api/v1/auth/**").permitAll()
                                .requestMatchers("api/v1/func/inactive/**").hasAnyRole("ADMINEMPLOYEE","ADMIN","USER","EMPLOYEE")
                                .requestMatchers("api/v1/func/administration/**").hasAnyRole("ADMIN", "ADMINEMPLOYEE")
                                .requestMatchers("/api/v1/func/employee/**").hasAnyRole("EMPLOYEE", "ADMIN", "ADMINEMPLOYEE")
                                .requestMatchers("/api/v1/func/appointment/request/**").hasAnyRole("USER")
                                .requestMatchers("/api/v1/func/appointment/all-appointments").hasAnyRole("EMPLOYEE", "ADMIN", "ADMINEMPLOYEE")
                                .requestMatchers("/api/v1/func/appointment/control").hasAnyRole("EMPLOYEE", "ADMIN", "ADMINEMPLOYEE")
                                .requestMatchers("/api/v1/func/appointment/accept/**").hasAnyRole("EMPLOYEE", "ADMIN", "ADMINEMPLOYEE")
                                .requestMatchers("/api/v1/func/appointment/new-appointment-date/**").hasAnyRole("EMPLOYEE", "ADMIN", "ADMINEMPLOYEE")
                                .requestMatchers("/api/v1/func/appointment/reject/**").hasAnyRole("EMPLOYEE", "ADMIN", "ADMINEMPLOYEE")
                                .requestMatchers("/api/v1/func/appointment/delete/**").hasAnyRole("EMPLOYEE", "ADMIN", "ADMINEMPLOYEE")
                                .anyRequest().authenticated())
                .sessionManagement((session) -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }


}
