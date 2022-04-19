import axios from "axios";
import React, {useState} from "react";
import { Button } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import styled from 'styled-components';

let LoginForm = styled.div`
    width: 22rem;
    margin: auto;
    padding-bottom: 3rem;

    input, button {
        width: 100%;
        height: 3rem;
        margin-bottom: 1rem;
    }
    input {
        border: solid 1px lightgrey;
        border-radius: 4px;
        padding: 0.7rem;
    }
    h3 {
        font-weight: bold;
        text-align: left;
    }
    p {
        text-align: left;
    }
`
let Signin = styled.span`
  font-size: 13pt;
  text-decoration: underline;
`
let Alarm = styled.div`
    width: 100%;
    text-align: left;
    color: red;
    font-weight: bold;
    font-size: 13pt;
   
`

function Login() {

    let history = useHistory();

    let [alarm, setAlarm] = useState('')
    let [account, setAccount] = useState({
        userId: '',
        userPw: ''
    })

    // 아이디 : 영어/숫자 6-12자
    let idFormat = RegExp(/^[A-Za-z0-9]{6,12}$/);
    // 비밀번호 : 영어/숫자/특수문자(각 최소 1개씩) 조합 9-20자
    let passwordFormat = RegExp(/^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[~`!@#$%\^&*()-+=])[A-Za-z0-9~`!@#$%\^&*()-+=]{9,20}$/);

    let onChangeFunc = (e) => {
        setAccount({
            ...account, [e.target.name]: e.target.value
        })
    }

    let submitFunc = (e) => {
        e.preventDefault();

        if (!account.userId) { setAlarm('아이디가 입력되지 않았습니다.') }
        else if (!account.userPw) { setAlarm('비밀번호가 입력되지 않았습니다.') }
        else if (!idFormat.test(account.userId) || !passwordFormat.test(account.userPw)) {
            setAlarm('아이디 또는 비밀번호를 잘못 입력하셨습니다. 입력하신 내용을 다시 확인해주세요.')
        } else {
            alert('콘솔창 확인');
            console.log(account);
            
            axios.post('/login', {
                    userId:account.userId,
                    userPw:account.userPw
                })
            .then(res => {
                // 
                console.log(res)
                if(res.success === true) {
                    alert('로그인되었습니다🐢');
                    // response로 회원정보 전체(이름,아이디,이메일,비밀번호)가 들어와야 localStorage에 회원정보 모두 저장가능?
                    // 어짜피 갖고있는 회원정보는 대여에만 쓰이므로 이름, 아이디만 가져와도 되는거?
                    localStorage.setItem('userInfo', JSON.stringify(res));
                    history.push("/");
                } else {
                    setAlarm('아이디 또는 비밀번호를 잘못 입력하셨습니다.')
                }
            })
            .catch(error => {
                alert('통신실패! 에러명 : ' + error);
            });
        }
    }

    return (
        <LoginForm>
            <form onSubmit={submitFunc}>
                <h3>로그인</h3>
                <p>Go Book Go Book의 다양한 서비스를 누리세요!</p>
                <Alarm>{alarm}</Alarm>
                <input
                    type="text"
                    name="userId"
                    placeholder="아이디를 입력해주세요."
                    onChange={onChangeFunc}
                ></input>
                <input
                    type="password"
                    name="userPw"
                    placeholder="비밀번호를 입력해주세요."
                    onChange={onChangeFunc}
                ></input>
                
                <Button variant="primary" type="submit" size="lg">로그인</Button>
                아이디가 없으신가요?&nbsp;&nbsp;&nbsp;
                <Signin><Link to="/signin">회원가입</Link></Signin>
            </form>
        </LoginForm>
    );
}

export default Login;
