import React, { useState, useEffect } from "react";
import { Col, Row, ListGroup, Button, Table } from "react-bootstrap";
import styled from "styled-components";
import axios from "axios";

let MyMenu = styled.div`
  h4 {
    margin: 0;
    padding: 0.5rem;
  }
`;
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
  let [users, setUsers] = useState([]);

  useEffect(() => {
    axios.post("/all")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
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
            {
              menu === 0 
              ? <AllUser users={users} /> 
              : <AllRent />
            }
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
    <div>
      <h3>전체 회원관리</h3>
      <Table striped hover>
        <thead>
          <tr>
            <th>#</th>
            <th>UserId</th>
            <th>UserName</th>
            <th>UserEmail</th>
            <th>비밀번호 변경</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>props.users[0].id</td>
            <td>props.users[0].userId</td>
            <td>props.users[0].userName</td>
            <td>props.users[0].userEmail</td>
            <td>
              <Button variant="outline-info" size="sm">초기화</Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

function AllRent(props) {

  let [rent, setRent] = useState([]);

  useEffect(() => {
    axios.post("/rent/infoall")
      .then((res) => {
        setRent(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
       <h3>전체 대여관리</h3>
      <Table striped hover>
        <thead>
          <tr>
            <th>RentId</th>
            <th>UserId</th>
            <th>BookTitle</th>
            <th>RentDate</th>
            <th>Change</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>props.rent[0].rentId</td>
            <td>props.rent[0].userId</td>
            <td>props.rent[0].title</td>
            <td>props.rent[0].rentDate</td>
            <td>
              <Button variant="outline-info" size="sm">반납하기</Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
