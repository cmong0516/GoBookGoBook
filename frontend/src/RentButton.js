import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./App.css";
import axios from "axios";

function RentButton(props) {
  
    // let userId = JSON.parse(localStorage.getItem('userId'));
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
                // 검색에서 책 하나를 빌리면 하단 책들까지 모두 반납하기 버튼으로 변경되는 문제 해결 필요
                mybook.title == props.book.title
                ? setRentStatus("return")
                : setRentStatus("rent")
              ))
          })
          .catch((error) => {
              alert("빌린도서 리스트를 받아오는 데 실패했습니다.");
              console.log(error);
          });
    }, [props.book]);

    let rentFunc = () => {
  
      // 리렌더링되면 isLogin도 false로 초기화
      // 이미 로그인상태인데 아래에 걸려버리는 이슈
      // 로컬스토리지 이용 필요하므로 여기서는 userId를 통해 확인
      if(!userId) {
        alert('로그인 후 이용할 수 있습니다.');
        return history.push("/login");
      }
  
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
          setRentStatus("return")
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