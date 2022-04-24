package com.example.demo.domain;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "review")
public class Review {
    @Id
    private Long reviewId;
    private String userId;
    private String title;
    @Column(name = "content",length = 2000)
    private String content;
    private LocalDate pubDate;
    private String isbn;
}
