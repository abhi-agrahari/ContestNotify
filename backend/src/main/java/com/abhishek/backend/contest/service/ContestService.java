package com.abhishek.backend.contest.service;

import com.abhishek.backend.contest.model.Contest;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class ContestService {

    private final String API_URL = "https://contest-hive.vercel.app/api/all";

    public List<Contest> fetchAll() {
        try {
            RestTemplate rt = new RestTemplate();
            String json = rt.getForObject(API_URL, String.class); // Get raw JSON string

            ObjectMapper mapper = new ObjectMapper();
            Map<String, Object> resp = mapper.readValue(json, Map.class); // Manually parse JSON

            if (resp == null || !resp.containsKey("data")) {
                return new ArrayList<>();
            }

            Map<String, List<Map<String, Object>>> data = (Map<String, List<Map<String, Object>>>) resp.get("data");
            List<Contest> contests = new ArrayList<>();

            for (List<Map<String, Object>> platformContests : data.values()) {
                for (Map<String, Object> m : platformContests) {
                    Contest c = new Contest();
                    c.setName((String) m.get("title"));
                    c.setUrl((String) m.get("url"));
                    c.setPlatform((String) m.get("platform"));
                    c.setStartTime((String) m.get("startTime"));
                    c.setEndTime((String) m.get("endTime"));
                    c.setDuration(((Number) m.get("duration")).longValue());
                    contests.add(c);
                }
            }

            return contests;
        } catch (Exception e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }
}
