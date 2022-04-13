package com.example.demo.controller;

import com.example.demo.domain.RentBook;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class RentBookController {

    @PostMapping("/rent")
    public RentBook rentBook(RentBook rentBook) {

        return rentBook;
    }
}
