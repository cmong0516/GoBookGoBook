import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function Editprofile() {
  return (
    <div className="editprofile">
      <div className="mypage">
        <Container>
          <Row>
            <Col sm={3} className="side">
              <div>
                <h1>My Page</h1>
              </div>
              <Link to="/myrentlist">
                <div>나의 대여 관리</div>
              </Link>
              <Link to="/editprofile">
                <div>개인정보 수정</div>
              </Link>
            </Col>
            <Col sm={8}>
              <h1>회원 정보 수정 페이지</h1>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Editprofile;
