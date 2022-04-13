import React, {useEffect, useState} from 'react';
import axios from 'axios';

function BestSeller() {

    let [books, setBooks] = useState()
    
    useEffect(() => {
        axios.get('/bestseller')
            .then((res) => {
                console.log(res.data);
                console.log(Array.isArray(res.data));

                setBooks(res.data);

            }).catch((error) => {
                alert('도서 데이터를 받아오는 데 실패했습니다.');
                console.log(error);
            });
    },[]);

    return (
        <div>
            {books && books.map((book, i) => (
                <div key={book.itemId}>
                    {book.title}
                </div>
            ))}
        </div>
    )
}

export default BestSeller;