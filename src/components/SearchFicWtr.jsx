import React, { useState, useRef, useContext } from "react";
import axios from "axios";
import QueryString from "qs"; //axios.get으로 array를 보낼때 사용하는 library
import { StateContext } from "../contexts/Contexts.jsx";

const SearchFictionWriter = ({ fetchFicWriterInfo }) => {
  const [peopleCode, setPeopleCode] = useState("You don't seach anything yet.");
  const [job, setJob] = useState("드라마작가");

  const inputRef = useRef(null);
  const states = useContext(StateContext);
  const config = {
    headers: {
      Authorization: `jwt ${states.jwt.token}`,
    },
  };

  const savePeopleCode = async (e) => {
    e.preventDefault();

    let data = new FormData();
    data.append("name", inputRef.current.value);
    data.append("peopleCode", Number(peopleCode));
    data.append("job", job);
    await axios
      .post("http://myshaman.herokuapp.com/api/ficWriterInfo/", data, config) // (url, data, 헤더정보)순
      .then(() => {
        setPeopleCode("You don't seach anything yet.");
        inputRef.current.value = "";
        fetchFicWriterInfo();
      })
      .catch((error) => {
        console.log(error);
        setPeopleCode("저장할 수 없습니다.");
      });
  };

  // const handleUpload = (e) => {
  //   e.preventDefault();
  //   pickedFile = e.target.files[0];
  // };

  const getPeopleCode = async (e) => {
    e.preventDefault();
    setPeopleCode("Now Searching...");
    await axios
      .get(
        "http://127.0.0.1:8000/getPpWriter/",
        {
          params: {
            searchWtr: inputRef.current.value,
            jobs: ["드라마작가", "소설가", "만화가"],
            // jobs0: "드라마작가",
            // jobs1: "소설가",
            // jobs2: "만화가",
          },
          paramsSerializer: (params) => {
            return QueryString.stringify(params);
          }, // 각각 jobs[0], jobs[1], jobs[2]라는 key로 보내진다. 단, 서버 쪽에서도 각각 받아와야해서 비효율적
        },
        config
      )
      .then((res) => {
        console.log(res);
        setPeopleCode(res.data);
      })
      .catch((error) => {
        console.log(error);
        setPeopleCode("검색 결과가 없습니다. 다시 검색하세요.");
      });
  };

  const handelSelect = (e) => {
    e.preventDefault();
    setJob(e.target.value);
  };

  return (
    <div className="container search2">
      <div id="search2" className="alt">
        <form method="post" action="#" onSubmit={getPeopleCode}>
          <input
            type="text"
            name="query"
            id="query"
            placeholder="작가 이름을 입력하세요."
            ref={inputRef}
          />

          <div class="button" onClick={getPeopleCode}>
            Search
          </div>
        </form>
      </div>
      <div className="alt2">
        <h3 className="korean"> [ 네이버 인물정보 코드 : {peopleCode} ] </h3>
        <p className="korean">
          1. 검색어 입력 시 직업까지 입력하면 결과가 정확해 집니다(ex.
          홍길동작가). <br /> 2. 0번은 결과가 없다는 뜻입니다. <br />
          3. 직업을 선택하고 DB에 저장하세요.
        </p>
        <form method="post" action="#">
          <input
            id="fileAdd"
            type="file"
            // onChange={handleUpload}
            placeholder="첨부할 파일을 선택하세요."
          ></input>
          {/* <div class="button" onClick={handleFileAdd}>
            ADD Image
          </div> */}{" "}
          <select id="FicJobSelect" onChange={handelSelect}>
            <option value="" selected>
              저장할 직업명을 선택하세요.
            </option>
            <option value="드라마작가">드라마작가</option>
            <option value="소설가">소설가</option>
            <option value="만화가">만화가</option>
            <option value="기타">기타</option>
          </select>
          <div class="button" onClick={savePeopleCode}>
            Save DB
          </div>
        </form>
      </div>
      {/* <ul dangerouslySetInnerHTML={{ __html: responsedCode }}></ul> */}
      {/* 전달받은 string을 엘러먼트로 살려서 표시하기. 보안상 위험 */}
      {/* <form>
        <input type="text" ref={inputRef}></input>
        <button onClick={getPeopleCode}>getCode</button>
      </form> */}
    </div>
  );
};

export default SearchFictionWriter;
