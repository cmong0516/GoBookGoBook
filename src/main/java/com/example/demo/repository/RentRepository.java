package com.example.demo.repository;

import com.example.demo.domain.Rent;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RentRepository{
    Rent save(Rent rent);

    List<Rent> findAllByUserId(String userId);

    Rent findByRentId(Long rentId);

    List<Rent> findByIsbn(String isbn);

    List<Rent> findAll();

    Rent returnBook(Long rentId);

    boolean deleteRent(String userId);
}
