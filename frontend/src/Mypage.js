import React, { useState } from "react";
import MyrentPage from "./Myrentpage";
import {
  Container,
  Col,
  Row,
  ButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import {Link} from "react-router-dom";

function Mypage() {
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState("1");

  const radios = [
    { name: "현재 대여중인 도서", value: "1" },
    { name: "지난 대여 내역", value: "2" },
  ];
  return (
    <div className="mypage">
      <Container>
        <Row>
          <Col sm={3} className="side">
            <div>
              <h1>My Page</h1>
            </div>
            <Link to="/myrentlist">
            <div>나의 대여 관리</div>
            </Link>
            <Link to="/editprofile">
            <div>개인정보 수정</div>
            </Link>
          </Col>
          <Col sm={8}>
            <div className="mypagemain">
              <h1>닉네임님, 반가워요!</h1>
              <p>현재 대여중인 도서는 3/5 권 입니다.</p>
              <div className="mypagemaincategory">
                <ButtonGroup>
                  {radios.map((radio, idx) => (
                    <ToggleButton
                      key={idx}
                      id={`radio-${idx}`}
                      type="radio"
                      variant={idx % 2 ? "outline-success" : "outline-success"}
                      name="radio"
                      value={radio.value}
                      checked={radioValue === radio.value}
                      onChange={(e) => setRadioValue(e.currentTarget.value)}
                      className="mypagetogglebutton"
                    >
                      {radio.name}
                    </ToggleButton>
                  ))}
                </ButtonGroup>
              </div>
              <MyrentPage />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Mypage;
