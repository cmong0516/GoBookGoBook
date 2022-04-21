import React, { useContext, useEffect, useState } from "react";
import { DueDateContext } from "./App.js"
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./App.css";
import axios from "axios";

function RentButton(props) {
  
    let userId = localStorage.getItem('userId');
  
    // myBook은 전역state로 관리??
    let history = useHistory();
    let [rentStatus, setRentStatus] = useState("rent");
    let [myBook, setMyBook] = useState();
    let [booksNum, setBooksNum] = useState(0);

  // 반납예정일
  let setDuedate = useContext(DueDateContext);
  let today = new Date();
  let duedate = new Date(today.setDate(today.getDate()+7))
  let year = duedate.getFullYear();
  let month = ('0' + (duedate.getMonth() + 1)).slice(-2);
  let day = ('0' + duedate.getDate()).slice(-2);
  let dateString = year + '-' + month  + '-' + day;

    // 이미 빌린 책인지 체크
    useEffect(() => {
      axios.post( "/rent/info", {userId: userId} )
          .then((res) => {

            res.data.map((mybooks) => {
              if (mybooks.state == true) {
                setBooksNum(++booksNum)
              }
            })

            // 반납 시 서버에 줄 대여책정보 (한번더 빌리는 경우 state가 true인 데이터로 주기)
            setMyBook( res.data
              .filter((x) => x.title == props.book.title) 
              .filter((x) => x.state == true) );

            // 빌렸던 DB테이블에 도서명이 있고
            // 그중에서 state가 true인 것만 반납하기 버튼 보이기
            // 해당하지 않는 값은 null인줄 알았으나 콘솔찍어보니 빈배열이어서 .length로 빈배열판단
            if ( res.data
              .filter(x => x.title == props.book.title)
              .filter(x => x.state==true)
              .length !== 0 ) {
              
                setRentStatus("return");
           
              } else {
              booksNum == 5
              ? setRentStatus("forbidden")
              : setRentStatus("rent")
            }
          })
          .catch((error) => {
              alert("빌린도서 리스트를 받아오는 데 실패했습니다.");
              console.log(error);
          });
    }, [rentStatus]);

    // function으로 따로 빼기
    let rentFunc = () => {
  
      // 리렌더링되면 isLogin도 false로 초기화
      // 이미 로그인상태인데 if(!isLogin)에 걸려버리는 이슈
      // 로컬스토리지 이용 필요하므로 여기서는 userId를 통해 확인
      if(!userId) {
        alert('로그인 후 이용할 수 있습니다.');
        return history.push("/login");
      }
  
      axios
        .post("/rent/add", {
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
          userId: userId
        })
        .then((res) => {
          setRentStatus("return")
          alert("대여 성공!");
          setDuedate(dateString);
        })
        .catch((error) => {
          alert("대여 통신에 실패했습니다.");
          console.log(error);
        });
    };

    // function으로 따로 빼기
    let returnFunc = () => {

      axios.post("/rent/return", {
          rentId : myBook[0].rentId
        })
        .then((res) => {
          setRentStatus("rent");
          alert("반납하셨습니다.");
        })
        .catch((error) => {
          alert("반납 서버와의 통신에 실패했습니다.")
          console.log(error);
        });
    }
  
    if (rentStatus == "rent") {
      return (
        <Button variant="success" size="lg" onClick={rentFunc}>
          대여하기
        </Button>
      );
    } else if (rentStatus == "return") {
      return (
        <Button variant="dark" size="lg" onClick={returnFunc}>
          반납하기
        </Button>
      );
    } else if (rentStatus == "forbidden") {
      return (
        <Button variant="danger" size="lg">
          대여불가
        </Button>
      );
    }
}

export default RentButton;