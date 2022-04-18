package com.example.demo.service;

import com.example.demo.object.Member;
import com.example.demo.repository.MemberRepository;
import com.example.demo.repository.MemoryMemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
//@Transactional 쓸지 말지. 정확히 이해 후 사용.
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository = new MemoryMemberRepository();

    /*회원가입*/
    public Long join(Member member) {
        validateDuplicateMember(member);// 중복회원 검증
        memberRepository.save(member);
        return member.getId();
    }

    private void validateDuplicateMember(Member member) {
        Optional<Member> findMembers =
                memberRepository.findByUserId(member.getUserId());
        if (!findMembers.isEmpty()) {
            throw new IllegalStateException("이미 존재하는 회원입니다");
        }//이부분 List에서 Optional로 바꿈 꼬일수도 있음.
    }

    /*전체 회원 조회*/
    public List<Member> findAllMembers() {
        return memberRepository.findAll();
    }

    public Member findOne(Long id) {
        return memberRepository.findById(id);
    }

}
