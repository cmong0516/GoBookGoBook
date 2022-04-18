import React, { useEffect, useState } from "react";
import axios from "axios";
import Book from "./Book.js";
import { Button, ButtonGroup, ButtonToolbar, Col } from "react-bootstrap";

export let NewBooksContext = React.createContext();

function NewBooks(props) {
  let [books, setBooks] = useState();
  let [menu, setMenu] = useState(0);
  useEffect(() => {
    axios
      .get("/api/newbook")
      .then((res) => {
        setBooks(res.data);
      })
      .catch((error) => {
        alert("도서 데이터를 받아오는 데 실패했습니다.");
        console.log(error);
      });
  }, []);

  return (
    <div className="row">
      <Col>
        <ButtonToolbar aria-label="Toolbar with button groups">
          <ButtonGroup className="me-2" aria-label="First group">
            <Button>국내도서</Button>
            <Button>국내소설</Button>
            <Button>외국도서</Button>
            <Button>4</Button>
            <Button>5</Button>
            <Button>6</Button>
            <Button>7</Button>
            <Button>8</Button>
          </ButtonGroup>
        </ButtonToolbar>
        <NewBooksContext.Provider value={books}>
          {props.getBooks(books)}
          <Book />
        </NewBooksContext.Provider>
      </Col>
    </div>
  );
}

export default NewBooks;
