package com.example.demo.controller;

import com.example.demo.domain.User;
import com.example.demo.service.RentService;
import com.example.demo.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Slf4j
@RestController
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private RentService rentService;

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

//        System.out.println("user.getUserId() = " + user.getUserId());
//        System.out.println("user.getUserEmail() = " + user.getUserEmail());
        return userService.updateUser(user);

    }

    @DeleteMapping("/delete")
    public boolean delete(@RequestBody User user){
//        System.out.println("id = " + id); //확인
        rentService.deleteRent(user.getUserId());
        return userService.deleteUser(user.getUserId());
    }

    @PostMapping("/all")
    public List<User> findAll(){
        return userService.findAll();
    }
}