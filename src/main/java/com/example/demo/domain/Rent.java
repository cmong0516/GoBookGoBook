package com.example.demo.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
@Table(name = "rent")
public class Rent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
    private Date rentDate;
}
