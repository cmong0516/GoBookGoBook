import React, { useEffect, useState } from "react";
import axios from "axios";
import Book from "./Book.js";
import NewBooksCategory from "./NewBooksCategory.js";
import {Col} from "react-bootstrap";
import styled from 'styled-components';

export let NewBooksContext = React.createContext();

let CategoryStyle = styled.div`
  text-align: left;
`

function NewBooks(props) {
  let [books, setBooks] = useState();

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
        <CategoryStyle>
          <NewBooksCategory/>
        </CategoryStyle>

        <NewBooksContext.Provider value={books}>
          {props.getBooks(books)}
          <Book />
        </NewBooksContext.Provider>
      </Col>
    </div>
  );
}

export default NewBooks;
