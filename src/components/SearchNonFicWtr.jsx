import React, { useState, useRef } from "react";
import axios from "axios";
import QueryString from "qs";

const SearchNonFictionWriter = ({ fetchNonFicWriterInfo }) => {
  const [peopleCode, setPeopleCode] = useState("You don't seach anything yet.");
  const [job, setJob] = useState("철학자");

  const inputRef = useRef(null);

  const savePeopleCode = async (e) => {
    e.preventDefault();

    let data = new FormData();
    data.append("name", inputRef.current.value);
    data.append("peopleCode", Number(peopleCode));
    data.append("job", job);
    await axios
      .post("http://127.0.0.1:8000/api/nonFicWriterInfo/", data) // (url, data, 헤더정보)순
      .then(() => {
        setPeopleCode("You don't seach anything yet.");
        inputRef.current.value = "";
        fetchNonFicWriterInfo();
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
      .get("http://127.0.0.1:8000/getPpWriter/", {
        params: {
          searchWtr: inputRef.current.value,
          jobs: ["교수", "철학자", "작가"],
        },
        paramsSerializer: (params) => {
          return QueryString.stringify(params);
        }, // 각각 jobs[0], jobs[1], jobs[2]라는 key로 보내진다. 단, 서버 쪽에서도 각각 받아와야해서 비효율적
      })
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
            placeholder="이름을 입력하세요."
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
          홍길동교수). <br /> 2. 0번은 결과가 없다는 뜻입니다. <br />
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
            <option value="교수">교수</option>
            <option value="철학자">철학자</option>
            <option value="작가">작가</option>
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

export default SearchNonFictionWriter;
