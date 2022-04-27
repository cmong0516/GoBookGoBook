import React from 'react';
import { Pagination } from "react-bootstrap";

function PaginationCustom({ reviewsNum, setNowPage }) {

    // 페이징버튼 배열
    let items = [];

    // 화면 당 4개씩 띄우기 위해 전체개수/4의 올림 수 만큼 버튼을 만든다.
    let pages = Math.ceil(reviewsNum / 4);
    for (let number = 1; number <= pages; number++) {
        items.push(
            <Pagination.Item key={number} onClick={() => setNowPage(number)}>
                {number}
            </Pagination.Item>
        );
    }

    return (
        <div>
            <Pagination className="pagination justify-content-center">{items}</Pagination>
        </div>
    )
}

export default PaginationCustom;
