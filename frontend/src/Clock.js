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
    <div className="time">
      <div className="date" style={{ fontFamily: "alarm_clock" }}>
        {time.format("YYYY년 MM월 DD일")}
      </div>
      <div className="clock">
        <h4> {time.format("HH : mm : ss")}</h4>
      </div>
    </div>
  );
}

export default Clock;
