package com.example.demo.object;

import lombok.Data;

@Data
public class SearchBook {

    private Long itemId;    //순서
    private String title;   //책제목
    private String description; //줄거리
    private String coverLargeUrl;//커버사진 url
    private String pubDate; //발행일
    private String publisher; //출판사
    private String author; //작가
    private String isbn;
}