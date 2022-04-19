import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./App.css";
import { IsLoginContext } from "./App.js";
import axios from "axios";

function RentButton(props) {
  
    let isLogin = useContext(IsLoginContext);
    let userId = localStorage.getItem('userId');
  
    let history = useHistory();
    let [rentStatus, setRentStatus] = useState("rent");
  
    // 이미 빌린 책인지 체크
    // 버튼을 누르지 않고도 detail페이지에 왔을 때 아래 useEffect가 실행(리렌더링)되어야 한다.
    // 따라서 상위컴포넌트(Detail, Search로부터 props를 받아 리렌더링 되도록...)
    useEffect(() => {
      axios.post( "/rent/info", {userId: userId} )
          .then((res) => {
              // console.log(res.data);
              res.data && res.data.map((mybook, i) => (
                mybook.title == props.book.title
                ? setRentStatus("return")
                : setRentStatus("rent")
              ))
          })
          .catch((error) => {
              alert("도서 데이터를 받아오는 데 실패했습니다.");
              console.log(error);
          });
    }, []);

    let rentFunc = () => {
  
      if(!isLogin) {
        alert('로그인 후 이용할 수 있습니다.');
        return history.push("/login");
      }
  
      // 같은 책 이미 빌린상태면 대여불가로 떠야 하니까 프론트에서 처리
      axios
        .post("/rent/add", {
          author: props.book.author,
          categoryName: props.book.categoryName,
          coverLargeUrl: props.book.coverLargeUrl,
          coverSmallUrl: props.book.coverSmallUrl,
          customerReviewRank: props.book.customerReviewRank,
          description: props.book.description,
          isbn: props.book.isbn,
          pubDate: props.book.pubDate,
          publisher: props.book.publisher,
          rank: props.book.rank,
          title: props.book.title,
          userId: userId
        })
        .then((res) => {
          alert("대여 성공!");
          console.log(res);
        })
        .catch((error) => {
          alert("대여 통신에 실패했습니다.");
          console.log(error);
        });
    };
  
    // 로그인 안되있는 경우 로그인화면으로?
    if (rentStatus == "rent") {
      return (
        <Button variant="success" size="lg" onClick={rentFunc}>
          대여하기
        </Button>
      );
    } else if (rentStatus == "return") {
      return (
        <Button variant="dark" size="lg">
          반납하기
        </Button>
      );
    } else if (rentStatus == "forbidden") {
      return (
        <Button variant="danger" size="lg">
          대여불가
        </Button>
      );
    }
}

export default RentButton;