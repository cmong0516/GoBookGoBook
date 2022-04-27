import React, { useState, useEffect } from "react";
import moment from "moment";

function Clock() {
  let timer: any = null;
  const [time, setTime] = useState(moment());

  useEffect(() => {
    timer = setInterval(() => {
      setTime(moment());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      {time.format("YYYY년 MM월 DD일")}
      <h4> {time.format("HH : mm : ss")}</h4>
    </div>
  );
}

export default Clock;
