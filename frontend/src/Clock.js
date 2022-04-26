import React from "react";
import { useState } from "react";

function Clock() {
  const [timer, setTimer] = useState("00:00");
  const date = new Date();
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1);
  const tdate = String(date.getDate());
  const currentTimer = () => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    setTimer(`${hours} : ${minutes}`);
  };

  const startTimer = () => {
    setInterval(currentTimer, 59999);
  };
  startTimer();
  return (
    <div>
      {year}년 {month}월 {tdate}일 <h4>{timer}</h4>
    </div>
  );
}

export default Clock;
