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
          <MyList>{menu === 0 ? <AllUser /> : <AllRent />}</MyList>
        </Col>
      </Row>
    </div>
  );
}

export default Admin;

function AllUser(props) {
  let [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .post("/all")
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(users);
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
            <th>회원탈퇴</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user, i) => (
              <tr>
                <td>{user.id}</td>
                <td>{user.userId}</td>
                <td>{user.userName}</td>
                <td>{user.userEmail}</td>
                <td>
                  <Button variant="outline-info" size="sm">
                    초기화
                  </Button>
                </td>
                <td>
                  <Button variant="outline-danger" size="sm">
                    회원 탈퇴
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}

function AllRent(props) {
  let [rent, setRent] = useState([]);
  useEffect(() => {
    axios
      .post("/rent/infoall")
      .then((res) => {
        console.log(res);
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
            <th>반납상태</th>
            <th>#</th>
          </tr>
        </thead>
        <tbody>
          {rent &&
            rent.map((rent, i) => (
              <tr>
                <td>{rent.rentId}</td>
                <td>{rent.userId}</td>
                <td>{rent.title}</td>
                <td>{rent.rentDate}</td>
                <td>{rent.state == true ? "대여중" : "반납완료"}</td>
                <td>
                  {rent.state == true ? (
                    <Button variant="outline-info" size="sm">
                      반납하기
                    </Button>
                  ) : (
                    <Button variant="outline-success" size="sm">
                      대여하기
                    </Button>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}
