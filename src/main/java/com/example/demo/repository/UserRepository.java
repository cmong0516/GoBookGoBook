package com.example.demo.repository;

import com.example.demo.domain.User;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Transactional
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
        return em.createQuery("select u from User u where u.userId = :userId", User.class)
                .setParameter("userId",userId)
                .getResultList();
    }

    //delete from User where userId = ?

    //행 삭제
    public void delete(User user) {
        em.remove(user);
    }

    //회원조회
    public List<User> findAll(){
        return em.createQuery("select u from User u", User.class)
                .getResultList();
    }
}
