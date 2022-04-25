import React, { useState } from "react";
import { useHistory } from "react-router-dom";
// import { Col, Row, ListGroup } from "react-bootstrap";
// import styled from 'styled-components';

function FindId() {

    // 로그인하지 않은 경우 url입력 시 출입불가
    let history = useHistory();
    let userId = localStorage.getItem('userId');

    return (
        <div>
            
        </div>
    );
}

export default FindId;
