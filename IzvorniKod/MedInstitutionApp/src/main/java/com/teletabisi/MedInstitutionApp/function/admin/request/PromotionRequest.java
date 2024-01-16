package com.teletabisi.MedInstitutionApp.function.admin.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PromotionRequest {
    private String username;

    // private int 0 1 -> parna prijepodne ili 2 -> parna poslijepodne

    // 8:15 8:00 9:00 10:00
    // parna prijepodne -> 8, 9, 10, 11, 12, 13
    // parna poslijepodne -> 14, 15, 16, 17, 18, 19-20 !!

    // 1. smjena
    // 2. max kapacitet sobe
}
