import React from "react";

function SeeMoreList(props) {

    // 페이지네이션에서 숫자버튼만 없는버전!
    // books는 context api로
    let [nowPage, setNowPage] = useState(1);
    let LastIndex = nowPage * 5;
    let FirstIndex = LastIndex - 5;
    let nowResult = books.slice(FirstIndex, LastIndex);

    // 리렌더링으로 이전값에 붙여나오지 않을 위험 있어서 체크해야함
    return (
        <div>
            {
                nowResult && nowResult.map((book) => {
                    
                })
            }
            {/* 부트스트랩에서 버튼말고 괜찮은걸로 붙이기 */}
            <span onClick={() => setNowPage(++nowPage)}>더보기</span>
        </div>
    );
}

export default SeeMoreList;
