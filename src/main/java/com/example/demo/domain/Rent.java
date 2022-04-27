package com.example.demo.domain;

import lombok.Data;
import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;

@Entity(name = "Rent")
@Data
@Table(name = "rent")
public class Rent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rent_id")
    private Long rentId;
    @Column(name="user_id")
    private String userId;
    @Column(name = "author")
    private String author;
    @Column(name = "category_name")
    private String categoryName;
    @Column(name = "cover_large_url")
    private String coverLargeUrl;
    @Column(name = "cover_small_url")
    private String coverSmallUrl;
    @Column(name = "customer_review_rank")
    private int customerReviewRank;
    @Column(name = "description",length = 2000)
    private String description;
    @Column(name = "isbn")
    private String isbn;
    @Column(name = "pub_date")
    private Date pubDate;
    @Column(name = "publisher")
    private String publisher;
    @Column(name = "ranking")
    private int rank;
    @Column(name = "title")
    private String title;
    @Column(name = "state")
    private boolean state;
    @Column(name = "rent_date")
    private LocalDate rentDate;

    @ManyToOne
    @JoinColumn(name="id")
    private User user;

    public void setUser(User user){
       this.user = user;
    }
}
