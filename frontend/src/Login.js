import React from "react";
import { Button } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import styled from 'styled-components';

let ButtonWrapper = styled.div`
    width: 100%;
`
let Signin = styled.span`
  font-size: 13pt;
  text-decoration: underline;
`;

function Login() {

    let history = useHistory();

    return (
        <div className="loginform">
            <form>
                <div>
                    <div>
                        <div className="loginformtext">ID</div>
                        <input
                            type="text"
                            name="userId"
                            placeholder="아이디를 입력해주세요."
                        ></input>
                    </div>
                    <div>
                        <div className="loginformtext">PassWord</div>
                        <input
                            type="password"
                            name="userPw"
                            placeholder="비밀번호를 입력해주세요"
                        ></input>
                    </div>
                </div>
                
                <div className="d-grid">
                    <Button variant="primary" type="submit" size="lg">
                        Login
                    </Button>
                </div>
                아이디가 없으신가요?&nbsp;&nbsp;&nbsp;
                <Signin><Link to="/signinpage">회원가입</Link></Signin>
            </form>
        </div>
    );
}

export default Login;
