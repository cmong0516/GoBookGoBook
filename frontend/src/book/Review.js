import React, {useState} from 'react';
import {
    Card,
    ListGroup,
    ListGroupItem,
    Tabs,
    Tab,
    Button,
} from "react-bootstrap";
import axios from "axios";

function Review(props) {

    let [findReview, setFindReview] = useState([]);
    let book = props.book;
    let [review, setReview] = useState({
        userId: "",
        title: "",
        content: "",
        isbn: "",
    });
    let userId = localStorage.getItem("userId");

    let onChangeFunc = (e) => {
        setReview({
            ...review,
            [e.target.name]: e.target.value,
        });
    };

    let addReview = () => {
        axios
            .post("/review/add", {
                userId: userId,
                title: book.title,
                content: review.content,
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

    return (
        <div>
            <Tabs
                defaultActiveKey="reviewinfo"
                id="uncontrolled-tab-example"
                className="mb-3"
            >
            <Tab eventKey="reviewinfo" title="리뷰보기">
                {findReview &&
                    findReview.map((review, i) => (
                        <Card className="" style={{ width: "25rem" }}>
                            <form>
                                <Card.Body>
                                    <Card.Title>{book.title}</Card.Title>
                                    <Card.Text>
                                        {review.userId} / {review.pubDate.substr(0, 4)}년
                                        {review.pubDate.substr(5, 2)}월
                                        {review.pubDate.substr(8, 2)}일
                                    </Card.Text>
                                    <Card.Text></Card.Text>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroupItem>{review.content}</ListGroupItem>
                                </ListGroup>
                            </form>
                        </Card>
                    ))}
            </Tab>
            <Tab eventKey="reviewadd" title="리뷰작성">
                <Card className="" style={{ width: "25rem" }}>
                    <form>
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
                                <Button
                                    variant="outline-primary"
                                    onClick={() => addReview()}
                                >
                                    리뷰등록
                                </Button>
                            </ListGroupItem>
                        </ListGroup>
                    </form>
                </Card>
            </Tab>
        </Tabs>
        </div>
    )
}

export default Review;