import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import styled from "styled-components";
import axios from "axios";

let InfoForm = styled.div`
  width: 80%;
  padding-bottom: 3rem;

  input,
  button {
    height: 3rem;
    // margin-bottom: 1rem;
  }
  button {
    width: 30%;
    margin-top: 1rem;
    margin-right: 1rem;
  }
`;
let GroupStyle = styled.div`
  margin: 1rem 0;
`;
let Alarm = styled.div`
  width: 100%;
  text-align: left;
  color: red;
  font-weight: bold;
`;

function MyInfo(props) {
  let history = useHistory();

  let myuserName = localStorage.getItem("userName");
  let myuserId = localStorage.getItem("userId");
  let myuserEmail = localStorage.getItem("userEmail");

  let [alarm, setAlarm] = useState("");
  let [emailAlarm, setEmailAlarm] = useState("");
  let [pwAlarm, setPwAlarm] = useState("");
  let [pwMatchAlarm, setPwMatchAlarm] = useState("");
  let [account, setAccount] = useState({
    userId: "",
    userEmail: "",
    userPw: "",
    userpwCheck: "",
  });

  // 이메일 : (이메일아이디 영어/숫자 하나 이상) + @(필수) + (영어 하나이상) + .(특수문자이므로 \붙임) + (영어 하나이상)
  let emailFormat = RegExp(/^[A-Za-z0-9]+@[A-Za-z]+\.[A-Za-z]+$/);
  // 비밀번호 : 영어/숫자/특수문자(각 최소 1개씩) 조합 9-20자
  let passwordFormat = RegExp(
    /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[~`!@#$%\^&*()-+=])[A-Za-z0-9~`!@#$%\^&*()-+=]{9,20}$/
  );

  let onChangeFunc = (e) => {
    setAccount({
      ...account,
      [e.target.name]: e.target.value,
    });
  };

  let editUser = (e) => {
    // e.preventDefault();
    let form = e.currentTarget;

    setAlarm("");
    setEmailAlarm("");
    setPwAlarm("");
    setPwMatchAlarm("");

    // 둘 다 작성하지 않는 경우
    if (!account.userEmail && !account.userPw) {
      setAlarm("수정하실 정보를 작성해주세요.");
    }
    // 이메일만 작성하는 경우
    if (account.userEmail && !account.userPw) {
      // 형식확인
      if (!emailFormat.test(account.userEmail)) {
        setEmailAlarm("이메일의 형식이 올바르지 않습니다.");
      } else {
        updateAjax();
      }
    }
    // 비밀번호만 작성하는 경우
    if (!account.userEmail && account.userPw) {
      // 형식확인
      if (!passwordFormat.test(account.userPw)) {
        setPwAlarm("비밀번호의 형식이 올바르지 않습니다.");
        // 비밀번호 확인란과 일치여부
      } else if (account.userPw != account.userpwCheck) {
        setPwMatchAlarm("비밀번호가 일치하지 않습니다.");
      } else {
        updateAjax();
      }
    }
    // 둘 다 작성한 경우
    if (account.userEmail && account.userPw) {
      // 이메일 형식확인
      if (!emailFormat.test(account.userEmail)) {
        setEmailAlarm("이메일의 형식이 올바르지 않습니다.");
      }
      // 비밀번호 형식확인
      // 이메일, 비밀번호 둘 다 형식에 맞지 않는 경우를 위해 if문을 따로 작성
      if (!passwordFormat.test(account.userPw)) {
        setPwAlarm("비밀번호의 형식이 올바르지 않습니다.");
        // 비밀번호 확인란과 일치여부
      } else if (account.userPw != account.userpwCheck) {
        setPwMatchAlarm("비밀번호가 일치하지 않습니다.");
        // 비밀번호 형식/확인란 맞은 상태에서 이메일형식까지 맞으면 결과 넘어감
      } else if (emailFormat.test(account.userEmail)) {
        updateAjax();
      }
    }
  };

  let updateAjax = () => {
    axios
      .put("/mypage", {
        userId: myuserId,
        userPw: account.userPw,
        userEmail: account.userEmail,
      })
      .then((res) => {
        alert("개인정보 수정이 완료되었습니다.");
        localStorage.setItem("userEmail", account.userEmail);
        history.push("/");
        console.log(res);
      })
      .catch((error) => {
        alert("개인정보 수정에 실패했습니다.");
        console.log(error);
      });
  };

  let deleteUser = () => {
    console.log(myuserId)
    if(window.confirm('정말로... 탈퇴하실건가요?')) {
      axios.delete("/delete", {
        data:{userId: myuserId}
      },)
        .then((res) => {
          console.log(res);
          localStorage.clear();
          alert("탈퇴에 성공하셨습니다🙂");
          history.push("/goodbye");
        })
        .catch((error) => {
          alert("회원 탈퇴에 실패하셨습니다.");
          console.log(error);
        });
    } else {
      return false;
    }
    
  };

  return (
    <div>
      <h2>개인정보 수정</h2>
      <p>고객님의 정보를 정확히 입력해주세요.</p>
      <Alarm>{alarm}</Alarm>
      <InfoForm>
        <Form noValidate onSubmit={editUser}>
          <GroupStyle>
            <Form.Group>
              <Form.Label>이름</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder={myuserName}
                onChange={onChangeFunc}
                disabled
                readOnly
              ></Form.Control>
            </Form.Group>
          </GroupStyle>

          <GroupStyle>
            <Form.Group>
              <Form.Label>아이디</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder={myuserId}
                onChange={onChangeFunc}
                disabled
                readOnly
              ></Form.Control>
            </Form.Group>
          </GroupStyle>

          <GroupStyle>
            <Form.Group>
              <Form.Label>이메일</Form.Label>
              <Alarm>{emailAlarm}</Alarm>
              <Form.Control
                required
                type="email"
                name="userEmail"
                placeholder={myuserEmail}
                onChange={onChangeFunc}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                이메일을 입력해주세요.
              </Form.Control.Feedback>
            </Form.Group>
          </GroupStyle>

          <GroupStyle>
            <Form.Group>
              <Form.Label>비밀번호</Form.Label>
              <Alarm>{pwAlarm}</Alarm>
              <Form.Control
                required
                type="password"
                name="userPw"
                placeholder="영어/숫자/특수문자 포함 9-20자를 입력해주세요."
                onChange={onChangeFunc}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                비밀번호를 입력해주세요.
              </Form.Control.Feedback>
            </Form.Group>
          </GroupStyle>

          <GroupStyle>
            <Form.Group>
              <Form.Label>비밀번호 확인</Form.Label>
              <Alarm>{pwMatchAlarm}</Alarm>
              <Form.Control
                required
                type="password"
                name="userpwCheck"
                placeholder="확인을 위해 비밀번호를 한번 더 입력해주세요."
                onChange={onChangeFunc}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                비밀번호 확인을 입력해주세요.
              </Form.Control.Feedback>
            </Form.Group>
          </GroupStyle>

          <Button
            variant="primary"
            type="button"
            onClick={() => editUser(myuserId)}
          >
            수정
          </Button>
          <Button
            variant="outline-warning"
            type="button"
            onClick={() => props.setMenu(0)}
          >
            취소
          </Button>
          <Button
            variant="outline-danger"
            type="button"
            onClick={() => deleteUser(myuserId)}
          >
            회원 탈퇴
          </Button>
        </Form>
      </InfoForm>
    </div>
  );
}

export default MyInfo;
