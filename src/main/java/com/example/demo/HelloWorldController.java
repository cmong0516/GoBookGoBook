package com.example.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
public class HelloWorldController {

    @GetMapping("hello")
    public List<String> hello() {
        return Arrays.asList("안녕하세요", "Hello");
    }

    @PostMapping("/home")
    public String home(@RequestParam("movieTitle") String movieTitle) {
        System.out.println("movieTitle = " + movieTitle);
        return movieTitle;
    }
}
