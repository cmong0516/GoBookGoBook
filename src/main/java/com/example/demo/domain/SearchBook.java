package com.example.demo.domain;

import lombok.Data;

@Data
public class SearchBook {

    private Long itemId;    //순서
    private String title;   //책제목
    private String contents; //줄거리
    private String thumbnail; //커버사진 url
    private String dateTime; //발행일
    private String publisher; //카테고리
    private String authors; //작가
    private String translator; //필요없으면 뺄 예정
    private String isbn;
}