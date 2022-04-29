import React, { useEffect, useLayoutEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Tooltip, OverlayTrigger } from "react-bootstrap";
import "../App.css";
import axios from "axios";

function RentButton(props) {

  let userId = localStorage.getItem("userId");

  let history = useHistory();
  let [rentStatus, setRentStatus] = useState("rent");
  let [myBook, setMyBook] = useState();
  let [tooltip, setTooltip] = useState('');
  let already = false;

  let popover = (
    <Tooltip id="overlay-example" {...props}>
      다른 사용자가 읽고있어요🙄
    </Tooltip>
  );

  useLayoutEffect(() => {
    axios.post("/rent/check", { isbn: props.book.isbn })
      .then((res) => {
        if (res.data == true) {
          already = true;
        } else {
          already = false;
        }
        axios.post("/rent/info", { userId: userId })
          .then((res) => {
            let booksNum = 0;

            // 대여한 도서 수 판단
            res.data.map((mybooks) => {
              if (mybooks.state == true) {
                booksNum++;
              }
            });

            // 반납 시 서버에 줄 대여책정보 
            // (같은 책을 한번 더 빌리는 경우를 고려해 state가 true(현재 대여중)인 데이터)
            setMyBook(
              res.data
                .filter((x) => x.title == props.book.title)
                .filter((x) => x.state == true)
            );

            if (res.data
              .filter((x) => x.title == props.book.title)  // 현재 보는 책의 도서명과 나의 대여/반납도서들 중 도서명이 같은 것 
              .filter((x) => x.state == true).length != 0  // 그 중 대여중인 책
            ) {
              setRentStatus("return");
            } else if (already) {
              setRentStatus("forbidden");
              setTooltip('show');
            } else if (booksNum >= 5) {
              setRentStatus("forbidden");
              setTooltip('');
            } else {
              setRentStatus("rent");
            }
          })
          .catch((error) => {
            alert("빌린도서 리스트를 받아오는 데 실패했습니다.");
            console.log(error);
          });
      })
      .catch((error) => {
        alert("다른 사용자에 의해 빌려진 도서인지 확인하지 못했습니다.");
        console.log(error);
      })
  }, [props.stateCheck]);

  let rentFunc = () => {

    // 로그인하지 않고 대여버튼 클릭 시 로그인으로 이동
    if (!userId) {
      alert("로그인 후 이용할 수 있습니다.");
      return history.push("/login");
    }

    axios.post("/rent/add", {
      author: props.book.author,
      categoryName: props.book.categoryName,
      coverLargeUrl: props.book.coverLargeUrl,
      coverSmallUrl: props.book.coverSmallUrl,
      customerReviewRank: props.book.customerReviewRank,
      description: props.book.description,
      isbn: props.book.isbn,
      pubDate: props.book.pubDate,
      publisher: props.book.publisher,
      rank: props.book.rank,
      title: props.book.title,
      userId: userId,
    })
      .then(() => {
        props.setStateCheck(!props.stateCheck);
        alert("대여 성공!");
      
      })
      .catch((error) => {
        alert("대여 통신에 실패했습니다.");
        console.log(error);
      });
  };

  let returnFunc = () => {
    axios.post("/rent/return", {
      rentId: myBook[0].rentId,
    })
      .then(() => {
        alert("반납하셨습니다.");
        props.setStateCheck(!props.stateCheck);
      })
      .catch((error) => {
        alert("반납 서버와의 통신에 실패했습니다.");
        console.log(error);
      });
  };

  if (rentStatus == "rent") {
    return (
      <Button variant="success" size="lg" onClick={rentFunc} style={{ width: "100%" }}>
        대여하기
      </Button>
    );
  } else if (rentStatus == "return") {
    return (
      <Button variant="dark" size="lg" onClick={returnFunc} style={{ width: "100%" }}>
        반납하기
      </Button>
    );
  } else if (rentStatus == "forbidden") {
    return (
      <span>
        <OverlayTrigger show={tooltip} placement="bottom" overlay={popover}>
          <Button variant="danger" size="lg" style={{ width: "100%" }}>
            대여불가
          </Button>
        </OverlayTrigger>
      </span>
    );
  }
}

export default RentButton;
