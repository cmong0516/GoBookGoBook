import React, { useContext } from "react";
import {
    Card,
    ListGroup,
    ListGroupItem,
    CloseButton
} from "react-bootstrap";
import axios from "axios";

// book은 context API로 갖고오기
function ReviewList(props) {

    let reviews = props.reviewList;
    let book = props.book;
    let userId = localStorage.getItem("userId");

    let deleteReview = (reviewId) => {
        axios
            .post("/review/delete", {
                reviewId: reviewId,
            })
            .then((res) => {
                alert("리뷰가 삭제되었습니다.");
            })
            .catch((error) => {
                alert("리뷰 삭제에 실패했습니다.");
                console.log(error);
            });
    };

    return (
        <div>
            <Card style={{ width: "25rem" }}>
                <Card.Body>
                    <Card.Title>첫번째 리뷰</Card.Title>
                    <Card.Text>첫번째 유저입니다 / 2022년 4월 25일</Card.Text>
                    <Card.Text></Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroupItem>재밌게 열심히 만들었습니다.</ListGroupItem>
                </ListGroup>
            </Card>

            {reviews &&
                reviews.slice(0).reverse().map((review, i) => (
                    <Card style={{ width: "25rem" }}>
                        <Card.Body>
                            <div className="closebutton">
                                {userId == review.userId
                                    ? <CloseButton onClick={() => deleteReview(review.reviewId)} />
                                    : null
                                }
                            </div>
                            <Card.Title>{book.title}</Card.Title>
                            <Card.Text>
                                {review.userId} / {review.pubDate.substr(0, 4)}년
                                {review.pubDate.substr(5, 2)}월
                                {review.pubDate.substr(8, 2)}일
                            </Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem>{review.content}</ListGroupItem>
                        </ListGroup>
                    </Card>
                ))}
        </div>
    );
}

export default ReviewList;
