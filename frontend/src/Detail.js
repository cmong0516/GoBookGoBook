import React, {useContext} from 'react';
import {useParams} from 'react-router-dom';
import "./App.css";
import {BookContext} from './App.js';

function Detail() {

    let book = useContext(BookContext);

    return (
        <div>
            {
                book
                ? <DetailView books={book}/>
                : null
            }
        </div>
    )
}

function DetailView(props) {

    let { isbn } = useParams();

    let book = props.books && props.books.find(x => x.isbn == isbn);
    return (
        <div>
            <img src={book.coverLargeUrl}/>
            {book.title}
            {book.author}
            {book.publisher}
        </div>
    )
}

export default Detail;