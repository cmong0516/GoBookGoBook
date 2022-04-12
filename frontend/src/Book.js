import React, {useContext} from 'react';
import {bookContext} from './App.js';

function Book() {

    let books = useContext(bookContext);
    return (
        <div>
            {books.map((book,i) => <div>{book.title}</div>)}
        </div>
    )

}

export default Book;