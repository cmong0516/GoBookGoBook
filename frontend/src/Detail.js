import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import "./App.css";
import {BookContext} from "./App.js";
import RentButton from "./RentButton.js"

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

export default Detail;
