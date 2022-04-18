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
    public Long joinUser(User user){
        System.out.println("memberForm = " + user.getUserId());
        System.out.println("memberForm = " + user.getUserPw());
        System.out.println("memberForm = " + user.getUserName());
        System.out.println("memberForm = " + user.getUserEmail());

        //아이디로 유효성 검사
        List<User> findId = userRepository.findById(user.getUserId());

        if(!findId.isEmpty()){  //이메일이 존재하면(비어있지 않으면)
            System.out.println("회원 존재");
            throw new IllegalArgumentException("이미 존재하는 회원입니다.");
        }

        User user1 = new User();
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        user1.setUserPw(passwordEncoder.encode(user.getUserPw())); //암호화
        user1.setUserId(user.getUserId());
        user1.setUserName(user.getUserName());
        user1.setUserEmail(user.getUserEmail());
        userRepository.save(user1);

        return user.getId();
    }

   /* public List<User> validateDuplicateUser(User user){
        List<User> findUser = userRepository.findById(user.getUserId());

        //아이디로 유효성 검사
        if(!findUser.isEmpty()){ //이메일이 있으면(비어있지 않으면)
            System.out.println("회원이 존재해요");
           throw new IllegalArgumentException("이미 존재하는 회원입니다.");
        }
        System.out.println("findUser = " + findUser);

        return findUser;
    }*/
}
