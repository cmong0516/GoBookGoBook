import axios from "axios";
import React, {useEffect, useState} from "react";
import { Button } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import styled from 'styled-components';

let Signin = styled.span`
  font-size: 13pt;
  text-decoration: underline;
`;

let Alarm = styled.div`
    width: 100%;
    text-align: left;
    color: orangered;
    font-weight: bold;
    font-size: 13pt;
`

function Login() {

    let history = useHistory();
    let [alarm, setAlarm] = useState('')
    let [account, setAccount] = useState({
        id: '',
        password: ''
    })

    // 유효성체크
    // 영어/숫자 6-12자
    let idFormat = RegExp(/^[A-Za-z0-9]{6,12}$/);
    // 영어/숫자/특수문자 조합 9-20자
    let passwordFormat = RegExp(/^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[~`!@#$%\^&*()-+=])[A-Za-z0-9~`!@#$%\^&*()-+=]{9,20}$/);


    let onChangeFunc = (e) => {
        setAccount({
            ...account, [e.target.name]: e.target.value
        })
    }

    let submitFunc = (e) => {
        e.preventDefault();

        if (!account.id) { setAlarm('아이디가 입력되지 않았습니다.') }
        else if (!account.password) { setAlarm('비밀번호가 입력되지 않았습니다.') }
        // 유효성체크
        else if (!idFormat.test(account.id) || !passwordFormat.test(account.password)) {
            setAlarm('아이디 또는 비밀번호를 잘못 입력하셨습니다. 입력하신 내용을 다시 확인해주세요.')
        } else (
            alert("성공~")
            // axios.get('')
            // .then((res) => null)
        )
    }

    return (
        <div className="loginform">
            <form onSubmit={submitFunc}>
                <Alarm>{alarm}</Alarm>
                <div className="loginformtext">ID</div>
                <input
                    type="text"
                    name="id"
                    placeholder="아이디를 입력해주세요."
                    onChange={onChangeFunc}
                ></input>
                <div className="loginformtext">PassWord</div>
                <input
                    type="password"
                    name="password"
                    placeholder="비밀번호를 입력해주세요"
                    onChange={onChangeFunc}
                ></input>
                
                <div className="d-grid">
                    <Button variant="success" type="submit" size="lg">
                        로그인
                    </Button>
                </div>
                아이디가 없으신가요?&nbsp;&nbsp;&nbsp;
                <Signin><Link to="/signinpage">회원가입</Link></Signin>
            </form>
        </div>
    );
}

export default Login;
