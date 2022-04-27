import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import Book from './Book.js'
import { BookContext, SetBookContext } from "../App.js";

export let BestSellerContext = React.createContext();

function BestSeller() {

    let books = useContext(BookContext);
    let setBooks = useContext(SetBookContext);

    useEffect(() => {
        axios.post('/api/bestseller')
            .then((res) => {
                setBooks(res.data);
            }).catch((error) => {
                alert('도서 데이터를 받아오는 데 실패했습니다.');
                console.log(error);
            });
    }, []);

    return (
        <div>
            <BestSellerContext.Provider value={books}>
                <Book />
            </BestSellerContext.Provider>
        </div>
    )
}

export default BestSeller;