import React, { useState, useRef } from "react";
import axios from "axios";

const SearchDirector = ({ fetchDirectorInfo }) => {
  const [peopleCode, setPeopleCode] = useState();
  const inputRef = useRef();

  const savePeopleCode = async (e) => {
    e.preventDefault();
    let data = {
      // name: searchWord,
      name: inputRef.current.value,
      peopleCode: Number(peopleCode),
      // fbooks: 1, //반드시 DRF API상의 변수와 값을 맞춰줘야 한다. 틀리면 어디에 넣을지 모르므로
    };
    await axios
      .post("http://127.0.0.1:8000/api/directorInfo/", data) // (url, data, 헤더정보)순
      .then(() => {
        // setSearchWord("");
        setPeopleCode(0);
        inputRef.current.value = "";
        fetchDirectorInfo();
      })
      .catch((error) => {
        console.log(error);
        setPeopleCode("저장할 수 없습니다.");
      });
  };

  const getPeopleCode = async (e) => {
    e.preventDefault();
    await axios
      .get("http://127.0.0.1:8000/getPp/", {
        params: {
          searchDrt: inputRef.current.value,
        },
      })
      .then((res) => {
        setPeopleCode(res.data);
      })
      .catch((error) => {
        console.log(error);
        setPeopleCode("검색 결과가 없습니다.");
      });
  };
  const responsedCode = peopleCode || "Not assigned";

  return (
    <div className="container">
      <h3>
        Current People Code is {responsedCode}{" "}
        <button onClick={savePeopleCode}>saveDB</button>
      </h3>
      {/* <ul dangerouslySetInnerHTML={{ __html: responsedCode }}></ul> */}
      {/* 전달받은 string을 엘러먼트로 살려서 표시하기. 보안상 위험 */}
      <form>
        <input type="text" ref={inputRef}></input>
        <button onClick={getPeopleCode}>getCode</button>
      </form>
    </div>
  );
};

export default SearchDirector;
