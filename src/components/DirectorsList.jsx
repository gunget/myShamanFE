import React, { useContext } from "react";
import axios from "axios";
import { StateContext } from "../contexts/Contexts.jsx";

import pic01 from "../images/pic01.jpg";

const DirectorsList = ({ fetchDirectorInfo }) => {
  const states = useContext(StateContext);

  const delPeopleCode = (e) => {
    e.preventDefault();

    //지우는 것 맞는지 컨펌한 후 진행

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
          <article
            key={data.id}
            data-id={data.id}
            data-peoplecode={data.peopleCode}
          >
            <a href="#" className="image">
              <img src={pic01} alt="" />
            </a>
            <h2 className="korean">
              {data.name}&nbsp;
              <i class="fas fa-film"></i>
            </h2>
            <p></p>
            <p>
              <h4 className="korean">네이버 무비 필모그래피 링크 :</h4>
              https://movie.naver.com/movie/bi/pi/filmo.nhn?code=$
              {data.peopleCode}#tab
            </p>
            <ul className="actions">
              <li>
                <a
                  href={`https://movie.naver.com/movie/bi/pi/filmo.nhn?code=${data.peopleCode}#tab`}
                  target="_blank"
                  rel="noreferrer"
                  className="button"
                >
                  <i class="fas fa-sign-in-alt"></i>
                  &nbsp;&nbsp;go get filmo
                </a>
              </li>
              <li>
                <button onClick={delPeopleCode}>
                  <i class="fas fa-trash-alt"></i>&nbsp;&nbsp;delete
                </button>
              </li>
            </ul>
          </article>
        );
      });
  return <>{list}</>;
};

export default DirectorsList;
