import React, { useContext } from "react";
import { StateContext } from "../contexts/Contexts.jsx";

const MenuFicWriterList = ({ handleAdd }) => {
  const states = useContext(StateContext);
  const list = states
    ? states.fictionWriters.map((data) => {
        return (
          <li key={data.id}>
            <a onClick={() => handleAdd(data.name)}>
              <span className="korean">📢 {data.name}</span>
            </a>
          </li>
        );
      })
    : "Lists are not Loaded.";
  return <>{list}</>;
};

export default MenuFicWriterList;
