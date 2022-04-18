package com.example.demo.repository;

import com.example.demo.domain.Rent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RentReposiroty extends JpaRepository<Rent,Long> {

}
