package com.example.demo.service;

import com.example.demo.domain.Rent;
import com.example.demo.object.RentBook;
import com.example.demo.repository.RentReposiroty;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Transactional
@RequiredArgsConstructor
@Service
public class RentService {
    private final RentReposiroty rentReposiroty;

    public Rent insertRent(RentBook rentBook) {
        Rent rent = new Rent();
        LocalDate now = LocalDate.now();
        rent.setUserId(rentBook.getUserId());
        rent.setAuthor(rentBook.getAuthor());
        rent.setCategoryName(rentBook.getCategoryName());
        rent.setCoverLargeUrl(rentBook.getCoverLargeUrl());
        rent.setCoverSmallUrl(rentBook.getCoverSmallUrl());
        rent.setDescription(rentBook.getDescription());
        rent.setIsbn(rentBook.getIsbn());
        rent.setPubDate(rentBook.getPubDate());
        rent.setPublisher(rentBook.getPublisher());
        rent.setRank(rentBook.getRank());
        rent.setTitle(rentBook.getTitle());
        rent.setState(true);
        rent.setCustomerReviewRank(rentBook.getCustomerReviewRank());
        rent.setRentDate(now);
        rentReposiroty.save(rent);

        return rent;
    }
    public List<Rent> findByUserId(String userId) {
        return rentReposiroty.findAllByUserId(userId);
    }
}
