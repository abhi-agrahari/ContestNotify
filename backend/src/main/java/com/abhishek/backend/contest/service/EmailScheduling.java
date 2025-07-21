package com.abhishek.backend.contest.service;

import com.abhishek.backend.auth.model.User;
import com.abhishek.backend.auth.repository.UserRepository;
import com.abhishek.backend.contest.model.Contest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class EmailScheduling {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ContestService contestService;

    @Autowired
    private EmailService emailService;

    @Scheduled(fixedRate = 60000)
    public void sendEmail() {
        List<User> users = userRepository.findAll();

        for (User user : users) {
            for(String platform : user.getPlatformsSubscribed()){
                List<Contest> contests = contestService.fetchAll().stream()
                        .filter(c -> c.getPlatform().equalsIgnoreCase(platform))
                        .filter(c -> {
                            LocalDateTime start = LocalDateTime.parse(c.getStartTime(), DateTimeFormatter.ISO_DATE_TIME);
                            long minBefore = Duration.between(start, LocalDateTime.now()).toMinutes();
                            return minBefore <= user.getNotifyBeforeMinutes() && minBefore > user.getNotifyBeforeMinutes() - 2;
                        }).toList();

                for (Contest contest : contests) {
                    emailService.sendEmail(
                            user.getEmail(),
                            "Contest Reminder : " + contest.getName(),
                            "Platform" + contest.getPlatform() + "\nStart : " + contest.getStartTime() + "\nURL : " + contest.getUrl()
                    );
                }
            }
        }
    }
}
