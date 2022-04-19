package com.example.demo.controller;

import com.example.demo.domain.User;
import com.example.demo.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@Slf4j
@RestController
<<<<<<<< HEAD:src/main/java/com/example/demo/controller/UserController.java
public class UserController {
========
public class MemberController {
>>>>>>>> pooh:src/main/java/com/example/demo/controller/MemberController.java

    @Autowired
    private UserService userService;

    //회원가입 로직
    @PostMapping("/signin")
    public boolean join(@RequestBody User user){

        return userService.joinUser(user); //상태코드 넘겨주기
    }
    
    //로그인 로직
    @PostMapping("/login")
    public boolean login(@RequestBody User user){

        return userService.loginUser(user);
    }
}