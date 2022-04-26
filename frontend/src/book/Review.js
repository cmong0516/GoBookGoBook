import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import ReviewList from "./ReviewList.js";
import ReviewAdd from "./ReviewAdd.js";

function Review(props) {

    let [stateCheck, setStateCheck] = useState(false);
    let book = props.book;
    
    return (
        <div>
            <Tabs
                defaultActiveKey="reviewinfo"
                className="mb-3"
            >
                <Tab eventKey="reviewinfo" title="리뷰보기">
                    <ReviewList
                        book={book}
                        stateCheck={stateCheck}
                        setStateCheck={setStateCheck}
                    />
                </Tab>

                <Tab eventKey="reviewadd" title="리뷰작성">
                    <ReviewAdd
                        book={book}
                        stateCheck={stateCheck}
                        setStateCheck={setStateCheck}
                    />
                </Tab>
            </Tabs>
        </div>
    )
}

export default Review;
