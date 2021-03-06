import React, { useRef, useState, useContext } from "react";
import axios from "axios";
import { StateContext } from "../contexts/Contexts.jsx";
import { DispatchContext } from "../contexts/Contexts.jsx";

const SearchStep2 = ({ fetchDirectorInfo, handleNext }) => {
  const [area, setArea] = useState("한국");
  const [job, setJob] = useState("드라마작가");
  const [warning, setWarning] = useState(null);

  const states = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  // const inputRef = useRef();

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
    if (area) {
      data.append("area", area);
    }
    if (states.randJoke) {
      data.append("wisesaying", states.randJoke);
    }
    if (job) {
      data.append("job", job);
    }
    // let data2 = {
    //   // name: searchWord,
    //   name: inputRef.current.value,
    //   peopleCode: Number(peopleCode),
    //   image: pickedFile,
    //   // fbooks: 1, //반드시 DRF API상의 변수와 값을 맞춰줘야 한다. 틀리면 어디에 넣을지 모르므로
    // };

    await axios
      .post("http://127.0.0.1:8000/api/directorInfo/", data, config) // (url, data, 헤더정보)순
      .then(() => {
        fetchDirectorInfo();
        dispatch({
          type: "SET_RANDOM_JOKE",
          payload:
            "Life is the combinations of 'Accidents and Variables and Irony ",
        });
        handleNext();
      })
      .catch((error) => {
        console.log(error);
        setWarning("데이터베이스 문제로 저장할 수 없습니다!");
      });
  };

  const handelSelect = (e) => {
    e.preventDefault();
    setArea(e.target.value);
  };

  const message = () => {
    if (warning) {
      return <blockquote>{warning}</blockquote>;
    } else {
      return (
        <blockquote>
          - 감독의 출신지역을 선택하세요.
          <br />- 저장버튼을 누르면 리스트에 자동으로 추가 됩니다.
        </blockquote>
      );
    }
  };

  const optionList = [
    "한국",
    "북아메리카",
    "남아메리카",
    "유럽",
    "아시아",
    "기타",
  ];
  const options = optionList.map((item) => {
    return <option value={item}>{item}</option>;
  });

  return (
    <div className="container search2">
      <div id="search2" className="alt">
        <form method="post" action="#">
          <select id="FicJobSelect" onChange={handelSelect}>
            <option value="" selected>
              출신 지역
            </option>
            {options}
            {/* <option value="한국">한국</option>
            <option value="북아메리카">북아메리카</option>
            <option value="남아메리카">남아메리카</option>
            <option value="유럽">유럽</option>
            <option value="아시아">아시아</option>
            <option value="기타">기타</option> */}
          </select>
          <div class="button" onClick={savePeopleCode}>
            Save DB
          </div>
        </form>
      </div>
      <div className="alt2">{message()}</div>
    </div>
  );
};

export default SearchStep2;
