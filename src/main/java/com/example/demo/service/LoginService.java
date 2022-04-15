package com.example.demo.service;

import com.example.demo.domain.Member;
import com.example.demo.repository.MemberRepository;
import com.example.demo.repository.MemoryMemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoginService {

    private final MemberRepository memberRepository = new MemoryMemberRepository();

    /*@return null이면 로그인 실패*/
    public Member login(String userId, String userPw) {
        return memberRepository.findByUserId(userId)
                .filter(m -> m.getUserPw().equals(userPw))
                .orElse(null);
    }

}
