import React from 'react';
import { Pagination } from "react-bootstrap";

function PaginationCustom({ reviewsNum, setNowPage }) {

    let items = [];
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
