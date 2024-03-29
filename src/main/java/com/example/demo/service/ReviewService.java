package com.example.demo.service;

import com.example.demo.domain.Review;
import com.example.demo.domain.User;
import com.example.demo.repository.ReviewRepository;
import com.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.List;

@Slf4j
@Transactional
@RequiredArgsConstructor
@Service
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;

    public Review addReivew(Review review) {
        LocalDate now = LocalDate.now();
        review.setPubDate(now);
        String userId = review.getUserId();
        List<User> byId = userRepository.findById(userId);
        User user = byId.get(0);

        review.setUser(user);
        reviewRepository.save(review);
        return review;
    }

    public List<Review> findByUser(Review review) {
        return reviewRepository.findByUser(review.getUserId());
    }

    public Review findByReviewId(Review review) {
        reviewRepository.findByReviewId(review.getReviewId());
        return review;
    }

    public List<Review> findByIsbn(Review review) {
        log.warn(review.getIsbn());
        return reviewRepository.findByIsbn(review.getIsbn());
    }

    public boolean deleteReview(Review review) {
        reviewRepository.deleteByReviewId(review.getReviewId());
        return true;
    }

    public void deleteReview1(String userId) {
        List<User> byId = userRepository.findById(userId);
        User user = byId.get(0);
        reviewRepository.delete(user);
    }
}
