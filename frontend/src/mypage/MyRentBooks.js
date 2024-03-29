import React from "react";
import { Card, Button, Row } from "react-bootstrap";
import styled from "styled-components";
import axios from "axios";

let CardStyle = styled.div`
  width: 33%;
  max-width: 240px;
  min-width: 210px;
  margin-top: 1rem;
`;

function MyRentBooks(props) {
  let rentBooks = props.rentBooks;

  // 이미 2번이상 빌려본 책은 지난 대여내역에서 한번만 나오도록 중복제거
  let rentBook = rentBooks.filter(
    (item, i, arr) => i === arr.findIndex((b) => item.title === b.title)
  );

  let returnFunc = (rentId) => {
    axios
      .post("/rent/return", {
        rentId: rentId,
      })
      .then((res) => {
        alert("반납하셨습니다.");
        props.setReturnCheck(!props.returnCheck);
      })
      .catch((error) => {
        alert("반납 서버와의 통신에 실패했습니다.");
        console.log(error);
      });
  };

  return (
    <Row>
      {rentBook &&
        rentBook.map((book) => (
          <CardStyle>
            <Card key={book.rentId}>
              {book.coverLargeUrl
                ? <Card.Img variant="top" src={book.coverLargeUrl} />
                : <Card.Img variant="top" src={book.coverSmallUrl} />
              }
              <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Text>대여일 : {book.rentDate}</Card.Text>
                {book.returnDate
                  ? <Card.Text>반납일 : {book.returnDate}</Card.Text>
                  : <Card.Text>반납예정일 : {dueDate(book.rentDate)}</Card.Text>
                }

                {book.state == true
                  ? <Button
                    variant="outline-danger"
                    onClick={() => returnFunc(book.rentId)}>
                    반납하기
                  </Button>
                  : null}
              </Card.Body>
            </Card>
          </CardStyle>
        ))}
    </Row>
  );
}

// 반납예정일 계산
function dueDate(rentDate) {
  let date = new Date(rentDate);
  date.setDate(date.getDate() + 7);

  let duedate =
    date.getFullYear() +
    "-" +
    String(Number(date.getMonth()) + 1) +
    "-" +
    date.getDate();

  return duedate;
}

export default MyRentBooks;
