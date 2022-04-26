import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import RentButton from "./RentButton.js";
import { useHistory } from "react-router-dom";
import { Row, Col, Card } from "react-bootstrap";
import { BookContext, SetBookContext } from "../App.js";
import styled from "styled-components";

let Wrapper = styled.div`
  text-align: left;

  h3 {
    padding: 0;
  }
`
let BookWrapper = styled.div`
  padding: 0.5rem;
  cursor: pointer;

  hr {
    margin-top: 0.5rem;
    padding: 0;
  }
`

function Search(props) {

  let history = useHistory();
  let books = useContext(BookContext);
  let setBooks = useContext(SetBookContext);
  let [stateCheck, setStateCheck] = useState(false);
  let searchWord = props.searchWord;
  let userId = localStorage.getItem("userId");

  useEffect(() => {
    axios
      .get("/api/search", { params: { query: searchWord } })
      .then((res) => {
        console.log(res.data)
        setBooks(res.data);
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
    <Wrapper>
      {
        books && books.map((book) => (
          <BookWrapper>
            <Row style={{ alignItems: "center" }}>

              <Col sm={12} md={10}>
                <Row onClick={() => { history.push("/detail/" + book.isbn) }}>
                  <Col sm={6} md={2}>
                    <img
                      variant="top"
                      width="100%"
                      src={book.coverLargeUrl}
                    />
                  </Col>
                  <Col sm={6} md={10}>
                    <Card style={{ height: '100%'}}>
                      <Card.Body>
                        <Card.Title>{book.title}</Card.Title>
                        <Card.Subtitle className="mt-2 mb-2 text-muted">{book.author} 지음&nbsp; | &nbsp;{book.publisher}</Card.Subtitle>
                        <Card.Text>
                          <footer className="blockquote-footer mt-1">
                            {book.description.substr(0, 200)}
                            {
                              book.description.length > 200
                                ? '...'
                                : null
                            }
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
                        pubDate: book.dateTime,
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
    </Wrapper>
  )
}

export default Search;
