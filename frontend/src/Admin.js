import React, { useState, useEffect } from "react";
import { Col, Row, ListGroup, Button } from "react-bootstrap";
import styled from "styled-components";
import axios from "axios";

let MyMenu = styled.div`
  h4 {
    margin: 0;
    padding: 0.5rem;
  }
`;
let MyList = styled.div`
  text-align: left;
  padding-left: 3rem;
  border-left: dashed 2px Silver;

  h2 {
    margin-bottom: 1rem;
  }
`;
function Admin() {
  let [menu, setMenu] = useState(0);
  let [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .post("/all")
      .then((res) => {
        setUsers(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="adminPage">
      <Row>
        <Col sm={3}>
          <MyMenu>
            <h4>관리자페이지</h4>
            <ListGroup.Item action variant="light" onClick={() => setMenu(0)}>
              전체 회원 관리
            </ListGroup.Item>
            <ListGroup.Item action variant="light" onClick={() => setMenu(1)}>
              전체 대여 관리
            </ListGroup.Item>
          </MyMenu>
        </Col>
        <Col sm={9}>
          <MyList>
            {menu === 0 ? <AllUser users={users.data} /> : <AllRent />}
          </MyList>
        </Col>
      </Row>
    </div>
  );
}

export default Admin;

function AllUser(props) {
  console.log(props.users);
  return (
    <div className="allUser">
      <table>
        <thead>
          <th>#</th>
          <th>UserId</th>
          <th>UserName</th>
          <th>UserEmail</th>
          <th>비밀번호 변경</th>
        </thead>
        <tbody>
          <td>props.users[0].id</td>
          <td>props.users[0].userId</td>
          <td>props.users[0].userName</td>
          <td>props.users[0].userEmail</td>
          <td className="adminButton">
            {" "}
            <Button variant="outline-info">초기화</Button>
          </td>
        </tbody>
      </table>
    </div>
  );
}

function AllRent(props) {
  let [rent, setRent] = useState([]);
  useEffect(() => {
    axios
      .post("/rent/infoall")
      .then((res) => {
        setRent(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="allRent">
      <table>
        <thead>
          <th>RentId</th>
          <th>UserId</th>
          <th>BookTitle</th>
          <th>RentDate</th>
          <th>Change</th>
        </thead>
        <tbody>
          <td>props.rent[0].rentId</td>
          <td>props.rent[0].userId</td>
          <td>props.rent[0].title</td>
          <td>props.rent[0].rentDate</td>
          <td className="adminButton">
            <Button variant="outline-info">반납하기</Button>
          </td>
        </tbody>
      </table>
    </div>
  );
}
