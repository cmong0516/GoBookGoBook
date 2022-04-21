import React, { useEffect, useState } from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import MyRentBooks from "./MyRentBooks.js";
import axios from "axios";

function MyRent() {

  const [radioValue, setRadioValue] = useState("1");
  let userName = localStorage.getItem("userName");
  // let userId = JSON.parse(localStorage.getItem('userId'));
  let userId = localStorage.getItem("userId");
  let [booksNum, setBooksNum] = useState(0);
  let [returnCheck, setReturnCheck] = useState(false);

  let [nowRent, setNowRent] = useState([]);
  let [returnBook, setReturnBook] = useState([]);
  // 일반 배열은 useEffect에서 push한 값이 사라지고 초기화된 상태로 return으로 들어감
  // let nowRent = [];
  // let returnBook = [];

  const radios = [
    { name: "현재 대여중인 도서", value: "1" },
    { name: "지난 대여 내역", value: "2" },
  ];

  useEffect(() => {
    axios.post("/rent/info", { userId: userId })
      .then((res) => {
        console.log(returnCheck)
        // booksNum은 RentButton.js에서 갖고오기
        setNowRent(res.data.filter(x => x.state == true))
        setReturnBook(res.data.filter(x => x.state == false))

        res.data.map((myBook) => {
          if (myBook.state == true) {
            setBooksNum(++booksNum);
          }
        });
      })
      .catch((error) => {
        alert("도서 데이터를 받아오는 데 실패했습니다.");
        console.log(error);
      });
    // console.log(returnCheck);
  }, [returnCheck]);

  
  return (
    <div>
      <h2>{userName}님, 반가워요!</h2>
      {/* 에러 : <p>현재 대여중인 도서는 {rentBooks.length}/5 권 입니다.</p> */}
      <p>현재 대여중인 도서는 {booksNum}/5 권 입니다.</p>
      <ButtonGroup>
        {
          radios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              id={`radio-${idx}`}
              type="radio"
              variant={idx % 2 ? "outline-primary" : "outline-primary"}
              name="radio"
              value={radio.value}
              checked={radioValue == radio.value}
              onChange={(e) => setRadioValue(e.currentTarget.value)}
            >
              {radio.name}
            </ToggleButton>
          ))
        }
      </ButtonGroup>

      {
        radioValue == 1 
        ? <MyRentBooks rentBooks={nowRent} setReturnCheck={setReturnCheck}/>
        : <MyRentBooks rentBooks={returnBook}/>
      }
    </div>
  );
}

export default MyRent;
