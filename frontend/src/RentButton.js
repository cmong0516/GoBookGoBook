import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./App.css";
import axios from "axios";

function RentButton(props) {
  let userId = localStorage.getItem("userId");

  // myBook은 전역state로 관리??
  let history = useHistory();
  let [rentStatus, setRentStatus] = useState("rent");
  let [myBook, setMyBook] = useState();

  useEffect(() => {
    axios
      .post("/rent/info", { userId: userId })
      .then((res) => {
        let booksNum = 0;
        console.log("------");

        res.data.map((mybooks) => {
          if (mybooks.state == true) {
            booksNum++;
            console.log(booksNum);
          }
        });

        // 반납 시 서버에 줄 대여책정보 (한번더 빌리는 경우 state가 true인 데이터로 주기)
        setMyBook(
          res.data
            .filter((x) => x.title == props.book.title)
            .filter((x) => x.state == true)
        );

        // 해당하지 않는 값은 null인줄 알았으나 콘솔찍어보니 빈배열이어서 .length로 빈배열판단
        if (
          res.data
            .filter((x) => x.title == props.book.title)
            .filter((x) => x.state == true).length !== 0
        ) {
          setRentStatus("return");
        } else {
          booksNum >= 5 ? setRentStatus("forbidden") : setRentStatus("rent");
        }

        console.log("여기까지 왔니?");
      })
      .catch((error) => {
        alert("빌린도서 리스트를 받아오는 데 실패했습니다.");
        console.log(error);
      });
  }, [props.stateCheck]);

  // function으로 따로 빼기
  let rentFunc = () => {
    if (!userId) {
      alert("로그인 후 이용할 수 있습니다.");
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
        userId: userId,
      })
      .then((res) => {
        props.setStateCheck(!props.stateCheck);
        alert("대여 성공!");
      })
      .catch((error) => {
        alert("대여 통신에 실패했습니다.");
        console.log(error);
      });
  };

  // function으로 따로 빼기
  let returnFunc = () => {
    axios
      .post("/rent/return", {
        rentId: myBook[0].rentId,
      })
      .then((res) => {
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
