package com.example.demo.repository;

import com.example.demo.domain.Review;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
public class ReviewRepositoryImpl implements ReviewRepository{

    private final EntityManager em;

    public ReviewRepositoryImpl(EntityManager em) {
        this.em = em;
    }

    @Override
    public Review save(Review review) {
        em.persist(review);
        return review;
    }

    @Override
    public List<Review> findByIsbn(String isbn) {
        return em.createQuery("select r from Review r where r.isbn = :isbn", Review.class)
                .setParameter("isbn", isbn)
                .getResultList();
    }

    @Override
    public List<Review> findByUser(String userId) {
        return em.createQuery("select r from Review r where r.userId = :userId", Review.class)
                .setParameter("userId", userId)
                .getResultList();
    }

    @Override
    public List<Review> findByReviewId(Long reviewId) {
        return em.createQuery("select r from Review r where r.reviewId = :reviewId", Review.class)
                .setParameter("reviewId", reviewId)
                .getResultList();
    }


    @Override
    public void deleteByReviewId(Long reviewId) {
        List<Review> byReviewId = findByReviewId(reviewId);
        em.remove(byReviewId);
    }
}
