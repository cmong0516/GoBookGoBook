import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {BookWrapper} from './App.js'
import {BookImageWrapper} from './App.js'
import {Card} from "react-bootstrap";

function BestSeller() {

    let [books, setBooks] = useState()
    
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
            
            {books && books.map((book, i) => (
                <div className="col-lg-3 col-sm-4" key={book.itemId}>
                    <BookWrapper>
                        <h3>{i+1}</h3>
                        <BookImageWrapper><img src={book.coverLargeUrl}/></BookImageWrapper>
                        <p>{book.title}</p>
                        {book.author} / {book.publisher}
                    </BookWrapper>
                </div>
            ))}
        </div>
    )
}

export default BestSeller;