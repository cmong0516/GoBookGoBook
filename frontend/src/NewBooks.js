import React, {useEffect, useState} from 'react';
import axios from 'axios';

function NewBooks() {

    let [books, setBooks] = useState()
    
    useEffect(() => {
        axios.get('/api/newbook')
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
        <div className='row'>
            {books && books.map((book, i) => (
                <div className="col-lg-2 col-md-3 col-sm-4" key={book.itemId}>
                    <img src={book.coverLargeUrl} width="90%"/>
                    <p>{book.title}</p>
                    {book.author} | {book.publisher}
                </div>
            ))}
        </div>
    )
}

export default NewBooks;