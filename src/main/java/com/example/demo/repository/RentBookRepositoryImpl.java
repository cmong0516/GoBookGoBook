package com.example.demo.repository;

import com.example.demo.object.RentBook;
import org.springframework.stereotype.Repository;
import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;

@Repository
public class RentBookRepositoryImpl implements RentBookReposiroty{

    private final EntityManager em;

    public RentBookRepositoryImpl(EntityManager em) {
        this.em = em;
    }

    @Override
    public RentBook save(RentBook rentBook) {
        em.persist(rentBook);
        return rentBook;
    }

    @Override
    public RentBook findById(Long id) {
        RentBook rentBook = em.find(RentBook.class, id);
        return rentBook;
    }

    @Override
    public Optional<RentBook> findByUserId(String userId) {
        List<RentBook> result = em.createQuery("select m from member m where m.userId = :userId", RentBook.class)
                .setParameter("userId", userId)
                .getResultList();
        return result.stream().findAny();
    }

    @Override
    public List<RentBook> findAll() {
        return em.createQuery("select m from rentbook m", RentBook.class)
                .getResultList();
    }

    @Override
    public Optional<RentBook> deleteOne(RentBook rentBook) {
        return Optional.empty();
    }
}
