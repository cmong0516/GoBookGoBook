package com.example.demo.controller;

import com.example.demo.object.Member;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;


@Slf4j
@RestController
public class SigninController{

    @PostMapping(value = "/signin")
    public String create(@RequestBody Member member){
        System.out.println("member = " + member.getUserId());
        System.out.println("member = " + member.getUserPw());
        System.out.println("member = " + member.getUserName());
        System.out.println("member = " + member.getUserEmail());
        return ".";
    }

    /*회원목록 조회*/
    //일단 나중에 form도 만들어야 함 0414지원석
}