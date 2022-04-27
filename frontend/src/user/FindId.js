import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button, Modal } from "react-bootstrap";
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

    let history = useHistory();
    let [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);
    let [nameAlarm, setNameAlarm] = useState('');
    let [account, setAccount] = useState({
        userName: '',
        userEmail: '',
    });
    let [userid, setUserid] = useState('');

    // 이름 : 한글 2자이상
    let nameFormat = RegExp(/^[가-힣]{2,}$/);

    const handleClose = () => setShow(false);

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
                    if (res.data == '유효하지 않은 이메일입니다.' || res.data == '회원을 찾을 수 없습니다.') {
                        alert('아이디를 찾을 수 없습니다. 입력하신 이름과 이메일을 다시 확인해주세요😵');
                    } else {
                        setUserid(res.data);
                        setShow(true);
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

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>아이디 알림</Modal.Title>
                </Modal.Header>
                <Modal.Body>회원님의 아이디는 {userid}입니다.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        닫기
                    </Button>
                    <Button variant="primary" onClick={() => history.push("/login")}>
                        로그인 하러가기
                    </Button>
                </Modal.Footer>
            </Modal>
        </Wrapper>
    );
}

export default FindId;
