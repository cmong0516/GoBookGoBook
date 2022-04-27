import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import "../App.css";
import axios from "axios";

function RentButton(props) {

  let userId = localStorage.getItem("userId");

  let history = useHistory();
  let [rentStatus, setRentStatus] = useState("rent");
  let [myBook, setMyBook] = useState();

  // 나의 전체 대여/반납 도서목록 가져오기
  useEffect(() => {
    axios.post("/rent/info", { userId: userId })
      .then((res) => {
        let booksNum = 0;

        // 대여한 도서 수 판단
        res.data.map((mybooks) => {
          if (mybooks.state == true) {
            booksNum++;
          }
        });

        // 반납 시 서버에 줄 대여책정보 
        // (같은 책을 한번 더 빌리는 경우를 고려해 state가 true(현재 대여중)인 데이터)
        setMyBook(
          res.data
            .filter((x) => x.title == props.book.title)
            .filter((x) => x.state == true)
        );

        if (
          res.data
            .filter((x) => x.title == props.book.title)  // 현재 보는 책의 도서명과 나의 대여/반납도서들 중 도서명이 같은 것 
            .filter((x) => x.state == true).length !== 0  // 그 중 대여중인 책
        ) {
          setRentStatus("return");
          // 그렇지 않고 대여 도서 수가 5개라면 대여금지, 5개 미만이면 대여
        } else {
          booksNum >= 5
            ? setRentStatus("forbidden")
            : setRentStatus("rent")
        }
      })
      .catch((error) => {
        alert("빌린도서 리스트를 받아오는 데 실패했습니다.");
        console.log(error);
      });
  }, [props.stateCheck]);
  // 대여버튼의 상위컴포넌트 리렌더링을 위함

  let rentFunc = () => {

    // 로그인하지 않고 대여버튼 클릭 시 로그인으로 이동
    if (!userId) {
      alert("로그인 후 이용할 수 있습니다.");
      return history.push("/login");
    }

    axios.post("/rent/add", {
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
      userId: userId,
    })
      .then(() => {
        props.setStateCheck(!props.stateCheck);
        alert("대여 성공!");
      })
      .catch((error) => {
        alert("대여 통신에 실패했습니다.");
        console.log(error);
      });
  };

  let returnFunc = () => {
    axios.post("/rent/return", {
      rentId: myBook[0].rentId,
    })
      .then(() => {
        alert("반납하셨습니다.");
        props.setStateCheck(!props.stateCheck);
      })
      .catch((error) => {
        alert("반납 서버와의 통신에 실패했습니다.");
        console.log(error);
      });
  };

  if (rentStatus == "rent") {
    return (
      <Button variant="success" size="lg" onClick={rentFunc}>
        대여하기
      </Button>
    );
  } else if (rentStatus == "return") {
    return (
      <Button variant="dark" size="lg" onClick={returnFunc}>
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
