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
import BestSeller,{BestSellerContext} from "./BestSeller.js";
import NewBooks from "./NewBooks.js";
import Detail from "./Detail.js"
import "./App.css";
import styled from 'styled-components';


// const GlobalStyle  =  createGlobalStyle`
//   font-family: 'Pretendard-Medium';
// `

let Wrapper = styled.div`
  width : 70%;
  margin : auto;
`;
let UserStyle = styled.div`
  text-align: right;
  padding : 2rem;
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
              placeholder="검색을 원하는 책, 저자를 입력해주세요."
              aria-label="Search"
            />
            <Button variant="outline-light" >검색</Button>
          </InputGroup>
        </UserStyle>
    <Navbar bg="success" variant="dark">
      <Container>
        <Navbar.Brand className="fs-3">도서</Navbar.Brand>
        <Nav className="me-auto fs-5">
          <Nav.Link as={Link} to="/api/bestseller">베스트셀러</Nav.Link>
          <Nav.Link as={Link} to="/api/newbook">신간도서</Nav.Link>
        </Nav>
      </Container>
    </Navbar>

      <Switch>
        <Wrapper>
          <Route exact path="/api/bestseller">
            <BestSeller />
          </Route>
          <Route path="/api/newbook">
            <NewBooks />
          </Route>
          <Route path="/detail/:isbn">
            {/* <BestSeller> */}
              {/* <BestSellerContext.Provider value={books}> */}
                <Detail/>
                {/* <Detail books={books}/> */}
              {/* </BestSellerContext.Provider> */}
            {/* </BestSeller> */}
          </Route>
        </Wrapper>
      </Switch>
    </div>
  );

}

export default App;
