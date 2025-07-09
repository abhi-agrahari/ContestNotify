package com.abhishek.backend.contest.service;

import com.abhishek.backend.contest.model.Contest;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@Service
public class ContestService {

    private final String API_URL = "https://contest-hive.vercel.app/api/all";

    public List<Contest> fetchAll() {
        try {
            RestTemplate rt = new RestTemplate();
            String json = rt.getForObject(API_URL, String.class);

            ObjectMapper mapper = new ObjectMapper();
            Map<String, Object> resp = mapper.readValue(json, Map.class);

            List<Map<String, Object>> data = (List<Map<String, Object>>) resp.get("data");
            if (data == null) return new ArrayList<>();

            List<Contest> contests = new ArrayList<>();
            for (Map<String, Object> m : data) {
                Contest c = new Contest();
                c.setName((String) m.get("title"));
                c.setUrl((String) m.get("url"));
                c.setSite((String) m.get("platform"));
                c.setStartTime((String) m.get("startTime"));
                c.setEndTime((String) m.get("endTime"));
                c.setDuration(((Number) m.get("duration")).longValue());
                contests.add(c);
            }
            return contests;
        } catch (Exception e) {
            System.out.println("Error fetching contests: " + e.getMessage());
            return Collections.emptyList();
        }
    }
}