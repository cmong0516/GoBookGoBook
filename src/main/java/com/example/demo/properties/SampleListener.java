package com.example.demo.properties;

import com.example.demo.domain.User;
import com.example.demo.repository.UserRepository;
import org.springframework.boot.context.event.ApplicationStartedEvent;
import org.springframework.context.ApplicationListener;

public class SampleListener implements ApplicationListener<ApplicationStartedEvent> {

    UserRepository userRepository;

    @Override
    public void onApplicationEvent(ApplicationStartedEvent event) {
        User user = new User("admin0","admin0!","관리자","admin0@gmail.com",true);
//        System.out.println("user = " + user);
//        userRepository.save(user);
    }
}
