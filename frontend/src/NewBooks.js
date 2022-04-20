import React, { useEffect, useContext } from "react";
import axios from "axios";
import Book from "./Book.js";
import { Nav, Col } from "react-bootstrap";
import styled from "styled-components";
import {BookContext, SetBookContext} from "./App.js";

export let NewBooksContext = React.createContext();

let CategoryStyle = styled.div`
  text-align: left;
`;

function NewBooks() {
  
  let books = useContext(BookContext);
  let setBooks = useContext(SetBookContext);

  useEffect(() => {
    axios
      .post("/api/newbook")
      .then((res) => {
        setBooks(res.data);
      })
      .catch((error) => {
        alert("도서 데이터를 받아오는 데 실패했습니다.");
        console.log(error);
      });
  }, []);

  function categoryNewbooks(categoryId) {
    axios
      .get("/api/newbook/" + categoryId)
      .then((res) => {
        setBooks(res.data);
      })
      .catch((error) => {
        console.log(error);
        alert("카테고리별 신간 데이터를 받을 수 없습니다.");
      });
  }

  return (
    <div className="row">
      <Col>
        <CategoryStyle>
          <Nav variant="tabs">
            <Nav.Item>
              <Nav.Link
                onClick={() => {
                  categoryNewbooks("101");
                }}
              >
                소설
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                onClick={() => {
                  categoryNewbooks("102");
                }}
              >
                시/에세이
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                onClick={() => {
                  categoryNewbooks("103");
                }}
              >
                예술/대중문화
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                onClick={() => {
                  categoryNewbooks("110");
                }}
              >
                아동
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                onClick={() => {
                  categoryNewbooks("117");
                }}
              >
                경제경영
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                onClick={() => {
                  categoryNewbooks("118");
                }}
              >
                자기계발
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </CategoryStyle>

        <NewBooksContext.Provider value={books}>
          <Book />
        </NewBooksContext.Provider>
      </Col>
    </div>
  );
}

export default NewBooks;
