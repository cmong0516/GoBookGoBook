//package com.example.demo.service;
//
//import com.example.demo.domain.Review;
//import com.example.demo.repository.ReviewRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//@Transactional
//@RequiredArgsConstructor
//@Service
//public class ReviewService {
//    private final ReviewRepository reviewRepository;
//
//    public Review addReivew(Review review) {
//        reviewRepository.save(review);
//        return review;
//    }
//
//    public Review findByUser(Review review) {
//        reviewRepository.findByUser(review.getUserId());
//        return review;
//    }
//
//    public Review findByReviewId(Review review) {
//        reviewRepository.findByReviewId(review.getReviewId());
//        return review;
//    }
//}
