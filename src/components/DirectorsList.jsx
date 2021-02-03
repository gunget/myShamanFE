import React, { useContext } from "react";
import axios from "axios";
import { StateContext } from "../contexts/Contexts.jsx";

const DirectorsList = ({ fetchDirectorInfo }) => {
  const states = useContext(StateContext);

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

  let list = states.loadings.initLoading
    ? "loading..."
    : states.directors.map((data) => {
        return (
          <li key={data.id} data-id={data.id} data-peoplecode={data.peopleCode}>
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
          </li>
        );
      });
  return (
    <>
      <ul>{list}</ul>
    </>
  );
};

export default DirectorsList;
