package com.example.demo.repository;

import com.example.demo.object.Member;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MemberRepository {

    Member save(Member member);

    Optional<Member> findByUserId(String userId);

    Member findById(long id);

    List<Member> findAll();
}