import React, {useEffect} from 'react';
import axios from 'axios';

function Search() {
    
    useEffect(() => {
        axios.get('/kakao/search')
            .then((res) => {

            }).catch((error) => {
                alert('검색 데이터를 받아오는 데 실패했습니다.');
                console.log(error);
            });
    },[]);

    return (
        <div>
            itemId
            title
            contents
            thumbnail
            dateTime
            publisher
            authors
            translator
            isbn
        </div>
    )
}

export default Search;