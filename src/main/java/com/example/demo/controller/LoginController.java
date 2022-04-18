package com.example.demo.controller;

import com.example.demo.object.Member;
import com.example.demo.service.LoginService;
import com.example.demo.web.LoginForm;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.validation.Valid;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("/test")
public class LoginController {

    private final LoginService loginService;

    @PostMapping
    public String login(@Valid @ModelAttribute LoginForm form, BindingResult bindingResult) {
        log.warn(String.valueOf(form));
        if (bindingResult.hasErrors()) {
            return "login/loginForm";
        }

        Member loginMember = loginService.login(form.getUserId(), form.getUserPw());
        log.info("login? {}", loginMember);

        if (loginMember == null) {
            bindingResult.reject("loginFail", "아이디 또는 비밀번호가 맞지 않습니다.");
            return "login/loginForm";
        }
        /*로그인 성공처리*/
        return "redirect:/";
    }
}
