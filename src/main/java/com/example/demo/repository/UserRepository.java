package com.example.demo.repository;

import com.example.demo.domain.User;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
public class UserRepository {

    @PersistenceContext
    private final EntityManager em;

    public UserRepository(EntityManager em) {
        this.em = em;
    }

    //저장
    public void save(User user){
        em.persist(user);
    }

    //아이디로 찾기
    public List<User> findById(String userId){
        return em.createQuery("select m from User m where m.userId = :userId", User.class)
                .setParameter("userId",userId)
                .getResultList();
    }
}
