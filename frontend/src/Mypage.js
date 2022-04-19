import React, {useState} from "react";
import MyRent from "./MyRent";
import MyInfo from "./MyInfo.js"
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

  return (
    <Row>
      <Col sm={3}>
      <MyMenu>
          <h4>마이페이지</h4>
          <ListGroup.Item action variant="light" onClick={() => setMenu(0)}>
            나의 대여 관리
          </ListGroup.Item>
          <ListGroup.Item action variant="light" onClick={() => setMenu(1)}>
            개인정보 수정
          </ListGroup.Item>
        </MyMenu>
      </Col>

      <Col sm={9}>
        <MyList>
          
          {
            menu === 0 
            ? <MyRent/>
            : <MyInfo setMenu={setMenu}/>
          }
        </MyList>
      </Col>
     
    </Row>
  );
}

export default Mypage;
