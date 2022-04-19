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
    public boolean joinUser(User user){
        System.out.println("memberForm = " + user.getUserId());
        System.out.println("memberForm = " + user.getUserPw());
        System.out.println("memberForm = " + user.getUserName());
        System.out.println("memberForm = " + user.getUserEmail());

        //아이디로 유효성 검사
        List<User> findId = userRepository.findById(user.getUserId());

        if(!findId.isEmpty()){  //이메일이 존재하면(비어있지 않으면)
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

    public User loginUser(User user) {
        System.out.println("user.getUserId() = " + user.getUserId());

        //유효성 검사
        List<User> byId = userRepository.findById(user.getUserId());
        User loginUser = byId.get(0);//잘 찾음.

//        System.out.println("loginUser = " + loginUser);

        //비밀번호 복호화
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();


        //post로 넘어온 데이터 == db에서 찾은 데이터 => 로그인 성공
        if(user.getUserId().equals(loginUser.getUserId()) && encoder.matches(user.getUserPw(),loginUser.getUserPw())){
            System.out.println("찾음 loginUser = " + loginUser);
            return loginUser;
        }


        /*public Member login(String userId, String userPw) {
            return memberRepository.findByUserId(userId)
                    .filter(m -> m.getUserPw().equals(userPw))
                    .orElse(null);
        }*/
        /*  String s1 = byId.stream()
                .filter(s -> s.getUserId().equals(user.getUserId()))
                .findAny()*/

        System.out.println("못찾음");
         return null;
    }
}
