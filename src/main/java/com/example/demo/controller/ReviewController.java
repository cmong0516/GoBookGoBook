package com.example.demo.controller;

import com.example.demo.domain.Review;
import com.example.demo.service.ReviewService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/review")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping("/add")
    public Review addReview(@RequestBody Review review) {
        reviewService.addReivew(review);
        return review;
    }

    @PostMapping("/infobyuser")
    public List<Review> findReivewByUser(@RequestBody Review review) {
        return reviewService.findByUser(review);
    }

    @PostMapping("/infobyid")
    public Review findReivewById(@RequestBody Review review) {
        reviewService.findByReviewId(review);
        return review;
    }

    @PostMapping("/findbybook")
    public List<Review> findByIsbn(@RequestBody Review review) {
        return reviewService.findByIsbn(review);
    }

    @PostMapping("/delete")
    public boolean deleteReview(@RequestBody Review review) {
        reviewService.deleteReview(review);
        return true;
    }

}
