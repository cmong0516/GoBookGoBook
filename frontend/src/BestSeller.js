import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Book from './Book.js'

export let BestSellerContext = React.createContext();

function BestSeller(props) {
    
    let [books, setBooks] = useState();
    
    // 프론트에서 백단의 데이터 실시간으로 가져오는 방법 : Ajax
    // 
    useEffect(() => {
        axios.get('/api/bestseller')
            .then((res) => {
                // console.log(res.data);
                // console.log(Array.isArray(res.data));
                setBooks(res.data);
            }).catch((error) => {
                alert('도서 데이터를 받아오는 데 실패했습니다.');
                console.log(error);
            });
    },[]);

    return (
        <div className='row'>
            <BestSellerContext.Provider value={books}>
                {props.getBooks(books)}
                <Book />
            </BestSellerContext.Provider>
        </div>
    )
}

export default BestSeller;