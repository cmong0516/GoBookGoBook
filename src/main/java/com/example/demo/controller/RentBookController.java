package com.example.demo.controller;

import com.example.demo.domain.Rent;
import com.example.demo.object.RentBook;
import com.example.demo.service.RentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public RentBook rentBookAdd(@RequestBody RentBook rentBook) {
        rentService.insertRent(rentBook);
        return rentBook;
    }

    @PostMapping("/info")
    @ResponseBody
    public List<Rent> rentBookInfo(@RequestBody Rent rent) {
        String userId = rent.getUserId();
        System.out.println("userId1 = " + userId);
        List<Rent> rentlist = rentService.findByUserId(userId);
        log.warn("뭐지{}",rentlist.toString());
        return rentlist;
    }
}
