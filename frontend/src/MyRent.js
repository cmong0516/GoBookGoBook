import React, { useState } from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import MyRentBooks from './MyRentBooks.js'

function MyRent() {

    const [radioValue, setRadioValue] = useState("1");

    const radios = [
        { name: "현재 대여중인 도서", value: "1" },
        { name: "지난 대여 내역", value: "2" },
      ];

    return (
        <div>
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

            <MyRentBooks />
        </div>
    )
}

export default MyRent;