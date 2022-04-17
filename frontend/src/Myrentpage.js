import React from "react";
import { Card, Button } from "react-bootstrap";

function MyrentPage() {
  return (
    <div className="Myrentpage">
      <RentCard />
    </div>
  );
}

function RentCard() {
  return (
    <div className="rentcard">
      <Card style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReIJDl-BNU7poDMxewQcEWm7ZLBeoxSfvVlQ&usqp=CAU"
        />
        <Card.Body>
          <Card.Title>책이름</Card.Title>
          <Card.Text>저자</Card.Text>
          <Card.Text>대여일</Card.Text>
          <Card.Text>잔여대여일</Card.Text>
          <div className="rentbutton">
            <Button variant="outline-danger">반납하기</Button>
          </div>
        </Card.Body>
      </Card>
      <h1>이거 데이터 받아서 맵돌리면 좋을거같습니다. 가로로 착착!</h1>
    </div>
  );
}

export default MyrentPage;
