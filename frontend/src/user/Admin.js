import React, { useState } from "react";
import { Col, Row, ListGroup } from "react-bootstrap";
import styled from "styled-components";
import AllUser from "./AllUser.js";
import AllRent from "./AllRent.js";

let MyList = styled.div`
  padding-left: 3rem;
  border-left: dashed 2px Silver;

  h3 {
    text-align: left;
    margin-bottom: 1rem;
  }
`;

function Admin() {
  let [menu, setMenu] = useState(0);

  return (
    <div>
      <Row>
        <Col sm={3}>
            <h4>관리자페이지</h4>
            <ListGroup.Item action variant="light" onClick={() => setMenu(0)}>
              전체 회원 관리
            </ListGroup.Item>
            <ListGroup.Item action variant="light" onClick={() => setMenu(1)}>
              전체 대여 관리
            </ListGroup.Item>
        </Col>
        <Col sm={9}>
          <MyList>{menu === 0 ? <AllUser /> : <AllRent />}</MyList>
        </Col>
      </Row>
    </div>
  );
}

export default Admin;