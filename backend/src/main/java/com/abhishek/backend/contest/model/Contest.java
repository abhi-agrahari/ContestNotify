package com.abhishek.backend.contest.model;

import lombok.Data;

@Data
public class Contest {

    private String name;
    private String url;
    private String site;
    private String startTime;
    private String endTime;
    private boolean in_24_hours;
    private String status;
}
