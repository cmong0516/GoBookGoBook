import React, { useEffect, useState } from "react";
import axios from "axios";
import RentButton from "./RentButton.js";
import { Row, Col, Card, Badge } from "react-bootstrap";

function Search(props) {
  let [result, setResult] = useState();
  // 대여상태에 따른 전체 책 하나하나의 버튼상태 업데이트를 위한 state
  let [stateCheck, setStateCheck] = useState(false);
  let searchWord = props.searchWord;
  let userId = localStorage.getItem("userId");

  useEffect(() => {
    axios.get("/api/search", { params: { query: searchWord } })
      .then((res) => {
        setResult(res.data);
        if (res.data.length == 0) {
          alert("검색결과가 없습니다🤔");
        }
      })
      .catch((error) => {
        alert("검색결과 데이터를 받아오는 데 실패했습니다.");
        console.log(error);
      });
  }, [searchWord, stateCheck]);

  return (
    <Row xs={1} md={4} className="g-4">
      {result &&
        result.map((book, i) => (
          <Col>
            <Card className="searchcard">
              <Badge bg="primary" className="searchindex">
                {i + 1}
              </Badge>
              <Card.Img
                variant="top"
                src={book.thumbnail}
                className="cardImg"
              />
              <Card.Body>
                <Card.Title>{book.title.substr(0, 15)}...</Card.Title>
                <Card.Text>{book.authors}</Card.Text>
                <Card.Text>{book.publisher}</Card.Text>
                <Card.Text>{book.contents.substr(0, 60)}...</Card.Text>
              </Card.Body>
            </Card>
            {userId != "admin0" ? (
              <RentButton
                book={{
                  author: book.authors,
                  categoryName: book.categoryName,
                  coverLargeUrl: book.coverLargeUrl,
                  coverSmallUrl: book.thumbnail,
                  customerReviewRank: book.customerReviewRank,
                  description: book.contents,
                  isbn: book.isbn,
                  pubDate: book.dateTime,
                  publisher: book.publisher,
                  rank: book.rank,
                  title: book.title,
                  userId: userId,
                }}
                stateCheck={stateCheck}
                setStateCheck={setStateCheck}
              />
            ) : null}
          </Col>
        ))}
    </Row>
  )
}

export default Search;
