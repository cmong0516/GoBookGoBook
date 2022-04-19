import React, { useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./App.css";
import { BookContext, IsLoginContext } from "./App.js";
import axios from "axios";

function Detail() {
  let book = useContext(BookContext);

  return (
    <div>
      {
        book 
        ? <DetailView books={book} />
        : alert("새로고침으로 인해 state가 유지되지 않아 도서데이터 수신에 실패했습니다.")
      }
    </div>
  );
}

function DetailView(props) {

  let { isbn } = useParams();
  let book = props.books && props.books.find((x) => x.isbn == isbn);

  return (
    <div>
      <img src={book.coverLargeUrl} width="300rem" />
      {book.title}
      <br />
      {book.author}
      <br />
      {book.translator}
      <br />
      {book.pubDate}
      <br />
      {book.publisher}
      <br />
      {book.categoryId}
      <br />
      {book.categoryName}
      <br />
      {book.isbn}
      <br />
      {book.customerReviewRank}
      <br />
      {book.description}
      <br />
      <RentButton book={book} />
    </div>
  );
}

function RentButton(props) {
  
  let isLogin = useContext(IsLoginContext);
  let userId = localStorage.getItem('userId');

  let history = useHistory();
  let rentStatus = "rent";

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
        userId:userId
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
  if (rentStatus === "rent") {
    return (
      <Button variant="success" size="lg" onClick={rentFunc}>
        대여하기
      </Button>
    );
  } else if (rentStatus === "return") {
    return (
      <Button variant="dark" size="lg">
        반납하기
      </Button>
    );
  } else {
    return (
      <Button variant="danger" size="lg">
        대여불가
      </Button>
    );
  }
}

export default Detail;
