import React, {useEffect, useState} from 'react';
import axios from 'axios';

function Search(props) {

    let [result, setResult] = useState();
    let searchWord = props.searchWord

    useEffect(() => {
        axios.get('/search', {params : {searchWord : searchWord}})
            .then((res) => {
                console.log('통신 확인');
                setResult(res.query);
            }).catch((error) => {
                alert('검색결과 데이터를 받아오는 데 실패했습니다.');
                console.log(error);
            });
    },[]);

    return (
        <div>
            {props.searchWord}
        </div>
    )
}

export default Search;