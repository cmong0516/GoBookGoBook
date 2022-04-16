package com.example.demo.controller;

import com.example.demo.domain.Member;
import com.example.demo.service.MemberService;
import com.example.demo.web.MemberForm;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.validation.Valid;

@Controller
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @PostMapping(value = "/signin")
    public void create(@Valid @RequestParam(name = "userId")String userId, MemberForm form, BindingResult result) {

        Member member = new Member();
        member.setUserId(form.getUserId());
//        member.setUserPw(form.getUserPw());
//        member.setUserName(form.getUserName());
//        member.setUserEmail(form.getUserEmail());

        System.out.println("==================userId = " + userId);
    }

    /*회원목록 조회*/
    //일단 나중에 form도 만들어야 함 0414지원석
}
