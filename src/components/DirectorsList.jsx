import React, { useContext } from "react";
import axios from "axios";
import { StateContext } from "../contexts/Contexts.jsx";

const DirectorsList = ({ fetchDirectorInfo }) => {
  const states = useContext(StateContext);

  const delPeopleCode = (e) => {
    e.preventDefault();

    const confirm = window.confirm("정말 삭제하시겠습니까?");
    if (confirm) {
      axios
        .delete(
          `http://localhost:8000/api/directorInfo/${e.target.dataset.id}/`
        )
        .then(() => {
          fetchDirectorInfo();
        })
        .catch((err) => console.log("삭제실패:", err));
    }
  };
  const url = "https://mdl.artvee.com/ft/902103il.jpg";
  const list = states.loadings.initLoading
    ? "loading..."
    : states.directors.map((data) => {
        return (
          <article
            id={data.name}
            key={data.id}
            data-id={data.id}
            data-peoplecode={data.peopleCode}
          >
            <a
              href={`https://movie.naver.com/movie/bi/pi/filmo.nhn?code=${data.peopleCode}#tab`}
              className="image"
              target="_blank"
              rel="noreferrer"
            >
              <img src={data.image} alt="from artvee.com" />
            </a>
            <h3 className="korean" style={{ textAlign: "center" }}>
              {data.name}&nbsp;
              <i class="fas fa-film"></i>
            </h3>
            <p>
              {data.wisesaying}&nbsp; &nbsp;
              <i class="far fa-grin-squint-tears"></i>
              <br />
            </p>
            <p className="korean">네이버무비 필모그래피 보러가기 :</p>
            <ul className="actions" style={{ marginTop: "-5%" }}>
              <li>
                <a
                  href={`https://movie.naver.com/movie/bi/pi/filmo.nhn?code=${data.peopleCode}#tab`}
                  target="_blank"
                  rel="noreferrer"
                  className="button"
                >
                  <i class="fas fa-sign-in-alt"></i>
                  &nbsp;&nbsp;go filmo
                </a>
              </li>
              <li>
                <button data-id={data.id} onClick={delPeopleCode}>
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
