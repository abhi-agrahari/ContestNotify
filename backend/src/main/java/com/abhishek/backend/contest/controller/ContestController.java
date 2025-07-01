package com.abhishek.backend.contest.controller;

import com.abhishek.backend.contest.model.Contest;
import com.abhishek.backend.contest.service.ContestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/contests")
public class ContestController {

    @Autowired
    private ContestService contestService;

    @GetMapping
    public List<Contest> getAllContests() {
        return contestService.getContests();
    }
}
