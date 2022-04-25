package com.example.demo.service;

import com.example.demo.domain.Review;
import com.example.demo.repository.ReviewRepository;
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

    public Review addReivew(Review review) {
        LocalDate now = LocalDate.now();
        review.setPubDate(now);
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
}
