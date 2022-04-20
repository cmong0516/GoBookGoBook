package com.example.demo.controller;

import com.example.demo.domain.User;
import com.example.demo.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@Slf4j
@RestController
public class UserController {

    @Autowired
    private UserService userService;

    //회원가입 로직
    @PostMapping("/signin")
    public boolean join(@RequestBody User user){

        return userService.joinUser(user); //상태코드 넘겨주기
    }
    
    //로그인 로직
    @PostMapping("/login")
    public User login(@RequestBody User user){

        return userService.loginUser(user);
    }

    @PutMapping("/mypage")
    public User update(@RequestBody User user){

        return userService.updateUser(user);

    }
}