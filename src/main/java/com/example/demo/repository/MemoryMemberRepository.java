package com.example.demo.repository;
import com.example.demo.domain.Member;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.*;


public class MemoryMemberRepository implements MemberRepository {

/*    private static Map<Long, Member> store = new HashMap<>();//static사용
    private static long sequence = 0L;//static*/ //JPA 활용 x

    @PersistenceContext
    private EntityManager em;

    @Override
    public Member save(Member member) {
/*        member.setId(++sequence);
        log.info("save: member={}", member);
        store.put(member.getId(), member);
        return member;*/ //JPA 활용 x

        em.persist(member);
        return member;
    }

    @Override
    public Optional<Member> findByUserId(String userId) {
       return findAll().stream()
                .filter(m -> m.getUserId().equals(userId))
                .findFirst();
        //JPA 활용
        /*return em.createQuery("select m from Member m where m.userId = :userId", Member.class)
                .setParameter("userId", userId)
                .getResultList(); *//*jpql???이용*/

    }
    @Override
    public Member findById(long id) {
        /*return store.get(id);*/ //JPA 활용 x
        return em.find(Member.class, id);
    }

    @Override
    public List<Member> findAll() {
        /*return new ArrayList<>(store.values());*/ //JPA 활용 x
        return em.createQuery("select m from Member m", Member.class)
                .getResultList();
    }


}