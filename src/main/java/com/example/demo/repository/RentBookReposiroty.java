package com.example.demo.repository;

import com.example.demo.object.RentBook;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RentBookReposiroty {
    RentBook save(RentBook rentBook);

    RentBook findById(Long id);

    Optional<RentBook> findByUserId(String userId);

    List<RentBook> findAll();

    Optional<RentBook> deleteOne(RentBook rentBook);
}
