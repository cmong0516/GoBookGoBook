import React, { useState } from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
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

// const GlobalStyle  =  createGlobalStyle`
//   font-family: 'Pretendard-Medium';
// `

let Wrapper = styled.div`
  width: 70%;
  margin: auto;
  padding-top: 3rem;
  min-height: 100%;
`;
let UserStyle = styled.div`
  text-align: right;
  padding: 2rem;
  font-size: 13pt;
  background-color: rgb(13, 202, 240);
  color: floralwhite;
  span {
    margin: 0.5rem;
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

  // useEffect(() => {
  //   localStorage.setItem('userId', null);
  // },[isLogin]);
  return (
    <div className="App">
      {/* <GlobalStyle/> */}
      <UserStyle>
        <div className="nav">
          <div className="titleImg">
            <Link to="/">
              <span>Go Book Go Book</span>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReIJDl-BNU7poDMxewQcEWm7ZLBeoxSfvVlQ&usqp=CAU" />
            </Link>
          </div>
          <div>
            {userId ? (
              <div>
                <Link to="/">
                  <span
                    onClick={() => {
                      localStorage.clear();
                      setIsLogin(false); // 얘를 주석처리하면 로그아웃 눌러도 로그인으로 돌아오지 않음
                    }}
                  >
                    로그아웃
                  </span>
                </Link>
                <span>|</span>
                {userId == "admin0" ? (
                  <Link to="/admin">
                    <span>관리자페이지</span>
                  </Link>
                ) : (
                  <Link to="/mypage">
                    <span>마이페이지&nbsp;</span>
                  </Link>
                )}
              </div>
            ) : (
              <div>
                <Link to="/login">
                  <span>로그인</span>
                </Link>
                <span>|</span>
                <Link to="/signin">
                  <span>회원가입</span>
                </Link>
              </div>
            )}
          </div>
        </div>
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
            <Search searchWord={searchWord} />
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
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;
