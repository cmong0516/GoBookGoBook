package com.example.demo.object;

import lombok.Data;

@Data
public class BestSeller {
    private Long itemId;
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
}
