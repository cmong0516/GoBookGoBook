import React, { useState, useEffect } from "react";
import { Button, Table, Modal } from "react-bootstrap";
import axios from "axios";

function AllUser() {
  let [users, setUsers] = useState([]);

  let [account, setAccount] = useState({
    userId: "",
    userEmail: "",
    userPw: "",
  });

  let onChangeFunc = (e) => {
    setAccount({
      ...account,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    axios
      .post("/all")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  let updateAjax = (user) => {
    axios
      .put("/mypage", {
        userId: user.userId,
        userPw: account.userPw,
        userEmail: account.userEmail,
      })
      .then((res) => {
        alert("개인정보 수정이 완료되었습니다.");
        console.log(res);
      })
      .catch((error) => {
        alert("개인정보 수정에 실패했습니다.");
        console.log(error);
      });
  };

  let deleteUser = (user) => {
    if (window.confirm(user.userName + "님을 탈퇴시키시겠습니까?")) {
      axios
        .delete("/delete", {
          data: { userId: user.userId },
        })
        .then((res) => {
          alert(user.userName + "님이 성공적으로 탈퇴되었습니다.");
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
      <Table>
        <thead>
          <tr>
            <th>No</th>
            <th>아이디</th>
            <th>이름</th>
            <th>이메일</th>
            <th>pw</th>
            <th>회원정보 변경</th>
            <th>회원삭제</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user, i) => (
              <tr>
                <td className="alluserid">{user.id}</td>
                <td>{user.userId}</td>
                <td>{user.userName}</td>
                <td>
                  <input
                    placeholder={user.userEmail}
                    name="userEmail"
                    onChange={onChangeFunc}
                  ></input>
                </td>
                <td>
                  <input
                    placeholder="PassWord"
                    name="userPw"
                    onChange={onChangeFunc}
                  ></input>
                </td>
                <td>
                  <Button
                    variant="outline-info"
                    size="sm"
                    onClick={() => updateAjax(user)}
                  >
                    EditUser
                  </Button>
                </td>
                <td>
                  {user.userId == "admin0" ? null : (
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => deleteUser(user)}
                      type="submit"
                    >
                      회원삭제
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

export default AllUser;
