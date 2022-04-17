import React, {useState} from "react";
import MyRent from "./MyRent";
import MyInfo from "./MyInfo.js"
import { Col, Row, ListGroup } from "react-bootstrap";
import styled from 'styled-components';

let MyList = styled.div`
  text-align: left;
  margin-left: 3rem;

  h2 {
    margin-bottom: 1rem;
  }
`

function Mypage() {
  
  let [menu, setMenu] = useState(0);

  return (
    <Row>
      <Col sm={3}>
          <ListGroup.Item variant="primary"><h4>마이페이지</h4></ListGroup.Item>
          <ListGroup.Item action variant="light" onClick={() => setMenu(0)}>
            나의 대여 관리
          </ListGroup.Item>
          <ListGroup.Item action variant="light" onClick={() => setMenu(1)}>
            개인정보 수정
          </ListGroup.Item>
      </Col>

      <Col sm={9}>
        <MyList>
          <h2>홍길동님, 반가워요!</h2>
          {
            menu == 0 
            ? <MyRent/>
            : <MyInfo/>
          }
          </MyList>
      </Col>
     
    </Row>
  );
}

export default Mypage;
