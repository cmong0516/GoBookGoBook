import React, {useEffect, useState} from 'react';
import axios from 'axios';

function Search(props) {

    let [result, setResult] = useState();
    let searchWord = props.searchWord;

    useEffect(() => {
        axios.get('/search', {params : {query : searchWord}})
            .then(res => setResult(res.data))
            .catch((error) => {
                alert('검색결과 데이터를 받아오는 데 실패했습니다.');
                // console.log(searchWord);
                console.log(error);
            });
    },[searchWord]);

    return (
        <div>
            {result && result.map((book, i) => (
                <div key={book.itemId}>
                    <img src={book.thumbnail}/>
                    {book.title}<br/>
                    줄거리 : {book.contents}...<br/>
                    {book.authors}/{book.publisher}/{book.dateTime}/{book.translator}/{book.isbn}
                </div>
            ))} 
        </div>
    )
}

export default Search;