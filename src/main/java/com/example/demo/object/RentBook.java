package com.example.demo.object;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Date;

@Data
public class RentBook {

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
