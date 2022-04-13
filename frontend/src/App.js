import React, { useEffect, useState } from "react";
import {
  InputGroup,
  FormControl,
  Button,
  Nav,
  Navbar,
  Container,
} from "react-bootstrap";
import { Link, Route, Switch } from "react-router-dom";
import BestSeller from "./BestSeller.js";
import NewBooks from "./NewBooks.js";
import Data from "./fakeData.js";
import "./App.css";

export let bookContext = React.createContext();

function App() {

  let [books, booksChange] = useState(Data);


  return (
    <div className="App">
      <div>
        <span>로그인</span>
        <span> | </span>
        <span>회원가입</span>
        <span> | </span>
        <span>마이페이지</span>
      </div>
      <InputGroup className="p-5">
        <FormControl
          size="lg"
          type="search"
          placeholder="제목, 저자, 출판사로 검색"
          aria-label="Search"
        />
        <Button variant="outline-secondary">검색</Button>
      </InputGroup>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>도서</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                베스트셀러
              </Nav.Link>
              <Nav.Link as={Link} to="/new">
                신간도서
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <hr />

      <Switch>
        <Route exact path="/">
          <bookContext.Provider value={books}>
            <BestSeller />
          </bookContext.Provider>
        </Route>
        <Route path="/new">
          <NewBooks />
        </Route>
      </Switch>
    </div>
  );

    return (
        <div className="App">
            <div>
                <span>로그인</span><span> | </span>
                <span>회원가입</span><span> | </span>
                <span>마이페이지</span>
            </div>
           <InputGroup className="p-5">
                <FormControl size="lg" type="search" placeholder="제목, 저자, 출판사로 검색" aria-label="Search" />
                <Button variant="outline-secondary">검색</Button>
            </InputGroup>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand>도서</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/bestseller">베스트셀러</Nav.Link>
                        <Nav.Link as={Link} to="/newbook">신간도서</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <hr/>

            <Switch>
                <Route exact path="/bestseller">
                    <bookContext.Provider value={books}>
                        <BestSeller />
                    </bookContext.Provider>
                </Route>
                <Route path="/newbook">
                    <NewBooks />
                </Route>
            </Switch>
            
        </div>
    );
}

export default App;
