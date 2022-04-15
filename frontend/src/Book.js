import React, {useContext} from 'react';
import {BestSellerContext} from './BestSeller.js'
import {NewBooksContext} from './NewBooks.js'
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

let BookWrapper = styled.div`
  width: 80%;
  margin-top: 2rem;
  text-align: left;
  cursor: pointer; 

  p {
    font-size: 13pt;
    font-weight: 600;
    margin: 0.5rem 0 0 0;
  }

  h3 {
    color: yellowgreen;
    text-shadow: 1px 1px 1px darkgreen;
    font-style: italic;
    font-weight: bolder;
  }
`
let BookImageWrapper = styled.div`
  width: 100%;
  height: 100%;

  img {
    width: 11rem; 
    height: 16rem;
    object-fit: cover;
    border: solid 0.1rem darkgreen;
  }
`

function Book() {

    let bestSeller = useContext(BestSellerContext);
    let newBooks = useContext(NewBooksContext);
   
    return (
        <div>
            {
                bestSeller
                ? <BookList books={bestSeller}/>
                : <BookList books={newBooks}/>
            }
        </div>
    )
}

function BookList(props) {

    let history = useHistory();

    return (
        <div className='row'>
            {props.books && props.books.map((book, i) => (
                <div className="col-lg-3 col-sm-4" key={book.itemId} onClick={()=>{ history.push('/detail/' + book.isbn)}}>
                    <BookWrapper>
                        <h3>{book.rank}</h3>
                        <BookImageWrapper><img src={book.coverLargeUrl}/></BookImageWrapper>
                        <p>{book.title}</p>
                        {book.author} / {book.publisher}
                    </BookWrapper>
                </div>
            ))} 
        </div>
    )
}

export default Book;