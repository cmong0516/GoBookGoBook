import React, {useState} from "react";
import {Nav, Navbar, Container} from "react-bootstrap";
import "./App.css";
import styled from "styled-components";
import { Link, Route, Switch, useHistory } from "react-router-dom";
import BestSeller from "./BestSeller.js";
import NewBooks from "./NewBooks.js";
import Detail from "./Detail.js";
import Search from "./Search.js";
import Login from "./Login.js";
import Signin from "./Signin.js";
import SearchBar from "./SearchBar";
import Mypage from "./Mypage.js";
import Editprofile from "./Editprofile.js";

// const GlobalStyle  =  createGlobalStyle`
//   font-family: 'Pretendard-Medium';
// `

let Wrapper = styled.div`
  width: 70%;
  margin: auto;
`;
let UserStyle = styled.div`
  text-align: right;
  padding: 2rem;
  font-size: 13pt;
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
  };

  let [searchWord, searchWordChange] = useState("");

  return (
    <div className="App">
      {/* <GlobalStyle/> */}
      <UserStyle>
        <div className="nav">
          <div className="titleImg">
            <a href="/">
              <div>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReIJDl-BNU7poDMxewQcEWm7ZLBeoxSfvVlQ&usqp=CAU" />
              </div>
              <div>Go Book Go Book</div>
            </a>
          </div>
          <div>
            <Link to="/loginpage">
              <span>로그인</span>
            </Link>
            <span>|</span>
            <Link to="/signinpage">
              <span>회원가입</span>
            </Link>
            <span>|</span>
            <Link to="/myrentlist">
              <span>마이페이지&nbsp;</span>
            </Link>
          </div>
        </div>

        <SearchBar
          searchWord={searchWord}
          searchWordChange={searchWordChange}
        />
      </UserStyle>

      <Navbar bg="success" variant="dark">
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
            <BestSeller getBooks={getBooks} />
          </Route>
          <Route path="/api/newbook">
            <NewBooks getBooks={getBooks} />
          </Route>
          <Route path="/detail/:isbn">
            <BookContext.Provider value={books}>
              <Detail />
            </BookContext.Provider>
          </Route>

          <Route path="/search">
            <Search searchWord={searchWord} />
          </Route>

          <Route path="/loginpage">
            <Login />
          </Route>
          <Route path="/signinpage">
            <Signin />
          </Route>
          <Route path="/myrentlist">
            <Mypage />
          </Route>
          <Route path="/editprofile">
            <Editprofile />
          </Route>
        </Wrapper>
      </Switch>
    </div>
  );
}

export default App;
