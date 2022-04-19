package com.example.demo.object;

import lombok.Data;
import java.util.Date;

@Data
public class RentBook {

    private Long rentId;
    private String author;
    private String categoryName;
    private String coverLargeUrl;
    private String coverSmallUrl;
    private int customerReviewRank;
    private String description;
    private String isbn;
    private Double itemId;
    private Date pubDate;
    private String publisher;
    private int rank;
    private String title;
}