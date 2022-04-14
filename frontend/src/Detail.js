import React, {useEffect, useState} from 'react';
import axios from 'axios';

function Detail() {

    let [books, setBooks] = useState()
    
    useEffect(() => {
        axios.get('')
            .then((res) => {
                
            }).catch((error) => {
                console.log(error);
            });
    },[]);

    return (
        <div>
           
        </div>
    )
}

export default Detail;