package com.abhishek.backend.auth.model;

import jdk.jfr.DataAmount;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "user")
public class User {
    @Id
    private String id;

    private String name;

    @Indexed(unique = true)
    private String email;

    private String password;
    private int notifyBeforeMinutes;

    private List<String> platformsSubscribed = new ArrayList<>();

    public void setPlatformsSubscribed(List<String> platformsSubscribed) {
        this.platformsSubscribed = platformsSubscribed != null ? platformsSubscribed : new ArrayList<>();
    }
}
