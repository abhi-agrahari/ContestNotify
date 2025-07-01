package com.abhishek.backend.contest.service;

import com.abhishek.backend.contest.model.Contest;
import lombok.Data;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

@Service
public class ContestService {

    private final String API_URL = "url";

    public List<Contest> getContests() {
        RestTemplate restTemplate = new RestTemplate();
        Contest[] contests = restTemplate.getForObject(API_URL, Contest[].class);
        return Arrays.asList(contests);
    }
}