package com.teletabisi.MedInstitutionApp.security.config;

import com.teletabisi.MedInstitutionApp.security.jwt.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
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
                .authorizeHttpRequests((authorize) ->
                        authorize
                                .requestMatchers("api/v1/auth/**").permitAll()
                                .requestMatchers("api/v1/auth/administration/**").hasAnyRole("ADMIN", "ADMINEMPLOYEE")
                                .requestMatchers("/api/v1/auth/appointment/control").hasAnyRole("EMPLOYEE", "ADMIN", "ADMINEMPLOYEE")
                                .requestMatchers("/api/v1/auth/appointment/accept/**").hasAnyRole("EMPLOYEE", "ADMIN", "ADMINEMPLOYEE")
                                .requestMatchers("/api/v1/auth/appointment/reject/**").hasAnyRole("EMPLOYEE", "ADMIN", "ADMINEMPLOYEE")
                                .requestMatchers("/api/v1/auth/appointment/new-appointment-date/**").hasAnyRole("EMPLOYEE", "ADMIN", "ADMINEMPLOYEE")
                                .requestMatchers("/api/v1/auth/appointment/delete/**").hasAnyRole("EMPLOYEE", "ADMIN", "ADMINEMPLOYEE")
                                .requestMatchers("/api/v1/auth/appointment/administration/**").hasAnyRole("ADMIN", "ADMINEMPLOYEE")
                                .requestMatchers("/api/v1/auth/employee/**").hasAnyRole("EMPLOYEE", "ADMIN", "ADMINEMPLOYEE")
                                .anyRequest().authenticated())
                .sessionManagement((session) -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
