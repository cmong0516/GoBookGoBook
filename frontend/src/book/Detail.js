import React, { useContext, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  Card,
  ListGroup,
  ListGroupItem,
  Tabs,
  Tab,
  Badge,
  Button,
} from "react-bootstrap";
import "../App.css";
import { BookContext } from "../App.js";
import RentButton from "./RentButton.js";
import styled from "styled-components";
import axios from "axios";

// 여기서 css 작업
// shift + ~버튼 = ` ` (작은따옴표 아님!)
let BookView = styled.div`
  text-align: left;
  display: grid;

  h1 {
    color: pink;
    margin-bottom: 0;
  }
`;
let 카테고리명 = styled.span`
  text-weight: bold;
  color: red;
`;

function Detail() {
  let book = useContext(BookContext);

  return (
    <div>
      {book ? (
        <DetailView books={book} />
      ) : (
        alert(
          "새로고침으로 인해 state가 유지되지 않아 도서데이터 수신에 실패했습니다."
        )
      )}
    </div>
  );
}

// 화면단 구성
function DetailView(props) {
  let [findReview, setFindReview] = useState([]);
  useEffect(() => {
    axios
      .post("/review/findbybook", {
        isbn: book.isbn,
      })
      .then((res) => {
        console.log(res.data);
        setFindReview(res.data);
      })
      .catch((error) => {
        alert("리뷰 조회에 실패했습니다.");
        console.log(error);
      });
  }, []);
  let { isbn } = useParams();
  let book = props.books && props.books.find((x) => x.isbn == isbn);
  let userId = localStorage.getItem("userId");
  let [stateCheck, setStateCheck] = useState(false);
  let [review, setReview] = useState({
    userId: "",
    title: "",
    content: "",
    isbn: "",
  });
  let onChangeFunc = (e) => {
    setReview({
      ...review,
      [e.target.name]: e.target.value,
    });
  };

  let addReview = () => {
    axios
      .post("/review/add", {
        userId: userId,
        title: book.title,
        content: review.content,
        isbn: book.isbn,
      })
      .then((res) => {
        alert("리뷰 등록 성공!");
      })
      .catch((error) => {
        alert("리뷰 등록에 실패했습니다.");
        console.log(error);
      });
  };

  return (
    // html 코드
    // 화면 레이아웃(구조)는 그리드 검색
    // div태그(블럭요소, 위아래로 자동줄바꿈됨)랑 span태그(인라인요소) 차이 주의
    <BookView>
      <div className="detailPage">
        <div>
          <Card style={{ width: "25rem" }}>
            {book.rank && (
              <Badge bg="primary" className="searchindex">
                BestSeller Rank {book.rank}
              </Badge>
            )}
            <Card.Img variant="top" src={book.coverLargeUrl} />
            {userId != "admin0" ? (
              <RentButton
                book={book}
                stateCheck={stateCheck}
                setStateCheck={setStateCheck}
              />
            ) : null}
          </Card>
        </div>

        <div>
          <Tabs
            defaultActiveKey="info"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="info" title="책 정보">
              <Card style={{ width: "25rem" }}>
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <Card.Text>{book.description}</Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroupItem>카테고리 : {book.categoryName}</ListGroupItem>
                  <ListGroupItem>저자 : {book.author}</ListGroupItem>
                  <ListGroupItem>
                    출간일 : {book.pubDate.substr(0, 4)}년{" "}
                    {book.pubDate.substr(4, 2)}월 {book.pubDate.substr(6, 2)}일
                  </ListGroupItem>
                  <ListGroupItem>출판사 : {book.publisher}</ListGroupItem>
                  {book.customerReviewRank == 0 ? null : (
                    <ListGroupItem>
                      평점 : {book.customerReviewRank}
                    </ListGroupItem>
                  )}
                </ListGroup>
              </Card>
            </Tab>

            <Tab eventKey="reviewinfo" title="리뷰보기">
              {findReview &&
                findReview.map((review, i) => (
                  <Card className="" style={{ width: "25rem" }}>
                    <form>
                      <Card.Body>
                        <Card.Title>{book.title}</Card.Title>
                        <Card.Text>
                          {review.userId} / {review.pubDate.substr(0, 4)}년
                          {review.pubDate.substr(5, 2)}월
                          {review.pubDate.substr(8, 2)}일
                        </Card.Text>
                        <Card.Text></Card.Text>
                      </Card.Body>
                      <ListGroup className="list-group-flush">
                        <ListGroupItem>{review.content}</ListGroupItem>
                      </ListGroup>
                    </form>
                  </Card>
                ))}
            </Tab>
            <Tab eventKey="reviewadd" title="리뷰작성">
              <Card className="" style={{ width: "25rem" }}>
                <form>
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <Card.Text>
                      <textarea
                        placeholder="책에 대한 자유로운 의견을 남겨주세요"
                        name="content"
                        onChange={onChangeFunc}
                      ></textarea>
                    </Card.Text>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem>
                      <Button
                        variant="outline-primary"
                        onClick={() => addReview()}
                      >
                        리뷰등록
                      </Button>
                    </ListGroupItem>
                  </ListGroup>
                </form>
              </Card>
            </Tab>
          </Tabs>
        </div>
      </div>
    </BookView>
  );
}

export default Detail;