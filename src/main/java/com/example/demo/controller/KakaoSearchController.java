package com.example.demo.controller;

import com.example.demo.domain.SearchBook;
import com.example.demo.service.BookService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.ArrayList;

@Slf4j
@RestController
@RequestMapping("/kakao")
@RequiredArgsConstructor
public class KakaoSearchController {

    @Autowired
    private BookService bookService;

    @GetMapping("/search")
    public ArrayList<SearchBook> search(@RequestParam String query) throws JSONException {

        return bookService.search(query);
    }
}

