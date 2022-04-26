import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Card, CloseButton } from "react-bootstrap";
import styled from 'styled-components';

function MyReview() {

    let deleteReview = () => {

        if (window.confirm("회원님의 리뷰를 정말로 삭제하실건가요?")) {
            axios.post("/infobyuser", {
                // reviewId: review.reviewId,
            })
                .then((res) => {
                    alert("리뷰가 삭제되었습니다.");
                    // props.setStateCheck(!props.stateCheck);
                })
                .catch((error) => {
                    alert("리뷰 삭제에 실패했습니다.");
                    console.log(error);
                });
        } else {
            return false;
        }
    }

    return (
        <div>
            <Card>
                <Card.Body>
                    <CloseButton onClick={() => deleteReview()} />
                    <Card.Title>도서제목</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted"> 여기에는 날짜</Card.Subtitle>
                    <Card.Text>여기에 내가 쓴 리뷰내용</Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default MyReview;
