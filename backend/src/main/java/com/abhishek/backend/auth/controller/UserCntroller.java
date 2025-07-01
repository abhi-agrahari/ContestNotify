package com.abhishek.backend.auth.controller;


import com.abhishek.backend.auth.dto.PreferenceRequest;
import com.abhishek.backend.auth.model.User;
import com.abhishek.backend.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/user")
public class UserCntroller {

    @Autowired
    private UserRepository userRepo;

    @GetMapping("/test")
    public String testEndpoint() {
        return "UserController is working";
    }


    @PutMapping("/preferences")
    public ResponseEntity<?> updatePreference(@RequestBody PreferenceRequest req, Principal principal) {
        String email = principal.getName();

        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        user.setPlatformsSubscribed(req.getPlatforms());
        user.setNotifyBeforeMinutes(req.getNotifyBeforeMinutes());

        userRepo.save(user);

        return ResponseEntity.ok("Preference updated successfully");
    }

    @GetMapping("/preferences")
    public ResponseEntity<?> getPreferences(Principal principal) {
        String email = principal.getName();
        User user  = userRepo.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return ResponseEntity.ok(user);
    }
}
