import React, { useContext } from "react";
import { useParams } from "react-router-dom";
// import { Button } from "react-bootstrap";
import "./App.css";
import {BookContext} from "./App.js";
import RentButton from "./RentButton.js"
import styled from 'styled-components';

let BookView = styled.div`
  text-align: left;
`

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
    <BookView>
      <img src={book.coverLargeUrl} width="350rem" />
      {book.categoryName}
      <br />
      카테고리 번호 : {
        book.categoryId
        ? book.categoryId
        : null
      } <br />
      인터파크평점 : 
      {
        book.customerReviewRank == 0
        ? <span></span>
        : book.customerReviewRank
      }
      <h1>{book.title}</h1>
      <br />
      작가 <b>{book.author}</b>
      <br />
      번역가 {book.translator}
      <br />
      출간일 : {book.pubDate}
      <br />
      출판사 : {book.publisher}
      <br />
      isbn : {book.isbn}
      <br />
      {book.description}
      <br />
      <RentButton book={book} />
      {/* <Button variant="info" size="lg">뒤로가기</Button> */}
    </BookView>
  );
}

export default Detail;
