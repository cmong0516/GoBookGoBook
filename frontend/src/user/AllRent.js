import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import axios from "axios";
import styled from "styled-components";

let Styledth1 = styled.td`
  width: 4vw;
`
let Styledth2 = styled.td`
  width: 6vw;
`

function AllRent() {

  let [rent, setRent] = useState([]);

  // 반납 시 리스트 리렌더링을 위한 state
  let [stateCheck, setStateCheck] = useState(false);

  useEffect(() => {
    axios.post("/rent/infoall")
      .then((res) => {
        setRent(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [stateCheck]);

  let returnFunc = (rentId) => {

    axios.post("/rent/return", {
      rentId: rentId,
    })
      .then(() => {
        alert("반납하셨습니다.");
        setStateCheck(!stateCheck);
      })
      .catch((error) => {
        alert("반납 서버와의 통신에 실패했습니다.")
        console.log(error);
      });
  }

  return (
    <div>
      <h3>전체 대여관리</h3>
      <Table hover style={{ borderSpacing: '7px', borderCollapse: 'separate' }}>
        <thead>
          <tr>
            <th>No</th>
            <th>아이디</th>
            <th>도서명</th>
            <th>대여일</th>
            <th>상태</th>
            <th>대여/반납</th>
          </tr>
        </thead>
        <tbody>
          {rent && rent.slice(0).reverse().map((rent, i) => (
            <tr>
              <Styledth1>{rent.rentId}</Styledth1>
              <Styledth1>{rent.userId}</Styledth1>
              <td>{rent.title}</td>
              <Styledth2>{rent.rentDate}</Styledth2>
              <Styledth2>{rent.state == true ? "대여중" : "반납완료"}</Styledth2>
              <Styledth2>
                {
                  rent.state == true
                    ? <Button variant="outline-info" size="sm" onClick={() => returnFunc(rent.rentId)}>
                      반납하기
                    </Button>
                    : null
                }
              </Styledth2>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default AllRent;