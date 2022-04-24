import React from "react";
import styled from 'styled-components';

let Wrapper = styled.div`
    background-color: rgb(42, 46, 46);
    color: Gray;
    margin-top: 3rem;
    padding: 3rem 15rem;
    text-align: left;

    span {
        color: DarkGrey;
    }
`

function Footer() {

    return (
        <Wrapper>
            <span>
            서비스 이용약관 | 개인정보 처리방침 | 회사 안내
            <br />
            <br />
            고객센터 | 1544-9001, 평일 08:00 ~ 20:00 휴일 09:00 ~ 18:00 (점심시간 12:00 ~ 13:00 제외)<br />
            광고문의 | ad@gobook.com<br /></span>
            <br />
            주식회사 꼬북꼬북 | 대표 7조 | 서울특별시 강남구 테헤란로 212 (역삼동 718-5번지)<br />
            사업자 등록 번호 104-81-53114<br />
            © 2021 by GoBook,Inc. All rights reserved.
        </Wrapper>
    )
}

export default Footer;