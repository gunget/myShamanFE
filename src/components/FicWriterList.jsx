import React, { useContext } from "react";
import axios from "axios";
import { StateContext } from "../contexts/Contexts.jsx";

const FicWriterList = ({ fetchFicWriterInfo }) => {
  const states = useContext(StateContext);

  const delPeopleCode = (e) => {
    e.preventDefault();

    const confirm = window.confirm("정말 삭제하시겠습니까?");
    if (confirm) {
      axios
        .delete(
          `http://localhost:8000/api/ficWriterInfo/${e.target.dataset.id}/`
        )
        .then(() => {
          fetchFicWriterInfo();
        })
        .catch((err) => console.log("삭제실패:", err));
    }
  };
  const list = states.loadings.FicWriterInitLoading
    ? "loading..."
    : states.fictionWriters.map((data) => {
        return (
          <article
            id={data.name}
            key={data.id}
            data-id={data.id}
            data-peoplecode={data.peopleCode}
          >
            <div>이름:{data.name}</div>
            <div>PeopleCode:{data.peopleCode}</div>
            <div>
              <a
                href="#"
                data-id={data.id}
                onClick={delPeopleCode}
                className="button"
              >
                <i class="fas fa-trash-alt"></i>&nbsp;&nbsp;delete
              </a>
            </div>
          </article>
        );
      });
  return <>{list}</>;
};

export default FicWriterList;
