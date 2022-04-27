import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CloseButton, Row } from "react-bootstrap";
import styled from 'styled-components';
import PaginationCustom from "../book/PaginationCustom";

function MyReview() {

    let userId = localStorage.getItem("userId");
    let [stateCheck, setStateCheck] = useState(false);
    let [myReviews, setMyReviews] = useState([]);
    // 리뷰 최근작성순으로 나오도록 reverse
    let myReviewsRev = myReviews.slice(0).reverse();
    let [nowPage, setNowPage] = useState(1);

    // 페이징 처리
    let LastIndex = nowPage * 4;
    let FirstIndex = LastIndex - 4;
    let nowPageReviews = myReviewsRev.slice(FirstIndex, LastIndex);
    
    useEffect(() => {
        axios.post("/review/infobyuser", {
            userId: userId
            })
            .then((res) => {
                setMyReviews(res.data);
            })
            .catch((error) => {
                alert("리뷰 조회에 실패했습니다.");
                console.log(error);
            });
    }, [stateCheck]);

    let deleteReview = (reviewId) => {

        if (window.confirm("회원님의 리뷰를 정말로 삭제하실건가요?")) {
            axios.post("/review/delete", {
                reviewId: reviewId,
            })
                .then(() => {
                    alert("리뷰가 삭제되었습니다.");
                    setStateCheck(!stateCheck);
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
            <h2>나의 도서 리뷰</h2>
            <p>고객님의 리뷰를 확인하고 관리해보세요.</p>
            {
                nowPageReviews && nowPageReviews.map(myReview => (
                    <Card style={{marginBottom: '1rem'}}>
                        <Card.Body>
                            <CloseButton
                                style={{ float: "right" }}
                                onClick={() => deleteReview(myReview.reviewId)} />
                            <Card.Title>{myReview.title}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{myReview.pubDate}</Card.Subtitle>
                            <Card.Text>{myReview.content}</Card.Text>
                        </Card.Body>
                    </Card>
                ))
            }
            <PaginationCustom reviewsNum={myReviews.length} setNowPage={setNowPage} />
        </div>
    )
}

export default MyReview;
