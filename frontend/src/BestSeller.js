import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Book from './Book.js'

export let BestSellerContext = React.createContext();

function BestSeller(props) {
    
    let [books, setBooks] = useState();
    
    useEffect(() => {
        axios.post('/api/bestseller')
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
        <div>
            <BestSellerContext.Provider value={books}>
                {props.getBooks(books)}
                <Book />
            </BestSellerContext.Provider>
        </div>
    )
}

export default BestSeller;