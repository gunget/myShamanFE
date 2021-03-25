import React, { useContext } from "react";
import { StateContext } from "../contexts/Contexts.jsx";

const MenuList = ({ handleAdd, type }) => {
  //type을 받아와서 뿌려주도록 재활용
  const states = useContext(StateContext);

  // console.log(states[type]);
  // object의 key를 변수로 사용해야 할 경우 states.type처럼 사용하면 안된다. undefined
  // 반드시 states[변수명]을 써줘야 일반적인 obj.key와 같은 결과를 얻을 수 있다

  const list = states
    ? states[type].map((data) => {
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

export default MenuList;
