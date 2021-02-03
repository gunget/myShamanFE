import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import DirectorsList from "./DirectorsList";

const Home = () => {
  const [peopleCode, setPeopleCode] = useState();
  const [searchWord, setSearchWord] = useState();
  const [diectors, setDirectors] = useState();
  const [loading, setLoading] = useState(true);
  const inputRef = useRef();

  const fetchDirectorInfo = () => {
    axios
      .get("http://localhost:8000/api/directorInfo/")
      .then((res) => {
        console.log("Get list from DB:", res);
        setDirectors(res.data);
      })
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.log("DB에러:", error);
      });
  };

  // const handleChange = (e) => {
  //   setSearchWord(e.target.value);
  // };

  const savePeopleCode = async (e) => {
    e.preventDefault();
    let data = {
      // name: searchWord,
      name: searchWord,
      peopleCode: Number(peopleCode),
      // fbooks: 1, //반드시 DRF API상의 변수와 값을 맞춰줘야 한다. 틀리면 어디에 넣을지 모르므로
    };
    await axios
      .post("http://127.0.0.1:8000/api/directorInfo/", data) // (url, data, 헤더정보)순
      .then(() => {
        setSearchWord("");
        setPeopleCode(0);
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
          // searchDrt: "봉준호",
          // searchDrt: searchWord,
          searchDrt: inputRef.current.value,
        },
      })
      .then((res) => {
        setPeopleCode(res.data);
        setSearchWord(inputRef.current.value);
      })
      .then(() => {
        inputRef.current.value = "";
      })
      .catch((error) => {
        console.log(error);
        setPeopleCode("검색 결과가 없습니다.");
      });
  };
  const responsedCode = peopleCode || "Not assigned";
  console.log("responsedCode전체", responsedCode);

  useEffect(() => {
    fetchDirectorInfo();
  }, []);

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
      <DirectorsList
        directors={diectors}
        loading={loading}
        fetchDirectorInfo={fetchDirectorInfo}
      />
    </div>
  );
};

export default Home;

// 박훈정 102768
