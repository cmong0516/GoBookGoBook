package com.example.demo.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;


public class AddMember {
    @Id
    @Column(name = "id", nullable = false)
    private Long id;

    @NotBlank
    private String userId;
    private String userpw;
    private String userName;
    private String useremail;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
