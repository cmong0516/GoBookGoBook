import React, { useEffect, useState } from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import MyRentBooks from "./MyRentBooks.js";
import axios from "axios";

function MyRent() {
  const [radioValue, setRadioValue] = useState("1");
  let userName = JSON.parse(localStorage.getItem("userName"));
  let userId = JSON.parse(localStorage.getItem("userId"));
  let [rentBooks, setRentBooks] = useState();

  const radios = [
    { name: "현재 대여중인 도서", value: "1" },
    { name: "지난 대여 내역", value: "2" },
  ];
  // const radios = [
  //     { name: "현재 대여중인 도서", value: "1" },
  //     { name: "지난 대여 내역", value: "2" },
  //   ];

  useEffect(() => {
    axios
      .post("/rent/info", { userId: userId })
      .then((res) => {
        console.log(res.data);
        setRentBooks(res.data);
      })
      .catch((error) => {
        alert("도서 데이터를 받아오는 데 실패했습니다.");
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h2>{userName}님, 반가워요!</h2>
      <p>현재 대여중인 도서는 0/5 권 입니다.</p>
      <ButtonGroup>
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant={idx % 2 ? "outline-primary" : "outline-primary"}
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>

      {radioValue == 1 ? <MyRentBooks /> : null}
    </div>
  );
}

export default MyRent;
