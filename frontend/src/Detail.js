import React, {useContext} from 'react';
import {useParams} from 'react-router-dom';
import {BestSellerContext} from './BestSeller.js'
import {NewBooksContext} from './NewBooks.js'
import "./App.css";

function Detail() {

    let bestSeller = useContext(BestSellerContext);
    let newBook = useContext(NewBooksContext);
    
    return (
        <div>
            {
                bestSeller
                ? <DetailView books={bestSeller}/>
                : <DetailView books={newBook}/>
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