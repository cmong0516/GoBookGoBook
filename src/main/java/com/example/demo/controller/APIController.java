package com.example.demo.controller;

import com.example.demo.domain.BestSeller;
import com.example.demo.domain.NewBook;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;

@RestController
@RequestMapping("/api")
public class APIController {
    private final String bestUrl = "http://book.interpark.com/api/bestSeller.api?key=84307E117F37CDE1C3265CDC603058B7E3EAB77A1F3708DEDB8D52E951E3224F&categoryId=100&output=json";
    private String newUrl = "http://book.interpark.com/api/newBook.api?key=84307E117F37CDE1C3265CDC603058B7E3EAB77A1F3708DEDB8D52E951E3224F&categoryId=103&output=json";

    @GetMapping("/bestseller")
    public ArrayList<BestSeller> bestSellers() {

        String result = WebClient.create(bestUrl)
                .get()
                .retrieve()
                .bodyToMono(String.class)
                .block();
        JSONObject jsonObject = new JSONObject(result);
        JSONArray test1 = jsonObject.getJSONArray("item");

        ArrayList<BestSeller> bestSellers = new ArrayList<>();


        for (int i = 0; i < test1.length(); i++) {
            BestSeller bestSeller = new BestSeller();
            JSONObject obj = test1.getJSONObject(i);
            bestSeller.setItemId((long) obj.getInt("itemId"));
            bestSeller.setTitle(obj.getString("title"));
            bestSeller.setDescription(obj.getString("description"));
            bestSeller.setPubDate(obj.getString("pubDate"));
            bestSeller.setCoverSmallUrl(obj.getString("coverSmallUrl"));
            bestSeller.setCoverLargeUrl(obj.getString("coverLargeUrl"));
            bestSeller.setCategoryId(obj.getInt("categoryId"));
            bestSeller.setCategoryName(obj.getString("categoryName"));
            bestSeller.setPublisher(obj.getString("publisher"));
            bestSeller.setCustomerReviewRank(obj.getLong("customerReviewRank"));
            bestSeller.setAuthor(obj.getString("author"));
            bestSeller.setTranslator(obj.getString("translator"));
            bestSeller.setIsbn(obj.getLong("isbn"));
            bestSeller.setRank(obj.getInt("rank"));
            bestSellers.add(bestSeller);
        }
        return bestSellers;
    }
    @GetMapping("/newbook")

    public ArrayList<NewBook> newBooks() {

        String result = WebClient.create(newUrl)
                .get()
                .retrieve()
                .bodyToMono(String.class)
                .block();
        JSONObject jsonObject = new JSONObject(result);
        JSONArray test1 = jsonObject.getJSONArray("item");
        ;

        ArrayList<NewBook> newBooks = new ArrayList<>();

        for (int i = 0; i < test1.length(); i++) {

            JSONObject obj = test1.getJSONObject(i);
            NewBook newBook = new NewBook();
            newBook.setItemId((long) obj.getInt("itemId"));
            newBook.setTitle(obj.getString("title"));
            newBook.setDescription(obj.getString("description"));
            newBook.setPubDate(obj.getString("pubDate"));
            newBook.setCoverSmallUrl(obj.getString("coverSmallUrl"));
            newBook.setCoverLargeUrl(obj.getString("coverLargeUrl"));
            newBook.setCategoryId(obj.getInt("categoryId"));
            newBook.setCategoryName(obj.getString("categoryName"));
            newBook.setPublisher(obj.getString("publisher"));
            newBook.setCustomerReviewRank(obj.getLong("customerReviewRank"));
            newBook.setAuthor(obj.getString("author"));
            newBook.setTranslator(obj.getString("translator"));
            newBook.setIsbn(obj.getLong("isbn"));
            newBooks.add(newBook);
        }
        return newBooks;
    }

    //국내도서 소설
    @GetMapping("/newbook/101")
    public ArrayList<NewBook> newBooks101() {
        newUrl = "http://book.interpark.com/api/newBook.api?key=84307E117F37CDE1C3265CDC603058B7E3EAB77A1F3708DEDB8D52E951E3224F&categoryId=101&output=json";
        String result = WebClient.create(newUrl)
                .get()
                .retrieve()
                .bodyToMono(String.class)
                .block();
        JSONObject jsonObject = new JSONObject(result);
        JSONArray test1 = jsonObject.getJSONArray("item");
        ;

        ArrayList<NewBook> newBooks = new ArrayList<>();

        for (int i = 0; i < test1.length(); i++) {

            JSONObject obj = test1.getJSONObject(i);
            NewBook newBook = new NewBook();
            newBook.setItemId((long) obj.getInt("itemId"));
            newBook.setTitle(obj.getString("title"));
            newBook.setDescription(obj.getString("description"));
            newBook.setPubDate(obj.getString("pubDate"));
            newBook.setCoverSmallUrl(obj.getString("coverSmallUrl"));
            newBook.setCoverLargeUrl(obj.getString("coverLargeUrl"));
            newBook.setCategoryId(obj.getInt("categoryId"));
            newBook.setCategoryName(obj.getString("categoryName"));
            newBook.setPublisher(obj.getString("publisher"));
            newBook.setCustomerReviewRank(obj.getLong("customerReviewRank"));
            newBook.setAuthor(obj.getString("author"));
            newBook.setTranslator(obj.getString("translator"));
            newBook.setIsbn(obj.getLong("isbn"));
            newBooks.add(newBook);
        }
        return newBooks;
    }

