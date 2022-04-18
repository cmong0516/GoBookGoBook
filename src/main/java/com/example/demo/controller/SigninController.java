package com.example.demo.controller;

import com.example.demo.domain.User;
import com.example.demo.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@Slf4j
@RestController
public class SigninController{

    @Autowired
    private UserService userService;

    @PostMapping(value = "/signin")
    public Long create(@RequestBody User memberForm){

        return userService.joinUser(memberForm);
    }

    /*회원목록 조회*/
    //일단 나중에 form도 만들어야 함 0414지원석
}