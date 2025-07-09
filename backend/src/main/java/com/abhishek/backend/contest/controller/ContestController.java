package com.abhishek.backend.contest.controller;

import com.abhishek.backend.contest.model.Contest;
import com.abhishek.backend.contest.service.ContestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class ContestController {

    @Autowired
    private ContestService contestService;

    @GetMapping("/contests")
    public List<Contest> getAllContests() {
        return contestService.fetchAll();
    }

//    @GetMapping
//    public List<Map<String, Object>> getDummyContests() {
//        List<Map<String, Object>> contests = new ArrayList<>();
//
//        contests.add(Map.of(
//                "name", "Codeforces Round #999",
//                "platform", "Codeforces",
//                "startTime", new Date().getTime() + 3600_000, // 1 hr from now
//                "duration", 120,
//                "url", "https://codeforces.com/contest/999"
//        ));
//
//        contests.add(Map.of(
//                "name", "LeetCode Weekly Contest 999",
//                "platform", "LeetCode",
//                "startTime", new Date().getTime() + 7200_000, // 2 hr from now
//                "duration", 90,
//                "url", "https://leetcode.com/contest/weekly-contest-999"
//        ));
//
//        return contests;
//    }
}
