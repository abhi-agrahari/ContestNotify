package com.abhishek.backend.auth.controller;


import com.abhishek.backend.auth.jwt.JwtUtil;
import com.abhishek.backend.auth.model.User;
import com.abhishek.backend.auth.repository.UserRepository;
import com.abhishek.backend.auth.service.UserService;
import com.abhishek.backend.contest.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            if (userRepo.findByEmail(user.getEmail()).isPresent()) {
                return ResponseEntity
                        .status(HttpStatus.CONFLICT)
                        .body("User already exists with this email");
            }
            user.setPassword(passwordEncoder.encode(user.getPassword()));

            List<String> defaultPlatforms = List.of("Leetcode", "Codeforces", "Atcoder", "CodeChef", "HackerEarth");
            user.setPlatformsSubscribed(defaultPlatforms);
            user.setNotifyBeforeMinutes(10);
            user.setEmailEnabled(true);
            String token = UUID.randomUUID().toString();
            user.setVerificationToken(token);
            user.setVerified(false);
            userRepo.save(user);

            String verifyUrl = "http://localhost:8080/api/auth/verify-email?token=" + token;
            emailService.sendEmail(
                    user.getEmail(),
                    "Verify your email",
                    "Click the link to verify your email: " + verifyUrl
            );


            return ResponseEntity.ok("User registered successfully");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        try {
            Optional<User> optionalUser = userRepo.findByEmail(user.getEmail());

            if (optionalUser.isEmpty()) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid credentials");
            }

            User dbUser = optionalUser.get();

            if (!dbUser.isVerified()) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Email not verified. Please verify your email first.");
            }

            Authentication auth = authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword())
            );

            String token = jwtUtil.generateToken(user.getEmail());
            return ResponseEntity.ok(Collections.singletonMap("token", token));

        } catch (Exception e) {
            System.out.println("Authentication failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Login failed");
        }
    }


    @GetMapping("/verify-email")
    public ResponseEntity<String> verifyUser(@RequestParam("token") String token) {
        Optional<User> optionalUser = userRepo.findByVerificationToken(token);

        if (optionalUser.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid verification token.");
        }

        User user = optionalUser.get();

        if (user.isVerified()) {
            return ResponseEntity.ok("Email is already verified.");
        }

        user.setVerified(true);
        user.setVerificationToken(null);
        userRepo.save(user);

        return ResponseEntity.ok("Email verified successfully. You can now log in.");
    }
}
