import React, { useEffect, useState } from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import MyRentBooks from "./MyRentBooks.js";
import axios from "axios";

function MyRent() {
  const [radioValue, setRadioValue] = useState("1");
  let userName = localStorage.getItem("userName");
  let userId = localStorage.getItem("userId");
  let [booksNum, setBooksNum] = useState(0);
  // 반납 시 도서리스트 리렌더링을 위한 state
  let [returnCheck, setReturnCheck] = useState(false);
  // 현재 대여중인 도서와 반납한 도서를 나눠담기 위한 state
  let [nowRent, setNowRent] = useState([]);
  let [returnBook, setReturnBook] = useState([]);

  const radios = [
    { name: "현재 대여중인 도서", value: "1" },
    { name: "지난 대여 내역", value: "2" },
  ];

  useEffect(() => {
    axios.post("/rent/info", { userId: userId })
      .then((res) => {
        console.log(returnCheck);

        setNowRent(res.data.filter((x) => x.state == true));
        setReturnBook(res.data.filter((x) => x.state == false));

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
  }, [returnCheck]);

  return (
    <div>
      <h2>{userName}님, 반가워요!</h2>
      <p>현재 대여중인 도서는 {booksNum}/5 권 입니다.</p>
      <ButtonGroup>
        {radios.map((radio, idx) => (
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
        ))}
      </ButtonGroup>

      {
        radioValue == 1
          ? <MyRentBooks rentBooks={nowRent} setReturnCheck={setReturnCheck} />
          : <MyRentBooks rentBooks={returnBook} />
      }
    </div>
  );
}

export default MyRent;
