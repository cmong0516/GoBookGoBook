import React, {useState} from "react";
import {
    Card,
    ListGroup,
    ListGroupItem,
    Button
} from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";

// book은 context API로 갖고오기
function ReviewAdd(props) {

    let history = useHistory();
    let [myreview, setMyReview] = useState('');
    let book = props.book;
    let userId = localStorage.getItem("userId");

    // 리뷰 추가
    let addReview = () => {

        if (!userId) {
            alert("로그인 후 이용할 수 있습니다.");
            return history.push("/login");
        }

        axios
            .post("/review/add", {
                userId: userId,
                title: book.title,
                content: myreview,
                isbn: book.isbn,
            })
            .then((res) => {
                alert("리뷰 등록 성공!");
                props.setStateCheck(!props.stateCheck)
            })
            .catch((error) => {
                alert("리뷰 등록에 실패했습니다.");
                console.log(error);
            });
    };

    return (
        <div>
            <Card>
                <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <Card.Text>
                        <textarea
                            placeholder="책에 대한 자유로운 의견을 남겨주세요"
                            name="content"
                            onChange={(e) => { setMyReview(e.target.value) }}
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
        </div>
    );
}

export default ReviewAdd;