import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import RentButton from "./RentButton.js"

function Search(props) {

    let [result, setResult] = useState();
    let searchWord = props.searchWord;
    let userId = localStorage.getItem('userId');

    useEffect(() => {
        axios.get('/api/search', {params : {query : searchWord}})
        .then(res => {
            setResult(res.data);
            // console.log(res.data);
        })
        .catch(error => {
            alert('검색결과 데이터를 받아오는 데 실패했습니다.');
            console.log(error);
        });
    },[searchWord]);

    return (
        <div>
            {/* 검색결과가 없는 경우도 처리해야함 */}
            {result && result.map((book, i) => (
                <div key={book.itemId}>
                    <img src={book.thumbnail}/>
                    {book.title}<br/>
                    줄거리 : {book.contents}<br/>
                    {book.authors}/{book.publisher}/{book.dateTime}/{book.translator}/{book.isbn}
                    
                    {/* books state를 만들어 버튼에 넣으면 이미 books값을 가져오기 전에 RentButton으로 넘어가버려서 undefined가 출력되는 것으로 추정
                    {() => setBooks({
                        author: book.authors,
                        categoryName: book.categoryName,
                        coverLargeUrl: book.coverLargeUrl,
                        coverSmallUrl: book.thumbnail,
                        customerReviewRank: book.customerReviewRank,
                        description: book.contents,
                        isbn: book.isbn,
                        pubDate: book.dateTime,
                        publisher: book.publisher,
                        rank: book.rank,
                        // title: book.title,
                        title: "체크",
                        userId: userId
                    })} 
                    
                    <RentButton book={books} />*/}
                    
                    <RentButton book={{
                        author: book.authors,
                        categoryName: book.categoryName,
                        coverLargeUrl: book.coverLargeUrl,
                        coverSmallUrl: book.thumbnail,
                        customerReviewRank: book.customerReviewRank,
                        description: book.contents,
                        isbn: book.isbn,
                        pubDate: book.dateTime,
                        publisher: book.publisher,
                        rank: book.rank,
                        title: book.title,
                        userId: userId
                    }} />
                    
                </div>
            ))} 
        </div>
    )
}

export default Search;