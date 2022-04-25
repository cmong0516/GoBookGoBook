import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import MyRent from "./MyRent.js";
import MyReview from "./MyReview.js";
import MyInfo from "./MyInfo.js";
import { Col, Row, ListGroup } from "react-bootstrap";
import styled from 'styled-components';

let MyMenu = styled.div`
  h4 {
    margin: 0;
    padding: 0.5rem; 
  }
`
let MyList = styled.div`
  text-align: left;
  padding-left: 3rem;
  border-left: dashed 2px Silver;

  h2 {
    margin-bottom: 1rem;
  }
`

function Mypage() {
  
  let [menu, setMenu] = useState(0);

  // 로그인하지 않은 경우 url입력 시 출입불가
  let history = useHistory();
  let userId = localStorage.getItem('userId');

  return (
    <Row>
      {
        !userId
          ? history.push("/login")
          : null
      }
      <Col sm={3}>
      <MyMenu>
          <h4>마이페이지</h4>
          <ListGroup.Item action variant="light" onClick={() => setMenu(0)}>
            나의 대여 관리
          </ListGroup.Item>
          <ListGroup.Item action variant="light" onClick={() => setMenu(1)}>
            나의 리뷰 관리
          </ListGroup.Item>
          <ListGroup.Item action variant="light" onClick={() => setMenu(2)}>
            개인정보 수정
          </ListGroup.Item>
        </MyMenu>
      </Col>

      <Col sm={9}>
        <MyList>
          {
            {
              0: <MyRent />,
              1: <MyReview />,
              2: <MyInfo setMenu={setMenu} />
            } [menu]
          }
        </MyList>
      </Col>
     
    </Row>
  );
}

export default Mypage;
