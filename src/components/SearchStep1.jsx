import React, { useRef, useState, useContext } from "react";
import axios from "axios";
import { StateContext } from "../contexts/Contexts.jsx";

const SearchStep1 = ({ fetchDirectorInfo }) => {
  const [peopleCode, setPeopleCode] = useState("Nothing Searched.");
  const [ranAdvice, setRanAdvice] = useState(
    "Life is the accumlations of 'Accidents and Variables and Irony "
  );
  const states = useContext(StateContext);

  const inputRef = useRef();

  const config = {
    headers: {
      Authorization: `jwt ${states.jwt.token}`,
    },
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
        <sup className="korean"> 네이버영화 감독코드</sup>
        <p
          className="korean"
          style={{
            color: "#f56a6a",
            fontSize: "1.5em",
            marginBottom: "1em",
            fontWeight: "700",
          }}
        >
          {peopleCode}
        </p>
        <blockquote>
          - 0번은 검색결과가 없다는 의미입니다. <br />- 번호가 나오면 다음단계로
          진행하세요.
        </blockquote>
      </div>
    </div>
  );
};

export default SearchStep1;
