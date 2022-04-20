import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./App.css";
import axios from "axios";

function RentButton(props) {
  
    // let userId = JSON.parse(localStorage.getItem('userId'));
    let userId = localStorage.getItem('userId');
  
    let history = useHistory();
    let [rentStatus, setRentStatus] = useState("rent");
    let [booksNum, setBooksNum] = useState(0);

    // 이미 빌린 책인지 체크
    // 버튼을 누르지 않고도 detail, Search페이지에 왔을 때 아래 useEffect가 실행(리렌더링)되어야 한다.
    // 따라서 상위컴포넌트(Detail, Search)로부터 props.book를 받아 useEffect하단 []에 넣어 리렌더링 되도록 한다.
    useEffect(() => {
      axios.post( "/rent/info", {userId: userId} )
          .then((res) => {

            // 아깐 분명 안됐는데...map보다 find가 더 빠른 로딩에 유리하므로 find로 실행
            // res.data && res.data.map((mybook, i) => (
            //   mybook.title == props.book.title
            //   ? console.log(mybook.title + " / " + props.book.title)
            //   : setRentStatus("rent") 
            // ))

            res.data.map(() => {
              setBooksNum(++booksNum);
            })
            
            // 이미 대여한 책이 5개인지 확인
            booksNum == 5 
            ? setRentStatus("forbidden")
            // 빌릴 수 있는 책 개수가 남아있다면 이 책이 이미 빌린 책인지 확인 
            : (
              res.data.find((x) => x.title == props.book.title)
              ? setRentStatus("return")
              : setRentStatus("rent")
            )

          })
          .catch((error) => {
              alert("빌린도서 리스트를 받아오는 데 실패했습니다.");
              console.log(error);
          });
    }, [props.book]);

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
          console.log(res);
        })
        .catch((error) => {
          alert("대여 통신에 실패했습니다.");
          console.log(error);
        });
    };
  
    // 로그인 안되있는 경우 로그인화면으로?
    if (rentStatus == "rent") {
      return (
        <Button variant="success" size="lg" onClick={rentFunc}>
          대여하기
        </Button>
      );
    } else if (rentStatus == "return") {
      return (
        <Button variant="dark" size="lg">
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