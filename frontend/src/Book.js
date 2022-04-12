import React, {useContext, useEffect} from 'react';
import {bookContext} from './App.js';
import axios from 'axios';

function Book() {

    let books = useContext(bookContext);
    
    useEffect(() => {
        axios.get('/bestseller')
            .then((res) => {
                console.log(res.data);
            }).catch((error) => {
                alert('도서 데이터를 받아오는 데 실패했습니다.');
                console.log(error);
            });
    },[]);

    return (
        <div>
            {books.map((book,i) => <div>{book.title}</div>)}
        </div>
    )

}

export default Book;