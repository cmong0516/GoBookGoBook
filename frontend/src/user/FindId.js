import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import styled from 'styled-components';
import axios from "axios";

let Wrapper = styled.div`
    width: 22rem;
    margin: auto;
`
let GroupStyle = styled.div`
    margin: 1rem 0;
`
let Alarm = styled.div`
    width: 100%;
    text-align: left;
    color: red;
    font-weight: bold;   
`

function FindId() {

    // 로그인하지 않은 경우 url입력 시 출입불가
    let history = useHistory();
    let [validated, setValidated] = useState(false);
    let [nameAlarm, setNameAlarm] = useState('');
    let [account, setAccount] = useState({
        userId: "",
        userPw: "",
    });

    // 이름 : 한글 2자이상
    let nameFormat = RegExp(/^[가-힣]{2,}$/);

    let onChangeFunc = (e) => {
        setAccount({
            ...account, [e.target.name]: e.target.value
        })
    }

    let submitFunc = (e) => {
        e.preventDefault();
        let form = e.currentTarget;
        setNameAlarm('');

        if (form.checkValidity() === false) {
            e.preventDefault();
            setValidated(true);
        } else if (!nameFormat.test(account.userName))
            setNameAlarm('이름의 형식이 올바르지 않습니다.');
        else {
            axios.post('/findid', {
                userName: account.userName,
                userEmail: account.userEmail
            })
                .then(res => {
                    if (res.data) {
                        alert('아이디는 ~ 입니다😇');
                        history.push("/login");
                    } else {
                        console.log(res.data.code)
                        alert('아이디를 찾을 수 없습니다😰');
                        history.push("/signin");
                    }
                })
                .catch(error => {
                    alert('통신실패! 에러명 : ' + error);
                    console.log(error);
                });
        }

    }

    return (
        <Wrapper>
            <Form noValidate validated={validated} onSubmit={submitFunc}>
                <h3>아이디 찾기</h3>

                <GroupStyle>
                    <Form.Group>
                        <Form.Label>이름</Form.Label>
                        <Alarm>{nameAlarm}</Alarm>
                        <Form.Control
                            required
                            type="text"
                            name="userName"
                            placeholder="ex) 홍길동"
                            onChange={onChangeFunc}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">이름을 입력해주세요.</Form.Control.Feedback>
                    </Form.Group>
                </GroupStyle>

                <GroupStyle>
                    <Form.Group>
                        <Form.Label>이메일</Form.Label>
                        {/* <Alarm>{emailAlarm}</Alarm> */}
                        <Form.Control
                            required
                            type="email"
                            name="userEmail"
                            placeholder="ex) GoBook@naver.com"
                            onChange={onChangeFunc}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">이메일을 입력해주세요.</Form.Control.Feedback>
                    </Form.Group>
                </GroupStyle>

                <Button variant="info" type="submit">
                    아이디찾기
                </Button>
            </Form>
        </Wrapper>
    );
}

export default FindId;
