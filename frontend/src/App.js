import React, { useState } from "react";
import { Nav, Navbar, Container, Col, Row } from "react-bootstrap";
import "./App.css";
import styled from "styled-components";
import { Link, Route, Switch } from "react-router-dom";
import BestSeller from "./book/BestSeller.js";
import NewBooks from "./book/NewBooks.js";
import Detail from "./book/Detail.js";
import Search from "./book/Search.js";
import Login from "./user/Login.js";
import Signin from "./user/Signin.js";
import SearchBar from "./book/SearchBar";
import Mypage from "./mypage/Mypage.js";
import Goodbye from "./user/Goodbye.js";
import Admin from "./user/Admin.js";
import Footer from "./Footer.js";
import FindMyInfo from "./user/FindMyInfo";
import Clock from "./Clock";

let Wrapper = styled.div`
  width: 70%;
  margin: auto;
  padding-top: 3rem;
  min-height: 100%;
`;
let UserStyle = styled.div`
  padding: 2rem;
  font-size: 14pt;
  background-color: rgb(13, 202, 240);
  color: floralwhite;
  
  span {
    margin-right: 1rem;
  }
  a {
    color: floralwhite;
    text-decoration: none;

    &:hover{ 
      color : black;
    }
  }
`;
export let BookContext = React.createContext();
export let SetBookContext = React.createContext();
export let DueDateContext = React.createContext();

function App() {
  let userId = localStorage.getItem("userId");
  let [isLogin, setIsLogin] = useState("");
  let [books, setBooks] = useState();
  let [searchWord, searchWordChange] = useState("");

  return (
    <div className="App">
      <UserStyle>
        <Row>
          <Col>
            <Link to="/">
              <span> GOBOOK GOBOOK</span>
            </Link>
          </Col>
        {userId
          ? (
            <Col>
              <Link to="/">
                <span
                  onClick={() => {
                    localStorage.clear();
                    setIsLogin(false);
                  }}
                >
                  로그아웃
                </span>
              </Link>
              <span>|</span>
              {userId == "admin0"
                ? (
                  <Link to="/admin">
                    <span>관리자페이지</span>
                  </Link>
                ) : (
                  <Link to="/mypage">
                    <span>마이페이지&nbsp;</span>
                  </Link>
                )}
            </Col>
          )
          : (
              <Col>
              <Link to="/login">
                <span>로그인</span>
              </Link>
              <span>|</span>
              <Link to="/signin">
                <span>회원가입</span>
              </Link>
              </Col>
            )}
        </Row>
        <img src="/GreenTurtle.png" width="100rem" />
        <Clock />
        <SearchBar
          searchWord={searchWord}
          searchWordChange={searchWordChange}
        />
      </UserStyle>

      <Navbar bg="info" variant="dark">
        <Container>
          <Navbar.Brand className="fs-3">도서</Navbar.Brand>
          <Nav className="me-auto fs-5">
            <Nav.Link as={Link} to="/api/bestseller">
              베스트셀러
            </Nav.Link>
            <Nav.Link as={Link} to="/api/newbook">
              신간도서
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Switch>
        <Wrapper>
          <Route exact path="/">
            여기에 발표동영상!
          </Route>
          <Route exact path="/api/bestseller">
            <BookContext.Provider value={books}>
              <SetBookContext.Provider value={setBooks}>
                <BestSeller />
              </SetBookContext.Provider>
            </BookContext.Provider>
          </Route>
          <Route exact path="/api/newbook">
            <BookContext.Provider value={books}>
              <SetBookContext.Provider value={setBooks}>
                <NewBooks />
              </SetBookContext.Provider>
            </BookContext.Provider>
          </Route>
          <Route path="/detail/:isbn">
            <BookContext.Provider value={books}>
              <Detail />
            </BookContext.Provider>
          </Route>
          <Route path="/api/search">
            <BookContext.Provider value={books}>
              <SetBookContext.Provider value={setBooks}>
                <Search searchWord={searchWord} />
              </SetBookContext.Provider>
            </BookContext.Provider>
          </Route>
          <Route path="/login">
            <Login setIsLogin={setIsLogin} />
          </Route>
          <Route path="/findmyinfo">
            <FindMyInfo />
          </Route>
          <Route path="/signin">
            <Signin />
          </Route>
          <Route path="/goodbye">
            <Goodbye setIsLogin={setIsLogin} />
          </Route>
          <Route path="/mypage">
            <Mypage />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
        </Wrapper>
      </Switch>
      
      <Footer />
    </div>
  );
}

export default App;
