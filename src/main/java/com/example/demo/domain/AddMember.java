package com.example.demo.domain;

import javax.persistence.Entity;
import javax.validation.constraints.NotBlank;

@Entity
public class AddMember {
    @NotBlank
    private String userId;
    private String userpw;
    private String userName;
    private String useremail;
}
