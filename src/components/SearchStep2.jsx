import React, { useRef, useState, useContext } from "react";
import axios from "axios";
import { StateContext } from "../contexts/Contexts.jsx";

const SearchStep2 = ({ fetchDirectorInfo }) => {
  const [peopleCode, setPeopleCode] = useState("You don't seach anything yet.");
  const [ranAdvice, setRanAdvice] = useState(
    "Life is the accumlations of 'Accidents and Variables and Irony "
  );
  const [area, setArea] = useState("한국");

  const states = useContext(StateContext);

  const inputRef = useRef();
  let pickedFile = null;

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
    data.append("area", area);
    data.append("wisesaying", ranAdvice);
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
        setPeopleCode("You don't seach anything yet.");
        inputRef.current.value = "";
        fetchDirectorInfo();
        setRanAdvice(
          "Life is the combinations of 'Accidents and Variables and Irony "
        );
      })
      .catch((error) => {
        console.log(error);
        setPeopleCode("저장할 수 없습니다.");
      });
  };

  const getPeopleCode = async (e) => {
    e.preventDefault();
    setPeopleCode("Now Searching...");
    await axios
      .get(
        "http://127.0.0.1:8000/getPpMovie/",
        {
          params: {
            searchDrt: inputRef.current.value,
          },
        },
        config
      )
      .then((res) => {
        console.log(res);
        setPeopleCode(res.data);
      })
      .then((res) => {
        axios
          .get("https://icanhazdadjoke.com/", {
            headers: {
              Accept: "application/json",
            },
          })
          .then((respose) => {
            // axios.get("https://api.adviceslip.com/advice").then((respose) => {
            // console.log("dad joke:", respose.data);
            const temp = respose.data.joke;
            if (temp) {
              setRanAdvice(temp);
            }
          });
      })
      .catch((error) => {
        console.log(error);
        setPeopleCode("검색 결과가 없습니다. 다시 검색하세요.");
      });
  };

  const handelSelect = (e) => {
    e.preventDefault();
    setArea(e.target.value);
  };

  return (
    <div className="container search2">
      <div id="search2" className="alt">
        <form method="post" action="#" onSubmit={getPeopleCode}>
          <input
            type="text"
            name="query"
            id="query"
            placeholder="감독 이름을 입력하세요."
            ref={inputRef}
          />
          <div class="button" onClick={getPeopleCode}>
            Search
          </div>
        </form>
      </div>
      <div className="alt2">
        <h3 className="korean"> [ 네이버무비 감독코드 : {peopleCode} ] </h3>
        <p className="korean">
          1. 0번은 검색결과가 없다는 의미입니다. <br />
          2. 검색완료 시, 출신지역을 선택한 후 DB에 저장하세요.
        </p>
        <form method="post" action="#">
          <input
            id="fileAdd"
            type="file"
            placeholder="첨부할 파일을 선택하세요."
          ></input>
          <select id="FicJobSelect" onChange={handelSelect}>
            <option value="" selected>
              감독의 출신지역을 선택하세요.
            </option>
            <option value="한국">한국</option>
            <option value="북아메리카">북아메리카</option>
            <option value="남아메리카">남아메리카</option>
            <option value="유럽">유럽</option>
            <option value="아시아">아시아</option>
            <option value="기타">기타</option>
          </select>
          <div class="button" onClick={savePeopleCode}>
            Save DB
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchStep2;
