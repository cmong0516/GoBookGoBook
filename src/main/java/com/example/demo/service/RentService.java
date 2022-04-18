package com.example.demo.service;

import com.example.demo.object.RentBook;
import com.example.demo.repository.RentBookReposiroty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class RentService {

    private final RentBookReposiroty rentBookReposiroty;

    @Autowired
    public RentService(RentBookReposiroty rentBookReposiroty) {
        this.rentBookReposiroty = rentBookReposiroty;
    }

    public Long join(RentBook rentBook) {
        rentBookReposiroty.save(rentBook);
        return rentBook.getRentId();
    }
}
