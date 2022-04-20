package com.example.demo.repository;

import com.example.demo.domain.Rent;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
public class RentRepositoryImpl implements RentRepository {
    private final EntityManager em;

    public RentRepositoryImpl(EntityManager em) {
        this.em = em;
    }

    @Override
    public Rent save(Rent rent) {
        em.persist(rent);
        return rent;
    }

    @Override
    public List<Rent> findAllByUserId(String userId) {
        List<Rent> result = em.createQuery("select r from Rent r where r.userId = :userId", Rent.class)
                .setParameter("userId",userId)
                .getResultList();
        return result;
    }

    @Override
    public Rent findByRentId(Long rentId) {
        Rent rent = em.find(Rent.class, rentId);
        return rent;
    }

    @Override
    public List<Rent> findAll() {
        return em.createQuery("select r from Rent r", Rent.class)
                .getResultList();
    }

    @Override
    public Rent returnbook(Rent rent) {
        return null;
    }
}
