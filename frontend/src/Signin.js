import React, {useState} from "react";
import { Button,Form } from "react-bootstrap";
import styled from 'styled-components';

let SigninForm = styled.div`

    width: 22rem;
    margin: auto;
    padding-bottom: 3rem;
    text-align: left;

    input, button {
        width: 100%;
        height: 3rem;
        // margin-bottom: 1rem;
    }
    button {
        margin-top: 1rem;
    }
    h3 {
        font-weight: bold;
    }
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

function Signin() {

    let [validated, setValidated] = useState(false);
    let [nameAlarm, setNameAlarm] = useState('');
    let [idAlarm, setIdAlarm] = useState('');
    // let [emailAlarm, setEmailAlarm] = useState('');
    let [pwAlarm, setPwAlarm] = useState('');
    let [pwMatchAlarm, setPwMatchAlarm] = useState('');
    let [account, setAccount] = useState({
        name: '',
        id: '',
        email: '',
        password: '',
        passwordCheck: ''
    })

    // 아이디 : 영어/숫자 6-12자
    let idFormat = RegExp(/^[A-Za-z0-9]{6,12}$/);
    // 비밀번호 : 영어/숫자/특수문자(각 최소 1개씩) 조합 9-20자
    let passwordFormat = RegExp(/^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[~`!@#$%\^&*()-+=])[A-Za-z0-9~`!@#$%\^&*()-+=]{9,20}$/);
    // 이름 : 한글 2자이상
    let nameFormat = RegExp(/^[가-힣]{2,}$/);

    // 이메일 유효성검사는 이미 input type="email"에서 검증되므로 불필요
    // 이메일 : (이메일아이디 영어/숫자 하나 이상) + @(필수) + (영어 하나이상) + .(특수문자이므로 \붙임) + (영어 하나이상)
    // let emailFormat = RegExp(/^[A-Za-z0-9]+@[A-Za-z]+\.[A-Za-z]+$/);

    let onChangeFunc = (e) => {
        setAccount({
            ...account, [e.target.name]: e.target.value
        })
    }

    let submitFunc = (e) => {
        e.preventDefault();
        let form = e.currentTarget;
        setNameAlarm('');
        setIdAlarm('');
        // setEmailAlarm('');
        setPwAlarm('');
        setPwMatchAlarm('');

        if (form.checkValidity() === false) {
            e.preventDefault();
            setValidated(true);
        } else if( !nameFormat.test(account.name) || !idFormat.test(account.id) || !passwordFormat.test(account.password) ) {
            // || !emailFormat.test(account.email) || !passwordFormat.test(account.password) ) {
            
            if( !nameFormat.test(account.name) )
                setNameAlarm('이름의 형식이 올바르지 않습니다.');
            if( !idFormat.test(account.id) ) 
                setIdAlarm('아이디의 형식이 올바르지 않습니다.');
            // if( !emailFormat.test(account.email) ) 
            //     setEmailAlarm('이메일의 형식이 올바르지 않습니다.');
            if( !passwordFormat.test(account.password) )
                setPwAlarm('비밀번호의 형식이 올바르지 않습니다.');

        } else if(account.password != account.passwordCheck) {
            setPwMatchAlarm('비밀번호가 일치하지 않습니다.');
        } else {
            alert('콘솔창 확인');
            console.log(account);
            // axios.get('')
            // .then((res) => null)
            
        }
        
    }

    return (
        <SigninForm>
            <div className="loginform">
                <Form noValidate validated={validated} onSubmit={submitFunc}>
                    <h3>회원가입</h3>

                    <GroupStyle>
                        <Form.Group>
                        <Form.Label>이름</Form.Label>
                            <Alarm>{nameAlarm}</Alarm>
                            <Form.Control
                                required
                                type="text"
                                name="name"
                                placeholder="ex) 홍길동"
                                onChange={onChangeFunc}
                            ></Form.Control>
                            <Form.Control.Feedback type="invalid">이름을 입력해주세요.</Form.Control.Feedback>
                        </Form.Group>
                    </GroupStyle>

                    <GroupStyle>
                        <Form.Group>
                            <Form.Label>아이디</Form.Label>
                            <Alarm>{idAlarm}</Alarm>
                            <Form.Control
                                required
                                type="text"
                                name="id"
                                placeholder="영어/숫자 포함 6-12자를 입력해주세요."
                                onChange={onChangeFunc}
                            ></Form.Control>
                            <Form.Control.Feedback type="invalid">아이디를 입력해주세요.</Form.Control.Feedback>
                        </Form.Group>
                    </GroupStyle>

                    <GroupStyle>
                        <Form.Group>
                            <Form.Label>이메일</Form.Label>
                            {/* <Alarm>{emailAlarm}</Alarm> */}
                            <Form.Control
                                required
                                type="email"
                                name="email"
                                placeholder="ex) GoBook@naver.com"
                                onChange={onChangeFunc}
                            ></Form.Control>
                            <Form.Control.Feedback type="invalid">이메일을 입력해주세요.</Form.Control.Feedback>
                        </Form.Group>
                    </GroupStyle>
                    
                    <GroupStyle>
                        <Form.Group>
                            <Form.Label>비밀번호</Form.Label>
                            <Alarm>{pwAlarm}</Alarm>
                            <Form.Control
                                required
                                type="password"
                                name="password"
                                placeholder="영어/숫자/특수문자 포함 9-20자를 입력해주세요."
                                onChange={onChangeFunc}
                            ></Form.Control>
                            <Form.Control.Feedback type="invalid">비밀번호를 입력해주세요.</Form.Control.Feedback>
                        </Form.Group>
                    </GroupStyle>

                    <GroupStyle>
                        <Form.Group>
                            <Form.Label>비밀번호 확인</Form.Label>
                            <Alarm>{pwMatchAlarm}</Alarm>
                            <Form.Control
                                required
                                type="password"
                                name="passwordCheck"
                                placeholder="확인을 위해 비밀번호를 한번 더 입력해주세요."
                                onChange={onChangeFunc}
                            ></Form.Control>
                            <Form.Control.Feedback type="invalid">비밀번호 확인을 입력해주세요.</Form.Control.Feedback>
                        </Form.Group>
                    </GroupStyle>

                    <Button variant="primary" type="submit">
                        회원가입하기
                    </Button>
                </Form>
                
            </div>
        </SigninForm>
    );
}

export default Signin;