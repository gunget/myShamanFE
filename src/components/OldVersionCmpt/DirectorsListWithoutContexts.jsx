import React, { useState } from "react";
import FilmoItem from "./FilmoItem.jsx";
import axios from "axios";

const DirectorsList = ({ directors, loading, fetchDirectorInfo }) => {
  const [peopleCode, setPeopleCode] = useState();
  const url = `https://movie.naver.com/movie/bi/pi/filmo.nhn?code={}#tab`;
  const getFilmo = (e) => {
    e.preventDefault();
    setPeopleCode(e.target.parentNode.dataset.peoplecode);
  };

  const delPeopleCode = (e) => {
    e.preventDefault();
    axios
      .delete(
        `http://localhost:8000/api/directorInfo/${e.target.parentNode.dataset.id}/`
      )
      .then(() => {
        fetchDirectorInfo();
      })
      .catch((err) => console.log("삭제실패:", err));
  };

  let list = loading
    ? "loading..."
    : directors.map((data) => {
        return (
          <li key={data.id} data-id={data.id} data-peoplecode={data.peopleCode}>
            <div>{data.name}</div>
            <a
              href={`https://movie.naver.com/movie/bi/pi/filmo.nhn?code=${data.peopleCode}#tab`}
              target="_blank"
            >
              네이버영화 필모그래프로
              이동:https://movie.naver.com/movie/bi/pi/filmo.nhn?code=
              {data.peopleCode}#tab
            </a>
            <button onClick={delPeopleCode}>delete</button>
          </li>
        );
      });
  const responsedCode = peopleCode || "Not assigned";
  return (
    <>
      <ul>{list}</ul>
      {/* <FilmoItem peopleCode={responsedCode} /> */}
    </>
  );
};

export default DirectorsList;

            {/* <li
              key={data.id}
              data-id={data.id}
              data-peoplecode={data.peopleCode}
            >
              <div>{data.name}</div>
              <a
                href={`https://movie.naver.com/movie/bi/pi/filmo.nhn?code=${data.peopleCode}#tab`}
                target="_blank"
                rel="noreferrer"
              >
                네이버영화 필모그래프로
                이동:https://movie.naver.com/movie/bi/pi/filmo.nhn?code=
                {data.peopleCode}#tab
              </a>
              <button onClick={delPeopleCode}>delete</button>
            </li> */}
