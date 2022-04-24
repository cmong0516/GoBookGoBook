import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import axios from "axios";

function AllRent(props) {

  let [rent, setRent] = useState([]);
  let [returnCheck, setReturnCheck] = useState(false);

  useEffect(() => {
    axios.post("/rent/infoall")
      .then((res) => {
        console.log(res);
        setRent(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [returnCheck]);

  let rentFunc = (rent) => {

    axios.post("/rent/add", {
        author: rent.author,
        categoryName: rent.categoryName,
        coverLargeUrl: rent.coverLargeUrl,
        coverSmallUrl: rent.coverSmallUrl,
        customerReviewRank: rent.customerReviewRank,
        description: rent.description,
        isbn: rent.isbn,
        pubDate: rent.pubDate,
        publisher: rent.publisher,
        rank: rent.rank,
        title: rent.title,
        userId: rent.userId
      })
      .then((res) => {
          alert("대여 성공!");
          setReturnCheck(!returnCheck);
      })
      .catch((error) => {
          alert("대여 통신에 실패했습니다.");
          console.log(error);
      });
  };

  let returnFunc = (rentId) => {

    axios.post("/rent/return", {
      rentId: rentId,
    })
    .then((res) => {
      alert("반납하셨습니다.");
      setReturnCheck(!returnCheck);
    })
    .catch((error) => {
      alert("반납 서버와의 통신에 실패했습니다.")
      console.log(error);
    });
  }

  return (
    <div>
      <h3>전체 대여관리</h3>
      <Table hover>
        <thead>
          <tr>
            <th>RentId</th>
            <th>UserId</th>
            <th>BookTitle</th>
            <th>RentDate</th>
            <th>반납상태</th>
            <th>#</th>
          </tr>
        </thead>
        <tbody>
          {rent && rent.map((rent, i) => (
            <tr>
              <td>{rent.rentId}</td>
              <td>{rent.userId}</td>
              <td>{rent.title}</td>
              <td>{rent.rentDate}</td>
              <td>{rent.state == true ? "대여중" : "반납완료"}</td>
              <td>
                {
                  rent.state == true 
                  ? <Button variant="outline-info" size="sm" onClick={() => returnFunc(rent.rentId)}>
                      반납하기
                    </Button>
                  : <Button variant="outline-success" size="sm" onClick={() => rentFunc(rent)}>
                      대여하기
                    </Button>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default AllRent;