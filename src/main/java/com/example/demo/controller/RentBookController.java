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
    //Post 로 변경예정.
    @PostMapping("/info")
    @ResponseBody
    //요청받은 Id 정보를 받아서 findByUserId 에 줄 예정.
    public List<Rent> rentBookInfo(@RequestBody Rent rent) {
        String userId = rent.getUserId();
        List<Rent> rentlist = rentService.findByUserId(userId);
        log.warn(rentlist.toString());
        return rentlist;
    }
}
