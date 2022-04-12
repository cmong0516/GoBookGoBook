package com.example.demo;

import com.example.demo.domain.BestSeller;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;

@RestController
public class HelloWorldController {
    private final String Url = "http://book.interpark.com/api/bestSeller.api?key=84307E117F37CDE1C3265CDC603058B7E3EAB77A1F3708DEDB8D52E951E3224F&categoryId=100&output=json";

    @GetMapping("/home")
    public ArrayList<BestSeller> home() {

        String result = WebClient.create(Url)
                .get()
                .retrieve()
                .bodyToMono(String.class)
                .block();
        JSONObject jsonObject = new JSONObject(result);
        JSONArray test1 = jsonObject.getJSONArray("item");
        ;

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

    @PostMapping("/home")
    public String home(@RequestParam("movieTitle") String movieTitle) {
        System.out.println("movieTitle = " + movieTitle);
        System.out.println("잠시 빌릴게요...");
        return movieTitle;
    }
}