import React, { useState } from 'react';
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function SearchBar(props) {

    let history = useHistory();
    let [word, setWord] = useState("");

    return (
        <div>
            <InputGroup className="my-5 w-50 mx-auto">
                <FormControl
                    size="lg"
                    type="search"
                    placeholder="검색을 원하는 책, 저자를 입력해주세요."
                    onChange={(e) => setWord(e.target.value)}
                    onKeyUp={(e) => {
                        if (e.key == 'Enter') {
                            props.searchWordChange(e.target.value);
                            history.push('/api/search?query=' + e.target.value)
                        }
                        // props.searchWord를 쓸거라면 setState의 특성때문에 
                        // onKeyDown, onKeyUp으로 setState와 push를 나눠서 사용해야 (예전코드처럼)
                    }}
                />

                <Button
                    className="rounded-1"
                    variant="outline-light"

                    onClick={() => {
                        props.searchWordChange(word);
                        history.push('/api/search?query=' + word)
                    }}>검색</Button>
            </InputGroup>

        </div>
    )
}

export default SearchBar;