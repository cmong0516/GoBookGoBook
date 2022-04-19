package com.example.demo.object;

import lombok.Data;
import java.util.Date;

@Data
public class RentBook {

    private String userId;
    private String author;
    private String categoryName;
    private String coverLargeUrl;
    private String coverSmallUrl;
    private int customerReviewRank;
    private String description;
    private String isbn;
    private Date pubDate;
    private String publisher;
    private int rank;
    private String title;
}