import React, {useState} from "react";
import {Nav, Navbar, Container, InputGroup, FormControl, Button} from "react-bootstrap";
import "./App.css";
import styled from 'styled-components';
import { Link, Route, Switch, useHistory } from "react-router-dom";
import BestSeller from "./BestSeller.js";
import NewBooks from "./NewBooks.js";
import Detail from "./Detail.js";
import Search from "./Search.js"

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

  span {
    margin: 0.5rem;
  }
`;

export let BookContext = React.createContext();

function App() {

  let [books, setBooks] = useState();
  let getBooks = (booksData) => {
    setBooks(booksData);  
  }

  let [searchWord, searchWordChange] = useState('');
  let history = useHistory();

  return (
    <div className="App">

      {/* <GlobalStyle/> */}
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
      <UserStyle>
        <span>로그인</span>
        <span> | </span>
        <span>회원가입</span>
        <span> | </span>
        <span>마이페이지</span>
      </UserStyle>
      {/*<InputGroup className="p-5">*/}
      {/*  <FormControl*/}
      {/*    size="lg"*/}
      {/*    type="search"*/}
      {/*    placeholder="제목, 저자, 출판사로 검색"*/}
      {/*    aria-label="Search"*/}
      {/*  />*/}
      {/*  <Button variant="outline-secondary" >검색</Button>*/}
      {/*</InputGroup>*/}
      <div>
      <form action="/kakao/search" method="GET">
        <label for="searching">검색을 원하는 책 , 저자 를 입력해주세요.</label>
        <input type="text" name="query" id="searching"></input>
          <button type="submit">검색</button>
      </form>
      </div>
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
>>>>>>> 30a422fd0d683aeeb8553272a87a8357be2d0b25
=======
      <UserStyle>
          <span>로그인</span>
          <span>|</span>
          <span>회원가입</span>
          <span>|</span>
          <span>마이페이지&nbsp;</span>
          <InputGroup className="my-5 w-50 mx-auto">
              <FormControl
                  size="lg"
                  type="search"
                  placeholder="검색을 원하는 책, 저자를 입력해주세요."
                  aria-label="Search"
                  onChange={(e) => { searchWordChange(e.target.value) }}/>
              <Button 
                  className="rounded-1" 
                  variant="outline-light" 
                  onClick={()=>{ history.push('/kakao/search/'+ searchWord)}}>검색</Button>
              
              <br/>
              검색값 : {searchWord}
              <br/>
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
>>>>>>> 8234dd320796ffbc0c83e63bcda695a096263964

      <Switch>
        <Wrapper>
          <Route exact path="/api/bestseller">
            <BestSeller getBooks={getBooks}/>
          </Route>
          <Route path="/api/newbook">
            <NewBooks getBooks={getBooks}/>
          </Route>
          <Route path="/detail/:isbn">
            <BookContext.Provider value={books}>
              <Detail />
            </BookContext.Provider>
          </Route>
          <Route path="/kakao/search">
            <Search searchWord={searchWord}/>
          </Route>
        </Wrapper>
      </Switch>
    </div>
  );

}

export default App;