package com.example.demo.controller;

import com.example.demo.domain.User;
import com.example.demo.service.MailService;
import com.example.demo.service.RentService;
import com.example.demo.service.ReviewService;
import com.example.demo.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;


@Slf4j
@RestController
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private RentService rentService;
    @Autowired
    private MailService mailService;
    @Autowired
    private ReviewService reviewService;

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
//        System.out.println("id = " + user.getUserId()); //확인
        reviewService.deleteReview1(user.getUserId());
        rentService.deleteRent(user.getUserId());
        return userService.deleteUser(user.getUserId());
    }

    //회원조회
    @PostMapping("/all")
    public List<User> findAll(){
        return userService.findAll();
    }

    //아이디찾기
    @PostMapping("/findid")
    public String findId(@RequestBody User user){
        return userService.findId(user);
    }

    //비밀번호 찾기: 정상적으로 메일 전송 됐는지
    @PostMapping("/findpw")
    public String findPw(@RequestBody User user){

        return mailService.sendMail(user);
    }

    //비밀번호 찾기: 인증 후 비밀번호 던져주기
    @PostMapping("/findpw/code")
    public String checkCode(@RequestBody HashMap<String,String> param){
//        String code = param.get("code");
        String userEmail = param.get("userEmail");
//        int code = Integer.parseInt(stringCode); //굳이 바꿔야 하나?

        return mailService.checkCode(userEmail);
    }
}