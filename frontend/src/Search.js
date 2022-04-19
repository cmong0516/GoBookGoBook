import React, {useEffect, useState} from 'react';
import axios from 'axios';
import RentButton from "./RentButton.js"

function Search(props) {

    let [result, setResult] = useState();
    let searchWord = props.searchWord;
    let [book, setBook] = useState();
    let userId = localStorage.getItem('userId');

    useEffect(() => {
        axios.get('/api/search', {params : {query : searchWord}})
        .then(res => {
            setResult(res.data);
            console.log(res.data);
        })
        .catch(error => {
            alert('검색결과 데이터를 받아오는 데 실패했습니다.');
            // console.log(searchWord);
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
                    {() => setBook({
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
                    })}
                    <RentButton book={book} />
                </div>
            ))} 
        </div>
    )
}

export default Search;