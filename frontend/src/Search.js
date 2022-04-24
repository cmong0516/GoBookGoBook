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
    <div className="searchPage">
      {/* 검색결과가 없는 경우도 처리해야함 */}
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
      {/* 여기까지 html */}
      {/* books state를 만들어 버튼에 넣으면 이미 books값을 가져오기 전에 RentButton으로 넘어가버려서 undefined가 출력되는 것으로 추정

                    {() => setBooks({
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
                        // title: book.title,
                        title: "체크",
                        userId: userId
                    })} 
                    
                    <RentButton book={books} />*/}
    </div>
  );
}

export default Search;
