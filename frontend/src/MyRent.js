import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import MyRentBooks from "./MyRentBooks.js";
import axios from "axios";

function MyRent() {

  const [radioValue, setRadioValue] = useState("1");
  let userName = localStorage.getItem("userName");
  // let userId = JSON.parse(localStorage.getItem('userId'));
  let userId = localStorage.getItem("userId");
  let [rentBooks, setRentBooks] = useState();
  let [booksNum, setBooksNum] = useState(0);
  let [returnCheck, setReturnCheck] = useState(0);
  // let [nowRent, setNowRent] = useState([]);
  // let [returnBook, setReturnBook] = useState([]);
  let nowRent = [0];
  let returnBook = [];

  const radios = [
    { name: "현재 대여중인 도서", value: "1" },
    { name: "지난 대여 내역", value: "2" },
  ];

  useEffect(() => {
    axios.post("/rent/info", { userId: userId })
      .then((res) => {

        setRentBooks(res.data);

        // 대여중 : 개수 확인 + 대여
        res.data.map((myBook) => {
          if (myBook.state == true) {
            setBooksNum(++booksNum);
            // setNowRent([...nowRent, ...myBook])
            console.log('====확인===')
            // console.log(myBook)
            nowRent.push(myBook);
          } else {
            // setReturnBook([...returnBook, ...myBook])
            returnBook.push(myBook);
          }
        });

      })
      .catch((error) => {
        alert("도서 데이터를 받아오는 데 실패했습니다.");
        console.log(error);
      });

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
        console.log(nowRent)
        // radioValue == 1 
        // ? <MyRentBooks rentBooks={nowRent} setReturnCheck={setReturnCheck}/>
        // : <MyRentBooks rentBooks={returnBook}/>
      }
    </div>
  );
}

export default MyRent;
