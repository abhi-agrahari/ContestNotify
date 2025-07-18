package com.abhishek.backend.auth.controller;


import com.abhishek.backend.auth.dto.PreferenceRequest;
import com.abhishek.backend.auth.jwt.JwtUtil;
import com.abhishek.backend.auth.model.User;
import com.abhishek.backend.auth.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserCntroller {

    @Autowired
    private UserRepository userRepo;
    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping("/test")
    public String testEndpoint() {
        return "UserController is working";
    }

    @PostMapping("/preferences")
    public ResponseEntity<?> updatePreferences(@RequestBody PreferenceRequest req, Principal principal) {
        User user = userRepo.findByEmail(principal.getName()).orElseThrow();
        user.setPlatformsSubscribed(req.getPlatforms());
        user.setNotifyBeforeMinutes(req.getNotifyBeforeMinutes());
        userRepo.save(user);
        return ResponseEntity.ok("Preference saved");
    }

    @GetMapping("/preferences")
    public ResponseEntity<?> getPreferences(HttpServletRequest request) {
        String token = request.getHeader("Authorization").substring(7);
        String email = jwtUtil.extractEmail(token);
        User user = userRepo.findByEmail(email).orElseThrow();

        Map<String, Object> preferences = new HashMap<>();
        preferences.put("platforms", user.getPlatformsSubscribed());
        preferences.put("notifyBeforeMinutes", user.getNotifyBeforeMinutes());

        return ResponseEntity.ok(preferences);
    }
}
