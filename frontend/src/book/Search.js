import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import RentButton from "./RentButton.js";
import { useHistory } from "react-router-dom";
import { Row, Col, Card, Button } from "react-bootstrap";
import { BookContext, SetBookContext } from "../App.js";
import styled from "styled-components";

let BookWrapper = styled.div`
  padding: 0.5rem;
  cursor: pointer;
  text-align: left;

  hr {
    margin-top: 0.5rem;
    padding: 0;
  }
`;

function Search(props) {
  let userId = localStorage.getItem("userId");
  let history = useHistory();
  let books = useContext(BookContext);
  let setBooks = useContext(SetBookContext);
  let searchWord = props.searchWord;
  let [stateCheck, setStateCheck] = useState(false);

  // 더보기를 위한 state
  let [nowPage, setNowPage] = useState(1);
  let LastIndex = nowPage * 5 - 1;
  let slicebooks = [];
  books && (slicebooks = books.slice(0, LastIndex));

  useEffect(() => {
    axios
      .get("/api/search", { params: { query: searchWord } })
      .then((res) => {
        setStateCheck(!stateCheck);
        // 다른 검색어를 검색할 때마다 nowPage를 1로 초기화
        setNowPage(1);
        setBooks(res.data);

        if (res.data.length == 0) {
          alert("검색결과가 없습니다🤔");
        }
      })
      .catch((error) => {
        alert("검색결과 데이터를 받아오는 데 실패했습니다.");
        console.log(error);
      });
  }, [searchWord]);

  return (
    <div>
      {slicebooks &&
        slicebooks.map((book) => (
          <BookWrapper>
            <Row style={{ alignItems: "center" }}>
              <Col sm={12} md={10}>
                <Row
                  onClick={() => {
                    history.push("/detail/" + book.isbn);
                  }}
                >
                  <Col sm={6} md={2}>
                    <img variant="top" width="100%" src={book.coverLargeUrl} />
                  </Col>
                  <Col sm={6} md={10}>
                    <Card style={{ height: "100%" }}>
                      <Card.Body>
                        <Card.Title>{book.title}</Card.Title>
                        <Card.Subtitle className="mt-2 mb-2 text-muted">
                          {book.author} 지음&nbsp; | &nbsp;{book.publisher}
                        </Card.Subtitle>
                        <Card.Text>
                          <footer className="blockquote-footer mt-1">
                            {book.description.substr(0, 200)}
                            {book.description.length > 200 ? "..." : null}
                          </footer>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Col>

              {
                userId != 'admin0'
                  ?
                  <Col sm={0} md={2} >
                    <RentButton
                      book={{
                        author: book.author,
                        categoryName: '',
                        coverLargeUrl: book.coverLargeUrl,
                        coverSmallUrl: book.coverLargeUrl,
                        customerReviewRank: '',
                        description: book.description,
                        isbn: book.isbn,
                        pubDate: book.pubdate,
                        publisher: book.publisher,
                        rank: '',
                        title: book.title,
                        userId: userId,
                      }}
                      stateCheck={stateCheck}
                      setStateCheck={setStateCheck}
                    />
                  </Col>
                  : null
              }
            </Row>
          </BookWrapper>
        ))}

      {
        // 마지막 검색결과까지 도달하면 더보기버튼을 보이지 않음
        LastIndex >= (books && books.length) ? null : (
          <Button
            variant="dark"
            onClick={() => setNowPage(++nowPage)}
            style={{ borderRadius: "2rem", marginTop: "1rem" }}
          >
            ▼ 더보기
          </Button>
        )
      }
    </div>
  );
}

export default Search;