    //국내도서 시/에세이
    @GetMapping("/newbook/102")
    public ArrayList<NewBook> newBooks102() {
        newUrl = "http://book.interpark.com/api/newBook.api?key=84307E117F37CDE1C3265CDC603058B7E3EAB77A1F3708DEDB8D52E951E3224F&categoryId=102&output=json";
        String result = WebClient.create(newUrl)
                .get()
                .retrieve()
                .bodyToMono(String.class)
                .block();
        JSONObject jsonObject = new JSONObject(result);
        JSONArray test1 = jsonObject.getJSONArray("item");
        ;

        ArrayList<NewBook> newBooks = new ArrayList<>();

        for (int i = 0; i < test1.length(); i++) {

            JSONObject obj = test1.getJSONObject(i);
            NewBook newBook = new NewBook();
            newBook.setItemId((long) obj.getInt("itemId"));
            newBook.setTitle(obj.getString("title"));
            newBook.setDescription(obj.getString("description"));
            newBook.setPubDate(obj.getString("pubDate"));
            newBook.setCoverSmallUrl(obj.getString("coverSmallUrl"));
            newBook.setCoverLargeUrl(obj.getString("coverLargeUrl"));
            newBook.setCategoryId(obj.getInt("categoryId"));
            newBook.setCategoryName(obj.getString("categoryName"));
            newBook.setPublisher(obj.getString("publisher"));
            newBook.setCustomerReviewRank(obj.getLong("customerReviewRank"));
            newBook.setAuthor(obj.getString("author"));
            newBook.setTranslator(obj.getString("translator"));
            newBook.setIsbn(obj.getLong("isbn"));
            newBooks.add(newBook);
        }
        return newBooks;
    }
    //국내도서 예술.대중문화
    @GetMapping("/newbook/103")
    public ArrayList<NewBook> newBooks103() {
        newUrl = "http://book.interpark.com/api/newBook.api?key=84307E117F37CDE1C3265CDC603058B7E3EAB77A1F3708DEDB8D52E951E3224F&categoryId=103&output=json";
        String result = WebClient.create(newUrl)
                .get()
                .retrieve()
                .bodyToMono(String.class)
                .block();
        JSONObject jsonObject = new JSONObject(result);
        JSONArray test1 = jsonObject.getJSONArray("item");
        ;

        ArrayList<NewBook> newBooks = new ArrayList<>();

        for (int i = 0; i < test1.length(); i++) {

            JSONObject obj = test1.getJSONObject(i);
            NewBook newBook = new NewBook();
            newBook.setItemId((long) obj.getInt("itemId"));
            newBook.setTitle(obj.getString("title"));
            newBook.setDescription(obj.getString("description"));
            newBook.setPubDate(obj.getString("pubDate"));
            newBook.setCoverSmallUrl(obj.getString("coverSmallUrl"));
            newBook.setCoverLargeUrl(obj.getString("coverLargeUrl"));
            newBook.setCategoryId(obj.getInt("categoryId"));
            newBook.setCategoryName(obj.getString("categoryName"));
            newBook.setPublisher(obj.getString("publisher"));
            newBook.setCustomerReviewRank(obj.getLong("customerReviewRank"));
            newBook.setAuthor(obj.getString("author"));
            newBook.setTranslator(obj.getString("translator"));
            newBook.setIsbn(obj.getLong("isbn"));
            newBooks.add(newBook);
        }
        return newBooks;
    }
    //아동도서
    @GetMapping("/newbook/110")
    public ArrayList<NewBook> newBooks110() {
        newUrl = "http://book.interpark.com/api/newBook.api?key=84307E117F37CDE1C3265CDC603058B7E3EAB77A1F3708DEDB8D52E951E3224F&categoryId=110&output=json";
        String result = WebClient.create(newUrl)
                .get()
                .retrieve()
                .bodyToMono(String.class)
                .block();
        JSONObject jsonObject = new JSONObject(result);
        JSONArray test1 = jsonObject.getJSONArray("item");
        ;

        ArrayList<NewBook> newBooks = new ArrayList<>();

        for (int i = 0; i < test1.length(); i++) {

            JSONObject obj = test1.getJSONObject(i);
            NewBook newBook = new NewBook();
            newBook.setItemId((long) obj.getInt("itemId"));
            newBook.setTitle(obj.getString("title"));
            newBook.setDescription(obj.getString("description"));
            newBook.setPubDate(obj.getString("pubDate"));
            newBook.setCoverSmallUrl(obj.getString("coverSmallUrl"));
            newBook.setCoverLargeUrl(obj.getString("coverLargeUrl"));
            newBook.setCategoryId(obj.getInt("categoryId"));
            newBook.setCategoryName(obj.getString("categoryName"));
            newBook.setPublisher(obj.getString("publisher"));
            newBook.setCustomerReviewRank(obj.getLong("customerReviewRank"));
            newBook.setAuthor(obj.getString("author"));
            newBook.setTranslator(obj.getString("translator"));
            newBook.setIsbn(obj.getLong("isbn"));
            newBooks.add(newBook);
        }
        return newBooks;
    }

