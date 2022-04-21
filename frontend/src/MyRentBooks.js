import React from "react";
import { Card, Button, Row } from "react-bootstrap";
import styled from "styled-components";
import axios from "axios";

let CartStyle = styled.div`
  width: 33%;
  max-width: 270px;
  min-width: 240px;
  margin-top: 1rem;
`;

function MyRentBooks(props) {

  let rentBooks = props.rentBooks;

  // 이미 2번이상 빌려본 책은 지난 대여내역에서 한번만 나오도록 중복제거
  let rentBook = rentBooks.filter(
    (item, i, arr) => i === arr.findIndex(b => (item.title === b.title))
  );
  
  let returnFunc = (rentId) => {

    axios.post("/rent/return", {
      rentId: rentId,
    })
    .then((res) => {
      alert("반납하셨습니다.");
      props.setReturnCheck(true);
    })
    .catch((error) => {
      alert("반납 서버와의 통신에 실패했습니다.")
      console.log(error);
    });
  }

  return (
    <Row>
      {
        // rentBook && rentBook.map( book => <CardComp book={book} /> )
        rentBook && rentBook.map( book => 
          <CartStyle>
            <Card key={book.rentId}>
              {
                book.coverLargeUrl
                ? <Card.Img variant="top" src={book.coverLargeUrl} />
                : <Card.Img variant="top" src={book.coverSmallUrl} />
              }
              <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Text>대여일 : {book.rentDate}</Card.Text>
                {/* <Card.Text>반납예정일 : {dueDate(book.rentDate)}</Card.Text> */}
                {
                  book.state == true 
                  ? <Button variant="outline-danger" onClick={() => returnFunc(book.rentId)}>
                      반납하기
                    </Button>
                  : null
                }
              </Card.Body>
            </Card>
          </CartStyle>
        )
      }
    </Row>
  )
  
}

function dueDate(date) {
  let newDate = new Date(date)
  return new Date(newDate.setDate(newDate.getDate() + 7));
}

// function returnFunc(rentId, props) {

//   let history = useHistory();

//   axios.post("/rent/return", {
//       rentId: rentId,
//     })
//     .then((res) => {
//       alert("반납하셨습니다.");
//       props?.setReturnCheck(...1);
//       history.push("/mypage");
//     })
//     .catch((error) => {
//       alert("반납 서버와의 통신에 실패했습니다.")
//       console.log(error);
//     });
// }

// function CardComp({ book }) {

//   return (
//     <CartStyle>
//       <Card key={book.rentId}>
//         {
//           book.coverLargeUrl
//           ? <BookImg>
//               <Card.Img variant="top" src={book.coverLargeUrl} />
//             </BookImg>
//           : 
//             <BookImg>
//               <Card.Img variant="top" src={book.coverSmallUrl} />
//             </BookImg>
//         }
//         <Card.Body>
//           <Card.Title>{book.title}</Card.Title>
//           <Card.Text>대여일 : {book.rentDate}</Card.Text>
//           <Card.Text>반납일 : (D-계산값)</Card.Text>
//           {
//             book.state == true 
//             ? <Button variant="outline-danger" onClick={() => returnFunc(book.rentId)}>
//                 반납하기
//               </Button>
//             : null
//           }
//         </Card.Body>
//       </Card>
//     </CartStyle>
//   );
// }

export default MyRentBooks;
