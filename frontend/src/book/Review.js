import React, { useState, useEffect } from "react";
import { Tabs, Tab } from "react-bootstrap";
import ReviewList from "./ReviewList.js";
import ReviewAdd from "./ReviewAdd.js";
import axios from "axios";

function Review(props) {
  let [reviewList, setReviewList] = useState([]);
  let [stateCheck, setStateCheck] = useState(false);
  let book = props.book;

  useEffect(() => {
    axios
      .post("/review/findbybook", {
        isbn: book.isbn,
      })
      .then((res) => {
        console.log(res.data);
        setReviewList(res.data);
      })
      .catch((error) => {
        alert("리뷰 조회에 실패했습니다.");
        console.log(error);
      });
  }, [stateCheck]);

  return (
    <div className="reviewTap">
      <Tabs defaultActiveKey="reviewinfo" className="mb-3">
        <Tab eventKey="reviewinfo" title="리뷰보기">
          <ReviewList reviewList={reviewList} book={book} />
        </Tab>

        <Tab eventKey="reviewadd" title="리뷰작성">
          <ReviewAdd
            book={book}
            stateCheck={stateCheck}
            setStateCheck={setStateCheck}
          />
        </Tab>
      </Tabs>
    </div>
  );
}

export default Review;
