package com.example.demo.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Slf4j
@RestController
@RequestMapping("/kakao")
@RequiredArgsConstructor
public class KakaoSearchController {

    //검색기능
    //http://localhost:8080/kakao/search?query=책제목
    @GetMapping("/search")
    public String search(@RequestParam String query, @RequestParam Integer page){
        Mono<String> stringMono = WebClient.builder().baseUrl("https://dapi.kakao.com") //호스트
                .build().get()
                .uri(builder -> builder.path("/v3/search/book") //호스트 뒤에 api주소를 붙인다.
                        //우선 필수 파라미터만 넣겠다.
                        .queryParam("query", query)
                        .queryParam("page",page)
                        .build()
                )
                .header("Authorization", "KakaoAK ${key}") //원래 키는 프로퍼티에서 꺼내오도록 하자
                .exchangeToMono(resp -> {
                    return resp.bodyToMono(String.class);
                });

        return stringMono.block();
    }

}
