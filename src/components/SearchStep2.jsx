import React, { useState, useContext, useRef } from "react";
import axios from "axios";
import { StateContext } from "../contexts/Contexts.jsx";
import { DispatchContext } from "../contexts/Contexts.jsx";
import { url } from "./url.js";

const SearchStep2 = ({ fetchTotalInfo, sectionType, handleNext }) => {
  const [area, setArea] = useState();
  const [job, setJob] = useState();
  const [warning, setWarning] = useState(null);

  const majorWorkRef = useRef();

  const states = useContext(StateContext);
  const sectionStates = states.searchDetails[sectionType];
  const dispatch = useContext(DispatchContext);

  const config = {
    headers: {
      Authorization: `jwt ${states.jwt.token}`,
    },
  };

  const savePeopleCode = async (e) => {
    e.preventDefault();

    let data = new FormData();
    data.append("name", states.searchName);
    data.append("peopleCode", Number(states.peopleCode));
    if (majorWorkRef.current.value) {
      data.append("majorWorks", majorWorkRef.current.value);
    } else if (!majorWorkRef.current.value && states.randJoke) {
      data.append("majorWorks", states.randJoke);
    } else {
      data.append("majorWorks", "매일매일이 당신의 베스트!");
    }
    if (area) {
      data.append("area", area);
    }
    if (job) {
      data.append("job", job);
    }
    // if (states.randJoke) {
    //   data.append("wisesaying", states.randJoke);
    // }
    // let data2 = {
    //   // name: searchWord,
    //   name: inputRef.current.value,
    //   peopleCode: Number(peopleCode),
    //   image: pickedFile,
    //   // fbooks: 1, //반드시 DRF API상의 변수와 값을 맞춰줘야 한다. 틀리면 어디에 넣을지 모르므로
    // };

    await axios
      .post(`${url}/api/${sectionStates.url.saveUrl}/`, data, config) // (url, data, 헤더정보)순
      .then(() => {
        fetchTotalInfo();
        if (sectionStates.useJoke) {
          dispatch({
            type: "SET_RANDOM_JOKE",
            payload: "",
          });
        }
        handleNext();
      })
      .catch((error) => {
        console.log(error);
        setWarning("데이터베이스 문제로 저장할 수 없습니다!");
      });
  };

  const handelSelect = (e) => {
    e.preventDefault();
    if (sectionStates.useJoke) {
      //감독검색일때만 joke를 사용하므로 이를 활용, 감독검색인 경우를 추출
      setArea(e.target.value);
    } else {
      setJob(e.target.value);
    }
  };

  const message = () => {
    if (warning) {
      return <blockquote>{warning}</blockquote>;
    } else {
      return (
        <blockquote>
          - {sectionStates.texts.selectInfoText}을 선택하세요.
          <br />- 대표작을 기록하세요.
          <br />- 저장버튼을 누르면 리스트에 자동으로 추가 됩니다.
        </blockquote>
      );
    }
  };

  const optionList = sectionStates.optionList;
  const options = optionList.map((item) => {
    return <option value={item}>{item}</option>;
  });

  return (
    <div className="container search2">
      <div id="search2" className="alt">
        <form method="post" action="#">
          <div>
            <select id="FicJobSelect" onChange={handelSelect}>
              <option value="" selected>
                {sectionStates.texts.selectText}
              </option>
              {options}
              {/* <option value="한국">한국</option>
            <option value="북아메리카">북아메리카</option>
            <option value="남아메리카">남아메리카</option>
            <option value="유럽">유럽</option>
            <option value="아시아">아시아</option>
            <option value="기타">기타</option> */}
            </select>
          </div>
        </form>
        <div className="majorWork">
          <input
            type="text"
            name="demo-name"
            id="demo-name"
            ref={majorWorkRef}
            placeholder="대표작을 기록해 두세요."
          />
        </div>
      </div>
      <div className="alt2">{message()}</div>
      <div class="button" onClick={savePeopleCode}>
        Save DB
      </div>
    </div>
  );
};

export default SearchStep2;
