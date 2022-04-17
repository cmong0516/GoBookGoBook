package com.example.demo.controller;

import com.example.demo.domain.RentBook;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/rent")
public class RentBookController {

    @PostMapping("/add")
    public RentBook rentBookAdd(RentBook rentBook) {
        rentBook.setTitle("테스트 타이틀");
        rentBook.setAuthor("테스트 작가");
        rentBook.setDescription("테스트 디스크립션");
        return rentBook;
    }

    @GetMapping("/info")
    public RentBook rentBookInfo() {
        RentBook rentBook = new RentBook();
        rentBook.setTitle("테스트 타이틀");
        rentBook.setAuthor("테스트 작가");
        rentBook.setDescription("테스트 디스크립션");
        return rentBook;
    }
}
