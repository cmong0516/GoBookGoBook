package com.example.demo.web;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;

@Getter @Setter
public class MemberForm {

    @NotEmpty(message = "아이디는 필수 입니다")
    private String userId;

    @NotEmpty(message = "비밀번호는 필수입니다.")
    private String userPw;

    @NotEmpty(message = "이름은 필수입니다.")
    private String userName;

    @NotEmpty(message = "이메일은 필수입니다.")
    private String userEmail;

}