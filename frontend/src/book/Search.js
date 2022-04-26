import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import RentButton from "./RentButton.js";
import { useHistory } from "react-router-dom";
import { Row, Col, Card, Badge, Button, Offcanvas } from "react-bootstrap";
import { BookContext, SetBookContext } from "../App.js";
import Review from "./Review.js";

function Search(props) {

  let history = useHistory();
  let books = useContext(BookContext);
  let setBooks = useContext(SetBookContext);
  // 대여상태에 따른 전체 책 하나하나의 버튼상태 업데이트를 위한 state
  let [stateCheck, setStateCheck] = useState(false);
  let searchWord = props.searchWord;
  let userId = localStorage.getItem("userId");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
  
    <Row xs={1} md={4} className="g-4">
      {books &&
        books.map((book, i) => (
          <Col>
            <Card className="searchcard" onClick={() => {
              // alert(book.isbn);
              history.push("/detail/" + book.isbn);
            }}>
              <Badge bg="primary">
                {searchWord} 검색 결과 No.{i + 1}
              </Badge>
              <Card.Img
                variant="top"
                src={book.coverLargeUrl}
                className="cardImg"
              />
              <Card.Body>
                <Card.Title>{book.title}...</Card.Title>
                <Card.Text>{book.author}</Card.Text>
                <Card.Text>{book.publisher}</Card.Text>
                {/* <Card.Text>{book.contents.substr(0, 60)}...</Card.Text> */}
                <Card.Text>{book.description}...</Card.Text>
              </Card.Body>
            </Card>
            {
              userId != "admin0"
                ?
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
                : null
            }
            <Button variant="primary" onClick={handleShow}>
              Launch
            </Button>

            <Offcanvas show={show} placement={'end'} onHide={handleClose}>
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>Offcanvas</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                Some text as placeholder. In real life you can have the elements you
                have chosen. Like, text, images, lists, etc.
              </Offcanvas.Body>
            </Offcanvas>
            {/* <Review book={book}/> */}
          </Col>
        ))}
    </Row>
  );
}

export default Search;
