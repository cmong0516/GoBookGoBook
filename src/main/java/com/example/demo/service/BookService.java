package com.example.demo.service;

import com.example.demo.object.SearchBook;
import com.example.demo.properties.ApiKeyProperties;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.ArrayList;

@Service
public class BookService {

    private final ApiKeyProperties properties;

    public BookService(ApiKeyProperties properties) {
        this.properties = properties;
    }

    public ArrayList<SearchBook> search(String query) throws JSONException {
        Mono<String> stringMono = WebClient.builder().baseUrl("https://dapi.kakao.com") //호스트
                .build().get()
                .uri(builder -> builder.path("/v3/search/book") //호스트 뒤에 api주소를 붙인다.
                                //우선 필수 파라미터만 넣겠다.
                                .queryParam("query", query)
//                        .queryParam("page",page)
                                .build()
                )
                .header("Authorization", "KakaoAK "+properties.getKakaoRestApi()) //원래 키는 프로퍼티에서 꺼내오도록 하자
                .exchangeToMono(resp -> {
                    return resp.bodyToMono(String.class);
                });

        String block = stringMono.block(); //정보 들어있음

        JSONObject jsonObject = new JSONObject(block);

        JSONArray documents = jsonObject.getJSONArray("documents");
        /*System.out.println("documents = " + documents);
        JSONObject jsonArray = documents.getJSONObject(0);
        System.out.println("jsonArray = " + jsonArray.get("authors"));
        JSONArray authors = jsonArray.getJSONArray("authors");
        System.out.println("authors = " + authors.get(0));
        String isbn = (String) jsonArray.get("isbn");
        String data[] = isbn.split(" ");
        System.out.println("isbn = " + data[1]);*/


        ArrayList<SearchBook> searchBooks = new ArrayList<>();
//        System.out.println(documents.getJSONObject(0));

        long seq = 0L;

        for(int i=0;i<documents.length();i++){
            SearchBook searchBook = new SearchBook();
            JSONObject obj = documents.getJSONObject(i);
            searchBook.setItemId(++seq);
            searchBook.setAuthors(String.valueOf(obj.getJSONArray("authors").get(0))); //한명만 넣음
            searchBook.setContents(obj.getString("contents"));
            searchBook.setDateTime(obj.getString("datetime"));

            //isbn 뽑기
            String isbn = (String) obj.get("isbn"); //string으로 뽑기
            String[] split = isbn.split(" "); //공백 기준으로 분리
//            Long s = Long.valueOf(split[1]); //long으로 변환 isbn 알파벳도 있음
            searchBook.setIsbn(split[1]);

            searchBook.setPublisher(obj.getString("publisher"));
            searchBook.setThumbnail(obj.getString("thumbnail"));
            searchBook.setTitle(obj.getString("title"));
            //테스트는 되는데 여기서 안된다..
//            searchBook.setTranslator(obj.getString("translators")); //없는 경우도 많다..

            searchBooks.add(searchBook);
        }

        return searchBooks;
    }
}
