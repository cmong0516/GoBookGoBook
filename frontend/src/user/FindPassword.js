import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button, Modal } from "react-bootstrap";
import styled from 'styled-components';
import axios from "axios";

let Wrapper = styled.div`
    width: 22rem;
    margin: auto;

    h5 { margin: 1.5vh 0 }

    p { color: gray }
`

function FindPassword() {

    let history = useHistory();
    let [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);
    let [userEmail, setUserEmail] = useState('')
    let [code, setCode] = useState(0)

    const handleClose = () => setShow(false);

    // 이메일 전송
    let submitFunc = (e) => {
        e.preventDefault();
        let form = e.currentTarget;

        if (form.checkValidity() === false) {
            e.preventDefault();
            setValidated(true);
        } else {
            axios.post('/findpw', {
                userEmail: userEmail
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

    // 이메일 보낸 후 인증번호 확인 
    let checkCode = () => {
        axios.post('/findpw/code', {
                userEmail: userEmail,
            })
            .then(res => {
                if (res.data) {
                    alert('회원님의 임시 비밀번호는 gobook777! 입니다. 로그인 후 변경해주세요.');
                    history.push("/login");
                } else if (!code) {
                    alert('인증번호를 입력해주세요.');
                } else {
                    alert('인증번호가 올바르지 않습니다. 다시 확인해주세요.')
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
                <Form.Group style={{ margin: '1rem 0'}}>
                    <Form.Label>이메일</Form.Label>
                    <Form.Control
                        required
                        type="email"
                        name="userEmail"
                        placeholder="ex) GoBook@naver.com"
                        onChange={(e) => { setUserEmail(e.target.value) }}
                    ></Form.Control>
                    <Form.Control.Feedback type="invalid">이메일을 입력해주세요.</Form.Control.Feedback>
                </Form.Group>

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
                                onChange={(e) => { setCode(e.target.value) }}
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
