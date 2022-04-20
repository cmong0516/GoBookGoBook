import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import styled from "styled-components";

let CartStyle = styled.div`
  width: 300px;
  margin-top: 1rem;
`;
let BookImg = styled.span`
`

function MyrentPage(props) {

  console.log(props.rentBooks)
  return (
    <Row>  
    {
      props.rentBooks && props.rentBooks.map(book => (
          <CardComp book={book}/>
      ))
    }
    </Row>
  );
}

function CardComp({book}) {
  return (
    <CartStyle>
      <Card key={book.rentId}>
        {
          book.coverLargeUrl
          ? <BookImg><Card.Img variant="top" src={book.coverLargeUrl} /></BookImg>
          : <BookImg><Card.Img variant="top" src={book.coverSmallUrl} /></BookImg>
        }
        <Card.Body>
          <Card.Title>{book.title}</Card.Title>
          <Card.Text>대여일 : {book.rentDate}</Card.Text>
          <Card.Text>반납일 : (D-계산값)</Card.Text>
          <Button variant="outline-danger">반납하기</Button>
        </Card.Body>
      </Card>
    </CartStyle>
  )
}

export default MyrentPage;
