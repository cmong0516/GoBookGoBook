
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
// import { Button } from "react-bootstrap";
import "../App.css";
import {BookContext} from "../App.js";
import RentButton from "./RentButton.js"
import styled from 'styled-components';

// 여기서 css 작업
// shift + ~버튼 = ` ` (작은따옴표 아님!)
let BookView = styled.div`
  text-align: left;
  display : grid;

  h1 {
    color : pink;
    margin-bottom: 0;
  }
`
let 카테고리명 = styled.span`
  text-weight: bold;
  color: red;
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

// 화면단 구성
function DetailView(props) {

  let { isbn } = useParams();
  let book = props.books && props.books.find((x) => x.isbn == isbn);
  let userId = localStorage.getItem("userId");
  let [stateCheck, setStateCheck] = useState(false);

  return (
    // html 코드
    // 화면 레이아웃(구조)는 그리드 검색
    // div태그(블럭요소, 위아래로 자동줄바꿈됨)랑 span태그(인라인요소) 차이 주의
    <BookView>
      <img src={book.coverLargeUrl} width="350rem" />
      <카테고리명>{book.categoryName}</카테고리명>
      <br />
      태그나 괄호 없이 글자를 쓰면 그냥 화면에 출력<br/>
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
      <br />
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
      {
        userId != 'admin0'
          ? <RentButton
            book={book}
            stateCheck={stateCheck}
            setStateCheck={setStateCheck}/>
        : null
      }
    </BookView>
  );
}

export default Detail;
