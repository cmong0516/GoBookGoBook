package com.example.demo.controller;

import com.example.demo.object.Member;
import com.example.demo.service.MemberService;
import com.example.demo.web.MemberForm;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@Slf4j
@RestController
public class SigninController{
    @Autowired
    private final MemberService memberService;

    public SigninController(MemberService memberService) {
        this.memberService = memberService;
    }

    @PostMapping(value = "/signin")
    public Member create(@RequestBody MemberForm memberForm){
        Member member = new Member();
        member.setUserId(memberForm.getUserId());
        member.setUserPw(memberForm.getUserPw());
        member.setUserName(memberForm.getUserName());
        member.setUserEmail(memberForm.getUserEmail());
        memberService.join(member);
        return member;
    }

    /*회원목록 조회*/
    //일단 나중에 form도 만들어야 함 0414지원석
}