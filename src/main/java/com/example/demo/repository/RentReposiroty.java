package com.example.demo.repository;

import com.example.demo.domain.Rent;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RentReposiroty {
    Rent save(Rent rent);

    List<Rent> findAllByUserId(String userId);

    List<Rent> findAll();

    Rent returnbook(Rent rent);

}