    //경제 경영
    @GetMapping("/newbook/117")
    public ArrayList<NewBook> newBooks117() {
        newUrl = "http://book.interpark.com/api/newBook.api?key=84307E117F37CDE1C3265CDC603058B7E3EAB77A1F3708DEDB8D52E951E3224F&categoryId=117&output=json";
        String result = WebClient.create(newUrl)
                .get()
                .retrieve()
                .bodyToMono(String.class)
                .block();
        JSONObject jsonObject = new JSONObject(result);
        JSONArray test1 = jsonObject.getJSONArray("item");
        ;

        ArrayList<NewBook> newBooks = new ArrayList<>();

        for (int i = 0; i < test1.length(); i++) {

            JSONObject obj = test1.getJSONObject(i);
            NewBook newBook = new NewBook();
            newBook.setItemId((long) obj.getInt("itemId"));
            newBook.setTitle(obj.getString("title"));
            newBook.setDescription(obj.getString("description"));
            newBook.setPubDate(obj.getString("pubDate"));
            newBook.setCoverSmallUrl(obj.getString("coverSmallUrl"));
            newBook.setCoverLargeUrl(obj.getString("coverLargeUrl"));
            newBook.setCategoryId(obj.getInt("categoryId"));
            newBook.setCategoryName(obj.getString("categoryName"));
            newBook.setPublisher(obj.getString("publisher"));
            newBook.setCustomerReviewRank(obj.getLong("customerReviewRank"));
            newBook.setAuthor(obj.getString("author"));
            newBook.setTranslator(obj.getString("translator"));
            newBook.setIsbn(obj.getLong("isbn"));
            newBooks.add(newBook);
        }
        return newBooks;
    }

    //자기개발
    @GetMapping("/newbook/118")
    public ArrayList<NewBook> newBooks118() {
        newUrl = "http://book.interpark.com/api/newBook.api?key=84307E117F37CDE1C3265CDC603058B7E3EAB77A1F3708DEDB8D52E951E3224F&categoryId=118&output=json";
        String result = WebClient.create(newUrl)
                .get()
                .retrieve()
                .bodyToMono(String.class)
                .block();
        JSONObject jsonObject = new JSONObject(result);
        JSONArray test1 = jsonObject.getJSONArray("item");
        ;

        ArrayList<NewBook> newBooks = new ArrayList<>();

        for (int i = 0; i < test1.length(); i++) {

            JSONObject obj = test1.getJSONObject(i);
            NewBook newBook = new NewBook();
            newBook.setItemId((long) obj.getInt("itemId"));
            newBook.setTitle(obj.getString("title"));
            newBook.setDescription(obj.getString("description"));
            newBook.setPubDate(obj.getString("pubDate"));
            newBook.setCoverSmallUrl(obj.getString("coverSmallUrl"));
            newBook.setCoverLargeUrl(obj.getString("coverLargeUrl"));
            newBook.setCategoryId(obj.getInt("categoryId"));
            newBook.setCategoryName(obj.getString("categoryName"));
            newBook.setPublisher(obj.getString("publisher"));
            newBook.setCustomerReviewRank(obj.getLong("customerReviewRank"));
            newBook.setAuthor(obj.getString("author"));
            newBook.setTranslator(obj.getString("translator"));
            newBook.setIsbn(obj.getLong("isbn"));
            newBooks.add(newBook);
        }
        return newBooks;
    }
}