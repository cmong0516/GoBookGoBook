import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  ListGroupItem,
  Row,
  Col,
  Badge,
} from "react-bootstrap";
import "../App.css";
import { BookContext } from "../App.js";
import Review from "./Review.js";
import RentButton from "./RentButton.js";
import styled from "styled-components";

let BookView = styled.div`
  margin-bottom: 10vh;
  margin-top: 2vh;
  h4 {
    margin-bottom: 0;
  }
`;

let DetailWrapper = styled.div`
  margin-top: 1rem;
  text-align: left;
  span {
    color: grey;
  }
`

function Detail() {
  let book = useContext(BookContext);

  return (
    // 베스트셀러와 신간, 검색 Ajax로 가져왔던 도서들을 상세정보 화면단에 넣어준다.
    <div>
      {book
        ? <DetailView books={book} />
        : alert("새로고침으로 인해 state가 유지되지 않아 도서데이터 수신에 실패했습니다.")
      }
    </div>
  );
}

// 상세정보 화면단
function DetailView(props) {

  let userId = localStorage.getItem("userId");

  // 라우터를 통해 받은 isbn을 사용해
  let { isbn } = useParams();
  // 위에서 가져왔던 도서들 중 클릭한 isbn값인 책을 꺼내 book에 넣는다.
  let book = props.books && props.books.find((x) => x.isbn == isbn);
  // 검색결과 화면에서 하나의 책 대여 시, 전체 대여버튼 상태 리렌더링을 위한 state
  let [stateCheck, setStateCheck] = useState(false);

  return (
    <BookView>
      <Row>
        {/* 도서순위, 이미지, 대여버튼 */}
        <Col sm={3}>
          <Card>
            {book.rank ? (
              <Card.Header>
                <h4>
                  <Badge bg="light" text="dark">
                    베스트셀러 {book.rank}위 🏆
                  </Badge>
                </h4>
              </Card.Header>
            ) : null}
            <Card.Img variant="top" src={book.coverLargeUrl} />
            {/* 관리자인 경우 대여버튼 보이지 않도록 */}
            {userId != "admin0" ? (
              <RentButton
                book={book}
                stateCheck={stateCheck}
                setStateCheck={setStateCheck}
              />
            ) : null}
          </Card>
          <br />
        </Col>

        {/* 도서 정보 */}
        <Col sm={5}>
          <DetailWrapper>
            <h3>{book.title}</h3>
            <p>
              <span>카테고리</span> {book.categoryName}({book.categoryId})
              <br />
              <span>isbn</span> {book.isbn}
            </p>
            <Card>
              <ListGroupItem>저자: {book.author}</ListGroupItem>
              <ListGroupItem>
                {/* 번역가가 없는 경우 - 처리 */}
                번역가: {book.translator ? book.translator : " -"}
              </ListGroupItem>
              <ListGroupItem>출간일: {book.pubDate.substr(0,4)}년{" "}
                {book.pubDate.substr(4, 2)}월 {book.pubDate.substr(6, 2)}일</ListGroupItem>
              <ListGroupItem>출판사: {book.publisher}</ListGroupItem>
              {/* 평점이 0인 경우 아예 Footer가 나오지 않도록 */}
              {
                book.customerReviewRank == 0
                  ? null
                  : <Card.Footer className="text-muted">
                    평점 : {book.customerReviewRank}
                  </Card.Footer>
              }
              <Card.Body>
                <Card.Text>{book.description}</Card.Text>
              </Card.Body>
            </Card>
          </DetailWrapper>
        </Col>

        {/* 도서 리뷰 */}
        <Col sm={4}>
          <Review book={book} />
        </Col>
      </Row>
    </BookView>
  );
}

export default Detail;
