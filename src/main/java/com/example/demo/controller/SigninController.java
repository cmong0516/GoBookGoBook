package com.example.demo.controller;

import com.example.demo.web.MemberForm;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;


@Slf4j
@RestController
public class SigninController{

    @PostMapping(value = "/signin")
    public String create(@RequestBody MemberForm memberForm){
        System.out.println("memberForm = " + memberForm.getUserId());
        System.out.println("memberForm = " + memberForm.getUserPw());
        System.out.println("memberForm = " + memberForm.getUserName());
        System.out.println("memberForm = " + memberForm.getUserEmail());
        return ".";
    }

    /*회원목록 조회*/
    //일단 나중에 form도 만들어야 함 0414지원석
}