package com.example.demo.service;

import com.example.demo.domain.User;
import com.example.demo.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
@AllArgsConstructor
@Transactional
public class MailService {

    private JavaMailSender javaMailSender;
    private UserRepository userRepository;

    //인증번호 6자리: 난수 발생
    static Random r = new Random();
    static int intNum = r.nextInt(999999); //6자리 랜덤 난수
    static String num = Integer.toString(intNum);
    //비밀번호 인증: 메일 보내기
    public boolean sendMail(User user){
        String userEmail = user.getUserEmail(); //유저 메일

        //이메일 유효성: 회원이 있는지 확인
        List<User> byEmail = userRepository.findByEmail(userEmail);

        if(!(byEmail.isEmpty())){
//            System.out.println("num = " + num);

            //이메일 정보 설정 및 전송
            try{
               User sender = byEmail.get(0);

                //제목
                String title = "[꼬북꼬북] 비밀번호찾기 인증 메일 입니다.";
                //내용
                String content = "안녕하세요. " + sender.getUserName() + " 회원님\n"
                        + "꼬북꼬북 비밀번호 찾기 인증번호는 " + num + " 입니다.\n\n" + "감사합니다.\n" + "꼬북 팀 드림";

//                int toUserSize = toUserList.size();
                SimpleMailMessage simpleMessage = new SimpleMailMessage(); //smtp 사용

                //받는사람
                simpleMessage.setTo(userEmail);
                //메일 제목
                simpleMessage.setSubject(title);
                //메일 내용
                simpleMessage.setText(content);
                //메일 발송
                javaMailSender.send(simpleMessage);

            }catch (Exception e){
                System.out.println(e.getMessage());
            }

            return true; //전송 성공
        }else{
            return false; //전송 실패
        }
    }

    //인증번호 처리 후 비번 보내기
    public String checkCode(String code, String userEmail){

//        System.out.println(num); //인증번호 귀찮으면 쓰세요

        //입력한 인증번호 == 메일로 전송된 인증번호
        if(code.equals(num)){

            List<User> byEmail = userRepository.findByEmail(userEmail);
            User user = byEmail.get(0);

            //비밀번호 암호화
            String password = passwordEncoding("gobook777!");
            user.setUserPw(password);

            userRepository.save(user);

            return "gobook777!";
        }else{
            return "인증번호 불일치";
        }

    }

    //암호화 함수
    public String passwordEncoding(String password){
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        return passwordEncoder.encode(password);
    }
}
