package com.example.demo.repository;

import com.example.demo.domain.Rent;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.time.LocalDate;
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

    public List<Rent> findByIsbn(String isbn){
        return em.createQuery("select r from Rent r where r.isbn=:isbn and r.state=1",Rent.class)
                .setParameter("isbn",isbn)
                .getResultList();
    }

    @Override
    public List<Rent> findAll() {
        return em.createQuery("select r from Rent r", Rent.class)
                .getResultList();
    }

    @Override
    public Rent returnBook(Long rentId) {
        Rent byRentId = findByRentId(rentId);
        LocalDate now = LocalDate.now();
        byRentId.setState(false);
        byRentId.setReturnDate(now);
        return save(byRentId);
    }

    @Override
    public boolean deleteRent(String userId) {
        List<Rent> allByUserId = findAllByUserId(userId);
        for (Rent rent : allByUserId) {
            em.remove(rent);
        }
        return true;
    }
}
