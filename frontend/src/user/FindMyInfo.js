import React from "react";
import { Row, Col } from "react-bootstrap";
import FindId from './FindId.js';
import FindPassword from './FindPassword.js';
import styled from 'styled-components';

let Wrapper = styled.div`
    padding-top : 8vh;
    padding-bottom: 10vh;
    text-align: left;
    input, button {
        width: 100%;
        height: 3rem;
    }
    button {
        margin-top: 1rem;
    }
    h3 {
        font-weight: bold;
    }
`

function FindMyInfo() {

    return (
        <Wrapper>
            <Row>
                <Col>
                    <FindId />
                </Col>

                <Col>
                    <FindPassword />
                </Col>
            </Row>
        </Wrapper>
    );
}

export default FindMyInfo;
