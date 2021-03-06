import React, { useState, useRef } from "react";
import axios from "axios";

const SearchFictionWriter = ({ fetchFicWriterInfo }) => {
  const [peopleCode, setPeopleCode] = useState("You don't seach anything yet.");

  const inputRef = useRef(null);

  const savePeopleCode = async (e) => {
    e.preventDefault();

    let data = new FormData();
    data.append("name", inputRef.current.value);
    data.append("peopleCode", Number(peopleCode));
    // let data2 = {
    //   // name: searchWord,
    //   name: inputRef.current.value,
    //   peopleCode: Number(peopleCode),
    //   image: pickedFile,
    //   // fbooks: 1, //반드시 DRF API상의 변수와 값을 맞춰줘야 한다. 틀리면 어디에 넣을지 모르므로
    // };
    await axios
      .post("http://127.0.0.1:8000/api/ficWriterInfo/", data) // (url, data, 헤더정보)순
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
      .get("http://127.0.0.1:8000/getPpWriter/", {
        params: {
          searchWtr: inputRef.current.value,
        },
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

  const handleFileAdd = () => {
    // const inputWindow = document.getElementById("fileAdd");
    // inputWindow.click();
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
          인물코드가 나오면 DB에 저장하세요. 0번은 검색결과가 없다는 의미입니다.
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
          </div> */}
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
