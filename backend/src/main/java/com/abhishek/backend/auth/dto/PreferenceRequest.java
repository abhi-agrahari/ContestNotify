package com.abhishek.backend.auth.dto;

import lombok.Data;

import java.util.List;

@Data
public class PreferenceRequest {
    private List<String> platforms;
    private boolean emailEnabled;
    private int notifyBeforeMinutes;
}

