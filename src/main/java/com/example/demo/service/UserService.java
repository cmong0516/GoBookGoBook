package com.example.demo.service;

import com.example.demo.domain.User;
import com.example.demo.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.util.List;

@Service
@AllArgsConstructor
public class UserService {

    private UserRepository userRepository;

    @Transactional
    @PostConstruct
    public void init(){
        User user = new User();
        user.setUserId("admin0");
        user.setUserPw(passwordEncoding("sorkrhksflwkek0!"));
        user.setUserEmail("admin0@gmail.com");
        user.setUserName("관리자");
        user.setEnabled(true);

        User user1 = new User();
        user1.setUserId("cmong0516");
        user1.setUserPw(passwordEncoding("cmong111!"));
        user1.setUserEmail("cmong0516@gmail.com");
        user1.setUserName("김창모");
        user1.setEnabled(true);

        User user2 = new User();
        user2.setUserId("wndo222");
        user2.setUserPw(passwordEncoding("rnwndo222!"));
        user2.setUserEmail("jool0129@gmail.com");
        user2.setUserName("구주애");
        user2.setEnabled(true);

        User user3 = new User();
        user3.setUserId("godus333");
        user3.setUserPw(passwordEncoding("godus333!"));
        user3.setUserEmail("godus333!@gmail.com");
        user3.setUserName("김혜연");
        user3.setEnabled(true);

        User user4 = new User();
        user4.setUserId("dnjstjr444");
        user4.setUserPw(passwordEncoding("dnjstjr444!"));
        user4.setUserEmail("wsji9409@gmail.com");
        user4.setUserName("지원석");
        user4.setEnabled(true);
//        System.out.println("user = " + user);
        if(userRepository.findById("admin0").isEmpty()){
            userRepository.save(user);
        }

        if(userRepository.findById("cmong0516").isEmpty()){
            userRepository.save(user1);
        }

        if(userRepository.findById("wndo222").isEmpty()){
            userRepository.save(user2);
        }

        if(userRepository.findById("godus333").isEmpty()){
            userRepository.save(user3);
        }

        if(userRepository.findById("dnjstjr444").isEmpty()){
            userRepository.save(user4);
        }
    }

    //회원가입
    @Transactional //변경되는 값이라?
    public boolean joinUser(User user){
        /*System.out.println("memberForm = " + user.getUserId());
        System.out.println("memberForm = " + user.getUserPw());
        System.out.println("memberForm = " + user.getUserName());
        System.out.println("memberForm = " + user.getUserEmail());*/

        //아이디로 유효성 검사
        List<User> findId = userRepository.findById(user.getUserId());

        if(!findId.isEmpty()){  //이메일이 존재하면(비어있지 않으면)
            return false;
//            throw new IllegalArgumentException("이미 존재하는 회원입니다.");
            //throw new GeneralSecurityException();
        }

        User user1 = new User();
        String passwordEncoding = passwordEncoding(user.getUserPw());
        user1.setUserPw(passwordEncoding); //암호화
        user1.setUserId(user.getUserId());
        user1.setUserName(user.getUserName());
        user1.setUserEmail(user.getUserEmail());
        userRepository.save(user1);

        return true;
    }

    //login
    public User loginUser(User user) {
        System.out.println("user.getUserId() = " + user.getUserId());

        //유효성 검사
        List<User> byId = userRepository.findById(user.getUserId());
        //찾는 아이디가 없으면 null
        if (byId.isEmpty()){
            System.out.println("비었다");
            return null;
        }
        User loginUser = byId.get(0);//잘 찾음.

        System.out.println("loginUser = " + loginUser);

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

    //회원 수정
    @Transactional
    public User updateUser(User user){
        List<User> userList = userRepository.findById(user.getUserId());

        if(userList.isEmpty()){ //유효성 X
            return null;
        }


        User user1 = userList.get(0);
//        System.out.println("userId로 찾아온 user 정보 = " + user1);

        //정보 변경 개수 나누기
        if(user.getUserPw() == null){ //email만 변경하면
            user1.setUserEmail(user.getUserEmail());
        }else if(user.getUserEmail() == null){ //password만 변경하면
            user1.setUserPw(passwordEncoding(user.getUserPw()));
        }else{ //둘다 변경하면
            user1.setUserEmail(user.getUserEmail());
            user1.setUserPw(passwordEncoding(user.getUserPw()));
        }

        userRepository.save(user1); //저장

//        System.out.println("수정 후 user1 = " + user1);

        return user1;
    }

    //회원 삭제
    @Transactional
    public boolean deleteUser(String id){
//        System.out.println("id = " + id);
        List<User> byId = userRepository.findById(id);
        System.out.println("byId = " + byId);

        if(byId.isEmpty()){
            System.out.println("찾을 수 없음");
            return false;
        }

        User user1 = byId.get(0);
        System.out.println("user1 = " + user1);

        userRepository.delete(user1); //key로 삭제하는게 안전

        return true;
    }

    //조회
    public List<User> findAll(){
        List<User> all = userRepository.findAll();
        return all;
    }

    //아이디찾기: 아이디, 이름 유효성
    public String findId(User user){
        String userEmail = user.getUserEmail();
        String userName = user.getUserName();
        List<User> byId = userRepository.findByEmail(userEmail); //아이디로 꺼내오기

        if(byId.isEmpty()){
            return "유효하지 않은 이메일입니다.";
        }

        User user1 = byId.get(0);

//        System.out.println("userEmail = " + userEmail);

        if(!(user1.getUserName().equals(userName))){
            return "회원을 찾을 수 없습니다.";
        }

        return user1.getUserId();
    }

    //암호화 함수
    public String passwordEncoding(String password){
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        return passwordEncoder.encode(password);
    }
}
