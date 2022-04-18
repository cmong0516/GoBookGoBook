import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Book from './Book.js'
import { Nav, ButtonGroup, DropdownButton, Dropdown } from "react-bootstrap";

function NewBooksCategory() {

    let [categoryId, setCategoryId] = useState(null);
    let [books, setBooks] = useState();

    useEffect(() => {
        axios.get('/api/newbook/'+ categoryId)
        .then((res) => {
            setBooks(res.data);
        }).catch((error) => {
            alert(categoryId)
            alert('카테고리 신간 데이터를 받을 수 없습니다.');
            console.log(error);
        });
    }, [categoryId]);

    return (
        <div>
            {/* <ButtonGroup>
                <DropdownButton as={ButtonGroup} title="국내도서" id="bg-nested-dropdown" onSelect={SelectCategoryId}>
                    <Dropdown.Item eventKey="101">소설</Dropdown.Item>
                    <Dropdown.Item eventKey="102">시/에세이</Dropdown.Item>
                    <Dropdown.Item eventKey="103">예술/대중문화</Dropdown.Item>
                    <Dropdown.Item eventKey="110">아동</Dropdown.Item>
                    <Dropdown.Item eventKey="117">경제경영</Dropdown.Item>
                    <Dropdown.Item eventKey="118">자기계발</Dropdown.Item>
                </DropdownButton>
            </ButtonGroup> */}
            <Nav variant="tabs">
                <Nav.Item><Nav.Link onClick={()=>{ setCategoryId('101')}}>소설</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link onClick={()=>{ setCategoryId(102)}}>시/에세이</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link eventKey="103">예술/대중문화</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link eventKey="110">아동</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link eventKey="117">경제경영</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link eventKey="118">자기계발</Nav.Link></Nav.Item>
            </Nav>
        </div>
    )
}

export default NewBooksCategory;