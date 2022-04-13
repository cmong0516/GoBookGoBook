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
  font-size : 13pt;
  background-color: hsl(146, 45%, 36%);
  color: floralwhite;
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
          <InputGroup className="my-5 w-50 mx-auto">
            <FormControl
              size="lg"
              type="search"
              placeholder="제목, 저자, 출판사로 검색"
              aria-label="Search"
            />
            <Button variant="outline-light" >검색</Button>
          </InputGroup>
        </UserStyle>
    <Navbar bg="success" variant="dark">
      <Container>
        <Navbar.Brand className="fs-3">도서</Navbar.Brand>
        <Nav className="me-auto fs-4">
          <Nav.Link as={Link} to="/bestseller">베스트셀러</Nav.Link>
          <Nav.Link as={Link} to="/newbook">신간도서</Nav.Link>
        </Nav>
      </Container>
    </Navbar>

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
