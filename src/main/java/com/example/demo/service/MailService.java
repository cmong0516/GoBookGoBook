package com.example.demo.service;

import com.example.demo.domain.User;
import com.example.demo.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Random;

@Service
@AllArgsConstructor
@Transactional
public class MailService {

    private JavaMailSender javaMailSender;
    private UserRepository userRepository;


    //비밀번호 인증: 메일 보내기
    public String sendMail(User user){
        String userEmail = user.getUserEmail(); //유저 메일

        //인증번호 6자리: 난수 발생
        Random r = new Random();
        int intNum = r.nextInt(999999); //6자리 랜덤 난수
        String num = Integer.toString(intNum);
//        System.out.println("num = " + num);

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

            return num; //전송 성공
        }else{
            return null; //전송 실패
        }
    }

    //인증번호 처리 후 비번 보내기
    public String checkCode(String userEmail){


        List<User> byEmail = userRepository.findByEmail(userEmail);
        User user = byEmail.get(0);

        //비밀번호 암호화
        String password = passwordEncoding("gobook777!");
        user.setUserPw(password);

        userRepository.save(user);

        return "gobook777!";
    }

    //암호화 함수
    public String passwordEncoding(String password){
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        return passwordEncoder.encode(password);
    }
}
