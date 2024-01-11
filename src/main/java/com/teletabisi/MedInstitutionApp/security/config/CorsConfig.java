package com.teletabisi.MedInstitutionApp.security.config;


import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/v1/**")
                .allowedOrigins("http://3.79.60.253:3000", "http://medinstel.s3-website.eu-central-1.amazonaws.com","http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE");
    }
}
