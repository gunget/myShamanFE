import React, { useContext } from "react";
import axios from "axios";
import { StateContext } from "../contexts/Contexts.jsx";
import Loading from "./Loading";
import { url } from "./url.js";

// NonFicWriter Component
const OthersList = ({ fetchOthersInfo }) => {
  const states = useContext(StateContext);

  const delPeople = (e) => {
    e.preventDefault();

    const config = {
      headers: {
        Authorization: `jwt ${states.jwt.token}`,
      },
    };

    const id = e.target.parentNode.parentNode.parentNode.dataset.id;
    console.log("others List id", id);

    const confirm = window.confirm("정말 삭제하시겠습니까?");
    if (confirm) {
      axios
        .delete(`${url}/api/othersInfo/${id}/`, config)
        .then(() => {
          fetchOthersInfo();
        })
        .catch((err) => console.log("삭제실패:", err));
    }
  };

  const list = states.loadings.othersInitLoading ? (
    <td colSpan="4">
      <Loading />
    </td>
  ) : (
    states.others.map((data) => {
      return (
        <tr id={data.name} data-id={data.id}>
          <td>{data.name}</td>
          <td>{data.description}</td>
          <td>{data.job}</td>
          <td>
            <a onClick={delPeople}>
              <i class="fas fa-trash-alt"></i>
            </a>
          </td>
        </tr>
      );
    })
  );
  return (
    <article className="others">
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>NAME</th>
              <th>DESCRIPTION</th>
              <th>JOB</th>
              <th>DEL</th>
            </tr>
          </thead>
          <tbody>{list}</tbody>
          <tfoot>
            <tr>
              <td colspan="4">TOTAL: {list.length} 명</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </article>
  );
};

export default OthersList;
