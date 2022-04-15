import React from "react";
import { Button } from "react-bootstrap";

function Signin() {
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
                    <div>
                        <div className="loginformtext">Name</div>
                        <input
                            type="text"
                            name="userName"
                            placeholder="이름을 입력해주세요"
                        ></input>
                    </div>
                    <div>
                        <div className="loginformtext">Email</div>
                        <input
                            type="email"
                            name="userEmail"
                            placeholder="이메일 주소를 입력해주세요"
                        ></input>
                    </div>
                </div>
                <div>
                    <Button variant="outline-primary" type="submit">
                        Signin
                    </Button>
                    <Button variant="outline-warning" type="reset">
                        Reset
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default Signin;