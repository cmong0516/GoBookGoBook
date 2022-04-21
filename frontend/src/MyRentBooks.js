import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import axios from "axios";

let CartStyle = styled.div`
  width: 300px;
  margin-top: 1rem;
`;
let BookImg = styled.span``;

function MyrentPage(props) {
  let rentBooks = props.rentBooks;

  return (
    <Row>{rentBooks && rentBooks.map((book) => <CardComp book={book} />)}</Row>
  );
}

function returnFunc(rentId, props) {
  axios
    .post("/rent/return", {
      rentId: rentId,
    })
    .then((res) => {
      console.log(res);
      props?.setReturnCheck(...1);
    })
    .catch((error) => {
      console.log(error);
    });
}

function CardComp({ book }) {

  return (
    <CartStyle>
      <Card key={book.rentId}>
        {
          book.coverLargeUrl 
          ? <BookImg>
              <Card.Img variant="top" src={book.coverLargeUrl} />
            </BookImg>
          : <BookImg>
              <Card.Img variant="top" src={book.coverSmallUrl} />
            </BookImg>
        }
        <Card.Body>
          <Card.Title>{book.title}</Card.Title>
          <Card.Text>대여일 : {book.rentDate}</Card.Text>
          <Card.Text>반납일 : (D-계산값)</Card.Text>
          {
            book.state == true 
            ? <Button variant="outline-danger" onClick={() => returnFunc(book.rentId)}>
                반납하기
              </Button>
            : null
          }
        </Card.Body>
      </Card>
    </CartStyle>
  );
}

export default MyrentPage;
