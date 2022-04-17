import React, {useState} from "react";
import MyRent from "./MyRent";
import MyInfo from "./MyInfo.js"
import { Col, Row, ListGroup } from "react-bootstrap";

function Mypage() {
  
  let [menu, setMenu] = useState(0);

  return (
    <div>
        <Row>
          <Col sm={3}>
            <ListGroup>
              <ListGroup.Item variant="primary"><h4>마이페이지</h4></ListGroup.Item>
              <ListGroup.Item action variant="light" onClick={() => setMenu(0)}>
                나의 대여 관리
              </ListGroup.Item>
              <ListGroup.Item action variant="light" onClick={() => setMenu(1)}>
                개인정보 수정
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col sm={9}>
              <h2>...님, 반가워요!</h2>
              {
                menu == 0 
                ? <MyRent/>
                : <MyInfo/>
              }
          </Col>
        </Row>
    </div>
  );
}

export default Mypage;
