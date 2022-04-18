package com.example.demo.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity(name = "rentbook")
public class RentbookEntity {
    @Id
    private Long rentId;
    private String title;
    private String description;
    private String pubDate;
    private String coverSmallUrl;
    private String coverLargeUrl;
    private int categoryId;
    private String categoryName;
    private String publisher;
    private Long customerReviewRank;
    private String author;
    private String translator;
    private Long isbn;
    private int rank;
    private boolean state;
}
