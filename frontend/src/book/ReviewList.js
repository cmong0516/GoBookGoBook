import React, { useState, useEffect } from "react";
import { Card, CloseButton } from "react-bootstrap";
import axios from "axios";
import styled from "styled-components";
import PaginationCustom from "./PaginationCustom";
import SeeMoreText from "./SeeMoreText";

let CardWrapper = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
  text-align: left;
`;

// book은 context API로 갖고오기
function ReviewList(props) {

  let userId = localStorage.getItem("userId");
  let [reviewList, setReviewList] = useState([]);
  // 리뷰 최근작성순으로 나오도록 reverse
  let reviews = reviewList.slice(0).reverse();
  let [nowPage, setNowPage] = useState(1);

  // 페이징처리
  let LastIndex = nowPage * 4;
  let FirstIndex = LastIndex - 4;
  let nowPageReviews = reviews.slice(FirstIndex, LastIndex);
  
    // 리뷰 불러오기
    useEffect(() => {
        axios.post("/review/findbybook", {
                isbn: props.book.isbn,
            })
            .then((res) => {
                setReviewList(res.data);
            })
            .catch((error) => {
                alert("리뷰 조회에 실패했습니다.");
                console.log(error);
            });
    }, [props.stateCheck]);

  // 리뷰 삭제
  let deleteReview = (review) => {
    if (window.confirm("회원님의 리뷰를 정말로 삭제하실건가요?")) {
      axios
        .post("/review/delete", {
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
    <div>
      {reviews.length == 0 ? (
        <div>
          아직 리뷰가 없습니다.
          <br />첫 리뷰를 작성해보세요!
        </div>
      ) : null}
      {nowPageReviews &&
        nowPageReviews.map((review, i) => (
          <CardWrapper>
            <Card>
              <Card.Body>
                {
                  userId == review.userId
                    ? <CloseButton
                      style={{ float: "right" }} onClick={() => deleteReview(review)} />
                    : null
                }
                <Card.Text>
                  {/* 리뷰내용이 50자를 넘는 경우 더보기 처리를 위한 컴포넌트 */}
                  <SeeMoreText review={review.content}/>
                </Card.Text>
              </Card.Body>
              <Card.Footer className="text-muted">
                {review.userId}&nbsp; ({review.pubDate.substr(0, 4)}.
                {review.pubDate.substr(5, 2)}.{review.pubDate.substr(8, 2)})
              </Card.Footer>
            </Card>
          </CardWrapper>
        ))}

      <PaginationCustom reviewsNum={reviews.length} setNowPage={setNowPage} />
    </div>
  );
}

export default ReviewList;
