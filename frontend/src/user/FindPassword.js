import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button, Modal } from "react-bootstrap";
import styled from 'styled-components';
import axios from "axios";

let Wrapper = styled.div`
    width: 22rem;
    margin: auto;

    h5 {
        margin: 1.5vh 0;
    }

    p {
        color: gray;
    }

`
let GroupStyle = styled.div`
    margin: 1rem 0;
`

function FindPassword() {

    // 로그인하지 않은 경우 url입력 시 출입불가
    let history = useHistory();
    let [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);
    let [user, setUser] = useState({
        userEmail: '',
        code: ''
    })

    let onChangeFunc = (e) => {
        setUser({
            ...user, [e.target.name]: e.target.value
        })
    }
    const handleClose = () => setShow(false);

    let submitFunc = (e) => {
        e.preventDefault();
        let form = e.currentTarget;

        if (form.checkValidity() === false) {
            e.preventDefault();
            setValidated(true);
        } else {
            axios.post('/findpw', {
                userEmail: user.userEmail
            })
                .then(res => {
                    if (res.data) {
                        alert('비밀번호 변경 메일을 보냈습니다📨');
                        setShow(true);
                    } else {
                        console.log(res.data.code)
                        alert('회원정보에 등록된 이메일이 아닙니다😰');
                        history.push("/signin");
                    }
                })
                .catch(error => {
                    alert('통신실패! 에러명 : ' + error);
                    console.log(error);
                });
        }

    }

    let checkCode = () => {
        axios.post('/findpw/code', {
                userEmail: user.userEmail,
                code: user.code
            })
            .then(res => {
                if (res.data == '인증번호 불일치') {
                    alert(res.data);
                } else {
                    alert('회원님의 임시 비밀번호는 ' + res.data + ' 입니다. 로그인 후 변경해주세요.');
                    history.push("/login");
                }
            })
            .catch(error => {
                alert('통신실패! 에러명 : ' + error);
                console.log(error);
            });
    }

    return (
        <Wrapper>
            <Form noValidate validated={validated} onSubmit={submitFunc}>
                <h3>비밀번호 찾기</h3>
                <h5>비밀번호를 잊으셨나요?</h5>
                <p>가입했던 이메일을 적어주세요.<br />
                    입력하신 이메일 주소로 비밀번호 변경 메일을 보낼게요.</p>
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
                    비밀번호 변경 이메일 보내기
                </Button>
            </Form>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>비밀번호 재설정 알림</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>메일함에서 확인하신 인증번호를 입력해주세요.</Form.Label>
                            <Form.Control
                                name="code"
                                autoFocus
                                onChange={onChangeFunc}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        닫기
                    </Button>
                    <Button variant="primary" onClick={checkCode}>
                        인증번호 확인
                    </Button>
                </Modal.Footer>
            </Modal>
        </Wrapper>
    );
}

export default FindPassword;
