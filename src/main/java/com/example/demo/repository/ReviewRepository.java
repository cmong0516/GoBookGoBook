package com.example.demo.repository;

import com.example.demo.domain.Review;
import com.example.demo.domain.User;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository {
    Review save(Review review);

    List<Review> findByIsbn(String isbn);

    List<Review> findByUser(String userId);

    List<Review> findByReviewId(Long reviewId);

    void deleteByReviewId(Long reviewId);

    void delete(User user);
}
