import React, {useContext} from 'react';
import {bookContext} from './App.js';
import Book from './Book.js';

function BestSeller() {

    let books = useContext(bookContext);
    console.log(books[0]);
    return (
        <div>
            <Book />
        </div>
    )
}

export default BestSeller;