package com.example.demo.cofig;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.sql.DataSource;

@Configuration //bean주입
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    private final DataSource DataSource;

    public WebSecurityConfig(DataSource DataSource) {
        this.DataSource = DataSource;
    }

    @Override
    public void configure(WebSecurity web) throws Exception{
        web.ignoring().antMatchers("/**",
                "/**/*.js","/**/*.css","/**/*.json","/**/*.png","/**/*.woff2");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception{
        http
                .authorizeRequests()
                    .antMatchers("/admin/**").hasRole("ADMIN")
                    .antMatchers("/mypage/**").hasRole("MEMBER")
                    .antMatchers("/**").permitAll()   //접근 가능 페이지?
//                    .anyRequest().authenticated()
                    .and()
                .formLogin()
                    .loginPage("/login")
                    .permitAll()
                    .and()
                .logout()
                    .permitAll();
    }

/*
    * Authentication: 로그인
    * Authorization: 권한
    *
*/


    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception{
        auth.jdbcAuthentication()
                .dataSource(DataSource)
                .passwordEncoder(passwordEncoder()) //비밀번호 암호화 관리
                //인증처리
                .usersByUsernameQuery("select user_id, user_pw, enabled "
                        + "from user "
                        + "where user_id = ?")
                //권한처리
                .authoritiesByUsernameQuery("select u.user_id, r.name "
                        + "from user_role ur inner join user u on ur.user_id = u.id "
                        + "inner join role r on ur.role_id = r.id "
                        + "where u.user_id = ?");
    }

    @Bean
    public static PasswordEncoder passwordEncoder(){ //암호화
        return new BCryptPasswordEncoder();
    }
}


