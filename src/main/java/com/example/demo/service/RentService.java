package com.example.demo.service;

import com.example.demo.domain.Rent;
import com.example.demo.object.RentBook;
import com.example.demo.repository.RentReposiroty;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class RentService {
    private final RentReposiroty rentReposiroty;

    public Rent insertRent(RentBook rentBook) {
        Rent rent = new Rent();
        rent.setTitle("대여테스트");
        rent.setAuthor("김창모");
        rent.setDescription("대여테스트 중입니다.");

        rentReposiroty.save(rent);
        return rent;
    }
}
