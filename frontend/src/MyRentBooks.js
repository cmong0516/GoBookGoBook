import React from "react";
import { Card, Button } from "react-bootstrap";

function MyrentPage() {
  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src="./"/>
        <Card.Body>
          <Card.Title>책이름</Card.Title>
          <Card.Text>저자</Card.Text>
          <Card.Text>대여일</Card.Text>
          <Card.Text>잔여대여일</Card.Text>
          <Button variant="outline-danger">반납하기</Button>
        </Card.Body>
      </Card>
    </div>
  )
}

export default MyrentPage;
