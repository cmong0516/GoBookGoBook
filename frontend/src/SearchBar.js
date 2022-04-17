import React from 'react';
import {InputGroup, FormControl, Button} from "react-bootstrap";
import {useHistory} from "react-router-dom";

function SearchBar(props) {

    let history = useHistory();

    return (
        <div>
            <InputGroup className="my-5 w-50 mx-auto">
                <FormControl
                    size="lg"
                    type="search"
                    placeholder="검색을 원하는 책, 저자를 입력해주세요."
                    onKeyDown={(e) => { if(e.key ==='Enter') { props.searchWordChange(e.target.value) } }}
                    onKeyUp={(e) => { if(e.key ==='Enter') { history.push('/api/search?query=' + props.searchWord) } }}
                    />
                <Button 
                    className="rounded-1" 
                    variant="outline-light" 
                    onClick={()=>{ history.push('/search?query=' + props.searchWord) }}>검색</Button>
            </InputGroup>
        </div>
    )
}

export default SearchBar;