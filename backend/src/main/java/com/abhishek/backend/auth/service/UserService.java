package com.abhishek.backend.auth.service;

import com.abhishek.backend.auth.model.User;
import com.abhishek.backend.auth.repository.UserRepository;
import com.abhishek.backend.contest.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private EmailService emailService;

    public void registerUser(User user) {
        user.setVerified(false);
        user.setVerificationToken(UUID.randomUUID().toString());

        userRepo.save(user);

        String verifyLink = "http://localhost:3000/verify-email?token=" + user.getVerificationToken();
        emailService.sendEmail(user.getEmail(), "Verify Your Email", "Click here to verify: " + verifyLink);
    }

    public boolean verifyEmail(String token) {
        return userRepo.findByVerificationToken(token).map(user -> {
            user.setVerified(true);
            user.setVerificationToken(null); // optional cleanup
            userRepo.save(user);
            return true;
        }).orElse(false);
    }
}

