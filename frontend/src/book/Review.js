import React, { useState, useEffect } from 'react';
import {
    Card,
    ListGroup,
    ListGroupItem,
    Tabs,
    Tab,
    Button,
    CloseButton
} from "react-bootstrap";
import axios from "axios";

function Review(props) {

    let [findReview, setFindReview] = useState([]);
    let book = props.book;
    let [review, setReview] = useState('');
    let userId = localStorage.getItem("userId");

    let onChangeFunc = (e) => {
        setReview(e.target.value)
    };

    useEffect(() => {
        axios
            .post("/review/findbybook", {
                isbn: book.isbn,
            })
            .then((res) => {
                console.log(res.data);
                setFindReview(res.data);
            })
            .catch((error) => {
                alert("리뷰 조회에 실패했습니다.");
                console.log(error);
            });
    }, []);

    let addReview = () => {
        axios
            .post("/review/add", {
                userId: userId,
                title: book.title,
                content: review,
                isbn: book.isbn,
            })
            .then((res) => {
                alert("리뷰 등록 성공!");
            })
            .catch((error) => {
                alert("리뷰 등록에 실패했습니다.");
                console.log(error);
            });
    };

    let deleteReview = (review) => {
        axios
            .post("/review/delete", {
                reviewId: review.reviewId,
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
            <Tabs
                defaultActiveKey="reviewinfo"
                id="uncontrolled-tab-example"
                className="mb-3"
            >
                <Tab eventKey="reviewinfo" title="리뷰보기">
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

                {findReview &&
                    findReview.map((review, i) => (
                        <Card style={{ width: "25rem" }}>
                                <Card.Body>
                                    <div className="closebutton">
                                        {userId == review.userId ? (
                                            <CloseButton onClick={() => deleteReview(review)} />
                                        ) : null}
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
            </Tab>
            <Tab eventKey="reviewadd" title="리뷰작성">
                <Card className="" style={{ width: "25rem" }}>
                    <Card.Body>
                        <Card.Title>{book.title}</Card.Title>
                        <Card.Text>
                            <textarea
                                placeholder="책에 대한 자유로운 의견을 남겨주세요"
                                name="content"
                                onChange={onChangeFunc}
                            ></textarea>
                        </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem>
                            <Button variant="outline-primary" onClick={() => addReview()}>
                                리뷰등록
                            </Button>
                        </ListGroupItem>
                    </ListGroup>
                </Card>
            </Tab>
        </Tabs>
        </div>
    )
}

export default Review;