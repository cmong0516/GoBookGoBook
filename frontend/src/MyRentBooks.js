import React from "react";
import { Card, Button } from "react-bootstrap";
import styled from "styled-components";

let CartStyle = styled.div`
  width: 18rem;
  margin-top: 1rem;
`;

function MyrentPage(props) {
  return (
    <CartStyle>
      <Card>
        <Card.Img variant="top" src="./" />
        <Card.Body>
          <Card.Title>도서명</Card.Title>
          <Card.Text>대여일 : </Card.Text>
          <Card.Text>반납일 : (D-계산값)</Card.Text>
          <Button variant="outline-danger">반납하기</Button>
        </Card.Body>
      </Card>
    </CartStyle>
  );
}

export default MyrentPage;
