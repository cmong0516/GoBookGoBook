import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import axios from "axios";

function AllUser() {

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

    let deleteUser = (user) => {

      if(window.confirm(user.userName +'님을 탈퇴시키시겠습니까?')) {
        axios.delete("/delete", {
            data: { userId: user.userId }
          },)
          .then((res) => {
            alert(user.userName + '님이 성공적으로 탈퇴되었습니다.');
          })
          .catch((error) => {
            alert(user.userName + "님의 회원 탈퇴에 실패하셨습니다.");
            console.log(error);
          });
      } else {
        return false;
      }
    };

    return (
      <div>
        <h3>전체 회원관리</h3>
        <Table hover>
          <thead>
            <tr>
              <th>회원번호</th>
              <th>아이디</th>
              <th>이름</th>
              <th>이메일</th>
              <th>비밀번호 변경</th>
              <th>회원삭제</th>
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
                    {
                      user.userId == 'admin0'
                        ? null
                        : <Button variant="outline-danger" size="sm" onClick={() => deleteUser(user)}>
                          회원삭제
                        </Button>
                    }
               
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    );
}

export default AllUser;