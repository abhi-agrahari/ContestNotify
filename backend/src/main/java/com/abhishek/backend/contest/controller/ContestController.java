package com.abhishek.backend.contest.controller;

import com.abhishek.backend.auth.dto.PreferenceRequest;
import com.abhishek.backend.auth.model.User;
import com.abhishek.backend.auth.repository.UserRepository;
import com.abhishek.backend.contest.model.Contest;
import com.abhishek.backend.contest.service.ContestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

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


}
