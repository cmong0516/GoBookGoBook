package com.example.demo.service;

import com.example.demo.domain.User;
import com.example.demo.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
public class UserService {

    private UserRepository userRepository;

    @Transactional //변경되는 값이라?
    public boolean joinUser(User user) {
        System.out.println("memberForm = " + user.getUserId());
        System.out.println("memberForm = " + user.getUserPw());
        System.out.println("memberForm = " + user.getUserName());
        System.out.println("memberForm = " + user.getUserEmail());

        //아이디로 유효성 검사
        List<User> findId = userRepository.findById(user.getUserId());

        if (!findId.isEmpty()) {  //이메일이 존재하면(비어있지 않으면)
            return false;
//            throw new IllegalArgumentException("이미 존재하는 회원입니다.");
            //throw new GeneralSecurityException();
        }

        User user1 = new User();
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        user1.setUserPw(passwordEncoder.encode(user.getUserPw())); //암호화
        user1.setUserId(user.getUserId());
        user1.setUserName(user.getUserName());
        user1.setUserEmail(user.getUserEmail());
        userRepository.save(user1);

        return true;
    }
}