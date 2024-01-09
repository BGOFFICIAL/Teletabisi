package com.teletabisi.MedInstitutionApp.email;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/*
autor: Neven Pralas
Opis: Struktura maila
 */
@Getter
@Setter
@NoArgsConstructor
public class MailStructure {
    private String subject;
    private String message;
}
