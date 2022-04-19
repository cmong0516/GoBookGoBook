import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./App.css";
import { BookContext } from "./App.js";
import axios from "axios";

function Detail() {
  let book = useContext(BookContext);

  return (
    <div>
      {book ? (
        <DetailView books={book} />
      ) : (
        alert(
          "새로고침으로 인해 state가 유지되지 않아 도서데이터 수신에 실패했습니다."
        )
      )}
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
  
  let userName = localStorage.getItem('userName');
  let rentStatus = "rent";
  JSON.stringify(props.book);
  
  let rentFunc = () => {

    if(!userName) {
      return <Link to="/login"/>
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
