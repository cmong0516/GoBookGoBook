package com.example.demo.object;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDate;

@Data
public class RentBook {

    private String title;
    private String description;
    private LocalDate pubDate;
    private String coverSmallUrl;
    private String coverLargeUrl;
    private int categoryId;
    private String categoryName;
    private String publisher;
    private Long customerReviewRank;
    private String author;
    private String translator;
    private String isbn;
    private int rank;
    private boolean state;
}