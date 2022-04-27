import React, { useState } from "react";

function SeeMoreText({ review }) {

    let [seeMore, setSeeMore] = useState(false);

    return (
        <div>
            {
                seeMore
                    ? review
                    : review.slice(0, 50)
            }
            {
                review.length > 50
                    ? (
                        !seeMore
                            ? <span onClick={() => setSeeMore(true)}>... [더보기]</span>
                            : <span onClick={() => setSeeMore(false)}>[닫기]</span>
                    )
                    : null
            }
        </div>
    );
}

export default SeeMoreText;