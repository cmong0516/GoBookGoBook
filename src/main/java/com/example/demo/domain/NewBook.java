package com.example.demo.domain;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NewBook {
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
