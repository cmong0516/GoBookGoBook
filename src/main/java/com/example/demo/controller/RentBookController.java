package com.example.demo.controller;

import com.example.demo.domain.RentBook;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class RentBookController {

    @PostMapping("/rent")
    public RentBook rentBook(RentBook rentBook) {
        rentBook.setTitle("테스트 타이틀");
        rentBook.setAuthor("테스트 작가");
        rentBook.setDescription("테스트 디스크립션");
        return rentBook;
    }
}
