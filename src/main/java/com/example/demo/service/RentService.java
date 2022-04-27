package com.example.demo.service;

import com.example.demo.domain.Rent;
import com.example.demo.domain.User;
import com.example.demo.object.RentBook;
import com.example.demo.repository.RentRepository;
import com.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Transactional
@RequiredArgsConstructor
@Service
public class RentService {
    private final RentRepository rentRepository;
    private  final UserRepository userRepository;

    public Rent insertRent(RentBook rentBook) {
        Rent rent = new Rent();
//        User user = new User();
        LocalDate now = LocalDate.now();

        String userId = rentBook.getUserId();
        List<User> byId = userRepository.findById(userId);
        User user = byId.get(0);

        rent.setUserId(rentBook.getUserId());
        rent.setUser(user);
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
        rentRepository.save(rent);
        return rent;
    }
    public List<Rent> findByUserId(String userId) {
        return rentRepository.findAllByUserId(userId);
    }

    public boolean findByIsbn(Rent rent){
        String isbn = rent.getIsbn();

        List<Rent> byIsbn = rentRepository.findByIsbn(isbn);
        if(byIsbn.isEmpty()){
            return false;
        }
//        System.out.println("byIsbn = " + byIsbn);

        return true;
    }

    public List<Rent> findAll() {
        return rentRepository.findAll();
    }

    public Rent returnBook(Long rentId) {
        return rentRepository.returnBook(rentId);
    }

    public boolean deleteRent(String userId) {
        return rentRepository.deleteRent(userId);
    }
}
