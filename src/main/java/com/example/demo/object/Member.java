package com.example.demo.object;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
public class Member {
    private Long id;
    private String userId;
    private String userPw;
    private String userName;
    private String userEmail;
}
