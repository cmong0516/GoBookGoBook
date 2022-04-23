//package com.example.demo.controller;
//
//import com.example.demo.domain.Review;
//import com.example.demo.service.ReviewService;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.ResponseBody;
//
//@Controller
//@RequestMapping("/review")
//public class ReviewController {
//
//    private final ReviewService reviewService;
//
//    public ReviewController(ReviewService reviewService) {
//        this.reviewService = reviewService;
//    }
//
//    @PostMapping("/add")
//    @ResponseBody
//    public Review addReview(@RequestBody Review review) {
//        reviewService.addReivew(review);
//        return review;
//    }
//
//    @PostMapping("/infobyuser")
//    @ResponseBody
//    public Review findReivewByUser(@RequestBody Review review) {
//        reviewService.findByUser(review);
//        return review;
//    }
//
//    @PostMapping("/infobyid")
//    @ResponseBody
//    public Review findReivewById(@RequestBody Review review) {
//        reviewService.findByReviewId(review);
//        return review;
//    }
//}
