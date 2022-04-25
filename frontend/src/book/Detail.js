import React, { useContext, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  Card,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Badge,
  Button,
} from "react-bootstrap";
import "../App.css";
import { BookContext } from "../App.js";
import Review from "./Review.js";
import RentButton from "./RentButton.js";
import styled from "styled-components";
import axios from "axios";

let BookView = styled.div`
  display: grid;
  justify-items: center;
  height: 100%;

  h4 {
    margin-bottom: 0;
  }
`

function Detail() {
  let book = useContext(BookContext);

  return (
    <div>
      {book
        ? <DetailView books={book} />
        : alert("새로고침으로 인해 state가 유지되지 않아 도서데이터 수신에 실패했습니다.")
      }
    </div>
  );
}

// 화면단 구성
function DetailView(props) {
  
  useEffect(() => {
    axios
      .post("/review/findbybook", {
        isbn: book.isbn,
      })
      .then((res) => {
        console.log(res.data);
        setFindReview(res.data);
      })
      .catch((error) => {
        alert("리뷰 조회에 실패했습니다.");
        console.log(error);
      });
  }, []);

  let { isbn } = useParams();
  let book = props.books && props.books.find((x) => x.isbn == isbn);
  let userId = localStorage.getItem("userId");
  let [stateCheck, setStateCheck] = useState(false);
  let [findReview, setFindReview] = useState([]);

  return (
    <BookView>
      <Row>
        <Col>
          <Card style={{ width: "17vw" }}>
            {
              book.rank && <Card.Header>
                <h4>
                  <Badge bg="light" text="dark">
                    베스트셀러 {book.rank}위 🏆
                  </Badge>
                </h4>
              </Card.Header>
            }
            <Card.Img variant="top" src={book.coverLargeUrl} />
          </Card>
          <br />
          {
            userId != "admin0"
              ? <RentButton
                book={book}
                stateCheck={stateCheck}
                setStateCheck={setStateCheck}
              />
              : null
          }
        </Col>
        
        <Col>
          <Card style={{ width: "25rem" }}>
            <Card.Body>
              <Card.Title>{book.title}</Card.Title>
              <Card.Text>{book.description}</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>카테고리 : {book.categoryName}</ListGroupItem>
              <ListGroupItem>저자 : {book.author}</ListGroupItem>
              <ListGroupItem>
                출간일 : {book.pubDate.substr(0, 4)}년{" "}
                {book.pubDate.substr(4, 2)}월 {book.pubDate.substr(6, 2)}일
              </ListGroupItem>
              <ListGroupItem>출판사 : {book.publisher}</ListGroupItem>
              {book.customerReviewRank == 0 ? null : (
                <ListGroupItem>
                  평점 : {book.customerReviewRank}
                </ListGroupItem>
              )}
            </ListGroup>
          </Card>
        </Col>

        <Col>
          <Review book={book} />
        </Col>
      </Row>
    </BookView>
  );
}

export default Detail;