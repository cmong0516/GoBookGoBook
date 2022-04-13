import React from "react";
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
import "./App.css";
import styled from 'styled-components';

// const GlobalStyle  =  createGlobalStyle`
//   font-family: 'Pretendard-Medium';
// `

let Wrapper = styled.div`
  width : 80%;
  margin : auto;
`;
let UserStyle = styled.div`
  text-align: right;
  padding : 20pt;
`;

function App() {

  return (
    <div className="App">

      {/* <GlobalStyle/> */}
      <UserStyle>
        <span>로그인</span>
        <span> | </span>
        <span>회원가입</span>
        <span> | </span>
        <span>마이페이지</span>
      </UserStyle>
      <InputGroup className="p-5">
        <FormControl
          size="lg"
          type="search"
          placeholder="제목, 저자, 출판사로 검색"
          aria-label="Search"
        />
        <Button variant="outline-secondary" >검색</Button>
      </InputGroup>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>도서</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/bestseller">
                베스트셀러
              </Nav.Link>
              <Nav.Link as={Link} to="/newbook">
                신간도서
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <hr />

      <Switch>
        <Wrapper>
          <Route exact path="/bestseller">
            <BestSeller />
          </Route>
          <Route path="/newbook">
            <NewBooks />
          </Route>
        </Wrapper>
      </Switch>
    </div>
  );

}

export default App;
