import React, { useEffect, useState } from "react";
import axios from "axios";
import RentButton from "./RentButton.js";
import { Row, Col, Card, Badge } from "react-bootstrap";

function Search(props) {
  let [result, setResult] = useState();
  let searchWord = props.searchWord;
  let userId = localStorage.getItem("userId");

  useEffect(() => {
    axios
      .get("/api/search", { params: { query: searchWord } })
      .then((res) => {
        setResult(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        alert("검색결과 데이터를 받아오는 데 실패했습니다.");
        console.log(error);
      });
  }, [searchWord]);

  return (
    <div>
      {/* 검색결과가 없는 경우도 처리해야함 */}
      <Row xs={1} md={4} className="g-4">
        {result &&
          result.map((book, i) => (
            <Col>
              <Card className="searchcard">
                <Badge bg="primary" className="searchindex">
                  {i + 1}
                </Badge>
                <Card.Img variant="top" src={book.thumbnail} />
                <Card.Body>
                  <Card.Title>{book.title.substr(0, 15)}...</Card.Title>
                  <Card.Text>{book.authors}</Card.Text>
                  <Card.Text>{book.publisher}</Card.Text>
                  <Card.Text>{book.contents.substr(0, 60)}...</Card.Text>
                </Card.Body>
              </Card>
              <RentButton
                className="searchRentButton"
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
              />
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
