import React, { useState } from "react";
import {Card,CloseButton} from "react-bootstrap";
import axios from "axios";
import styled from "styled-components";
import PaginationCustom from "./PaginationCustom";

let ReviewListWrapper = styled.div`

`
let CardWrapper = styled.div`
    margin-top: 1rem;
    margin-bottom: 1rem;
`
let CloseButtonStyle = styled.span`
    text-algin: right;
`

function ReviewList(props) {

    // 리뷰 최근작성순으로 나오도록 reverse
    let reviews = props.reviewList.slice(0).reverse();
    let userId = localStorage.getItem("userId");
    let [nowPage, setNowPage] = useState(1);

    let LastIndex = nowPage * 4;
    let FirstIndex = LastIndex - 4;
    let nowPageReviews = reviews.slice(FirstIndex, LastIndex);
    
    let deleteReview = (review) => {

        if (window.confirm("회원님의 리뷰를 정말로 삭제하실건가요?")) {
            axios.post("/review/delete", {
                reviewId: review.reviewId,
            })
                .then((res) => {
                    alert("리뷰가 삭제되었습니다.");
                    props.setStateCheck(!props.stateCheck);
                })
                .catch((error) => {
                    alert("리뷰 삭제에 실패했습니다.");
                    console.log(error);
                });
        } else {
            return false;
        }
    };

    return (
        <ReviewListWrapper>
            {
                reviews.length == 0
                    ? <div>아직 리뷰가 없습니다.<br/>첫 리뷰의 주인공이 되어보세요!</div>
                    : null
            }
            {nowPageReviews &&
                nowPageReviews.map((review, i) => (
                    
                    <CardWrapper>
                        
                        <Card>
                            {
                                userId == review.userIdCloseButtonStyle 
                                    ? <CloseButton onClick={() => deleteReview(review)} style={{float: "left"}} />
                                : null
                            }
                            <Card.Body>
                              
                                <Card.Text>
                                    {review.content}
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer className="text-muted">
                                {review.userId}&nbsp;
                                ({review.pubDate.substr(0, 4)}.
                                {review.pubDate.substr(5, 2)}.
                                {review.pubDate.substr(8, 2)})
                            </Card.Footer>
                        </Card>
                    </CardWrapper>
                ))}
            
            <PaginationCustom reviewsNum={reviews.length} setNowPage={setNowPage}/>
        </ReviewListWrapper>
    );
}

export default ReviewList;
