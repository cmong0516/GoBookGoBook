package com.example.demo.controller;

import com.example.demo.object.RentBook;
import com.example.demo.service.RentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Slf4j
@Controller
@RequestMapping( "/rent")
public class RentBookController {
    private final RentService rentService;

    public RentBookController(RentService rentService) {
        this.rentService = rentService;
    }

    @PostMapping("/add")
    @ResponseBody
    public RentBook rentBookAdd(RentBook rentBook) {
        log.warn(rentBook.toString());

//        rentService.insertRent(rentBook);
        return rentBook;
    }

    @GetMapping("/info")
    @ResponseBody
    public RentBook rentBookInfo() {
        RentBook rentBook = new RentBook();
        rentBook.setTitle("테스트 타이틀");
        rentBook.setAuthor("테스트 작가");
        rentBook.setDescription("테스트 디스크립션");
        return rentBook;
    }
}
