import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Book from './Book.js'

export let NewBooksContext = React.createContext();

function NewBooks() {

    let [books, setBooks] = useState();
    
    useEffect(() => {
        axios.get('/api/newbook')
            .then((res) => {
                setBooks(res.data);
            }).catch((error) => {
                alert('도서 데이터를 받아오는 데 실패했습니다.');
                console.log(error);
            });
    },[]);

    return (
        <div className='row'>
            <NewBooksContext.Provider value={books}>
                <Book />
            </NewBooksContext.Provider>
        </div>
    )
}

export default NewBooks;