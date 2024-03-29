package com.example.demo.domain;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;

@Data
@Entity(name = "Review")
@Table(name = "review")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_id")
    private Long reviewId;
    private String userId;
    private String title;
    @Column(name = "content",length = 2000)
    private String content;
    private LocalDate pubDate;
    private String isbn;

    @ManyToOne
    @JoinColumn(name="id")
    private User user;
}
