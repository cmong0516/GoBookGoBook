package com.example.demo;

import org.springframework.web.bind.annotation.*;

@RestController
public class HelloWorldController {

    @PostMapping("/home")
    public String home(@RequestParam("movieTitle") String movieTitle) {
        System.out.println("movieTitle = " + movieTitle);
        System.out.println("잠시 빌릴게요...");
        return movieTitle;
    }
}