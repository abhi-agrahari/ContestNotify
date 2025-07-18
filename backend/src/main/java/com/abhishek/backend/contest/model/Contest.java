package com.abhishek.backend.contest.model;

import lombok.Data;

@Data
public class Contest {

    private String name;
    private String url;
    private String platform;
    private String startTime;
    private String endTime;
    private long duration;
}
